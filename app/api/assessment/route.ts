import { NextResponse } from "next/server";

/**
 * Receives an Executive Business Assessment submission and pushes it to
 * Global Control: fires the `lccs_execassess` tag (creates/updates the
 * contact by email), then writes each 1–5 score to a custom field.
 *
 * Configuration (Vercel env vars — nothing is hard-coded or exposed to the browser):
 *   GLOBAL_CONTROL_API_KEY   your Global Control API key (X-API-KEY)
 *   GC_BASE                  optional, defaults to https://api.globalcontrol.io/api/ai
 *   GC_FORM_BASE             optional, defaults to https://api.globalcontrol.io/api/tag-form-submission
 *   GC_TAG_ID                the id of the `lccs_execassess` tag
 *   GC_FIELD_MAP             JSON object mapping field keys -> customFieldId, e.g.
 *                            {"marketing":"<id>","sales":"<id>",...,
 *                             "overall_score":"<id>","top_gaps":"<id>",
 *                             "recommendation":"<id>","completed_at":"<id>"}
 *
 * The tag fire goes through /api/tag-form-submission/{tagId}, not the AI API's
 * /tags/fire-tag/{tagId} — that one returns HTTP 200 with an ERROR body on
 * failure, so any check based on res.ok reads failure as success. This is the
 * exact bug already found and fixed in the MasterClass and Challenge
 * registration flows; completed assessments were being silently discarded the
 * same way. tag-form-submission doesn't return the contact id though, so a
 * separate contacts search-by-email looks it up afterward to write the 18
 * custom fields onto it.
 *
 * The assessment still shows results even if this call fails — capture is best-effort.
 */

const GC_BASE = process.env.GC_BASE || "https://api.globalcontrol.io/api/ai";
const GC_FORM_BASE =
  process.env.GC_FORM_BASE || "https://api.globalcontrol.io/api/tag-form-submission";

type Payload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  dimAnswers?: Record<string, number>;
  readinessAnswers?: Record<string, number>;
  overall?: number;
  topGaps?: string[];
  recommendation?: string;
};

function pickContactId(data: unknown): string | null {
  if (!data || typeof data !== "object") return null;
  const o = data as Record<string, unknown>;
  const candidates = [
    o._id,
    o.id,
    o.contactId,
    (o.contact as Record<string, unknown> | undefined)?._id,
    (o.data as Record<string, unknown> | undefined)?._id,
    (o.data as Record<string, unknown> | undefined)?.id,
  ];
  for (const c of candidates) if (typeof c === "string" && c) return c;
  return null;
}

// tag-form-submission doesn't hand back the contact it just created/updated,
// so look it up by email afterward to get an id the custom-fields PUT can use.
async function findContactIdByEmail(apiKey: string, email: string): Promise<string | null> {
  try {
    const res = await fetch(
      `${GC_BASE}/contacts?search=${encodeURIComponent(email)}&limit=5&page=1`,
      { headers: { "X-API-KEY": apiKey, Accept: "application/json" } },
    );
    if (!res.ok) return null;
    const data = await res.json().catch(() => null);
    const envelope = (data && typeof data === "object" && "data" in data ? (data as { data: unknown }).data : data);
    let rows: Record<string, unknown>[] = [];
    if (Array.isArray(envelope)) rows = envelope as Record<string, unknown>[];
    else if (envelope && typeof envelope === "object") {
      const e = envelope as Record<string, unknown>;
      const candidate = e.contacts ?? e.results ?? e.items ?? e.data;
      if (Array.isArray(candidate)) rows = candidate as Record<string, unknown>[];
    }
    const match = rows.find((r) => String(r.email ?? "").toLowerCase() === email.toLowerCase()) ?? rows[0];
    if (!match) return null;
    const id = pickContactId(match) || String(match._id ?? match.id ?? "");
    return id || null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const email = (body.email || "").trim();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.GLOBAL_CONTROL_API_KEY;
  const tagId = process.env.GC_TAG_ID;

  // If Global Control isn't configured yet, accept the submission so the UX still works.
  if (!apiKey || !tagId) {
    return NextResponse.json({ ok: true, crm: "not_configured" });
  }

  const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": apiKey,
  };

  const firstName = (body.firstName || "").trim();
  const lastName = (body.lastName || "").trim();

  try {
    // 1) Fire the tag via the proven-working form endpoint — creates/updates
    // the contact by email and applies lccs_execassess. Global Control
    // returns HTTP 200 for failures too, with the real outcome in the body,
    // so success must be checked explicitly rather than via res.ok.
    const fireRes = await fetch(`${GC_FORM_BASE}/${encodeURIComponent(tagId)}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, firstName, lastName }),
    });
    const firePayload = await fireRes.json().catch(() => null);
    const fireSucceeded =
      fireRes.ok && (firePayload as { data?: { success?: boolean } } | null)?.data?.success === true;

    if (!fireSucceeded) {
      return NextResponse.json(
        { ok: false, error: "fire_tag_failed", status: fireRes.status },
        { status: 502 },
      );
    }

    // 2) Write custom fields if we can resolve the contact id + the field map.
    let fieldMap: Record<string, string> = {};
    try {
      fieldMap = JSON.parse(process.env.GC_FIELD_MAP || "{}");
    } catch {
      fieldMap = {};
    }

    const contactId = Object.keys(fieldMap).length ? await findContactIdByEmail(apiKey, email) : null;
    if (contactId && Object.keys(fieldMap).length) {
      const values: Record<string, string> = {
        ...Object.fromEntries(
          Object.entries(body.dimAnswers || {}).map(([k, v]) => [k, String(v)]),
        ),
        ...Object.fromEntries(
          Object.entries(body.readinessAnswers || {}).map(([k, v]) => [k, String(v)]),
        ),
        overall_score: String(body.overall ?? ""),
        top_gaps: (body.topGaps || []).join(", "),
        recommendation: String(body.recommendation ?? ""),
        completed_at: new Date().toISOString().slice(0, 10),
      };

      const customFields = Object.entries(fieldMap)
        .filter(([key]) => values[key] !== undefined)
        .map(([key, customFieldId]) => ({ customFieldId, value: values[key] }));

      if (customFields.length) {
        await fetch(`${GC_BASE}/contacts/${encodeURIComponent(contactId)}`, {
          method: "PUT",
          headers,
          body: JSON.stringify({ customFields }),
        });
      }

      return NextResponse.json({ ok: true, crm: "saved", contactId });
    }

    // Tag fired but we couldn't write fields (missing map or contact id).
    return NextResponse.json({ ok: true, crm: "tagged_only" });
  } catch (err) {
    return NextResponse.json({ ok: false, error: "crm_error" }, { status: 502 });
  }
}
