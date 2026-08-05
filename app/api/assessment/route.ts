import { NextResponse } from "next/server";

/**
 * Receives an Executive Business Assessment submission and pushes it to
 * Global Control: fires the `lccs_execassess` tag (creates/updates the
 * contact by email), then writes each 1–5 score to a custom field.
 *
 * Configuration (Vercel env vars — nothing is hard-coded or exposed to the browser):
 *   GLOBAL_CONTROL_API_KEY   your Global Control API key (X-API-KEY)
 *   GC_BASE                  optional, defaults to https://api.globalcontrol.io/api/ai
 *   GC_TAG_ID                the id of the `lccs_execassess` tag
 *   GC_FIELD_MAP             JSON object mapping field keys -> customFieldId, e.g.
 *                            {"marketing":"<id>","sales":"<id>",...,
 *                             "overall_score":"<id>","top_gaps":"<id>",
 *                             "recommendation":"<id>","completed_at":"<id>"}
 *
 * The assessment still shows results even if this call fails — capture is best-effort.
 */

const GC_BASE = process.env.GC_BASE || "https://api.globalcontrol.io/api/ai";

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
    // 1) Fire the tag — creates/updates the contact by email and applies lccs_execassess.
    const fireRes = await fetch(`${GC_BASE}/tags/fire-tag/${encodeURIComponent(tagId)}`, {
      method: "POST",
      headers,
      body: JSON.stringify({ email, firstName, lastName }),
    });
    const fireData = await fireRes.json().catch(() => null);

    if (!fireRes.ok) {
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

    const contactId = pickContactId(fireData);
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
