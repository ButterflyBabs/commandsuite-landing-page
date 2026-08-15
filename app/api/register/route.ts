import { NextResponse } from "next/server";

/**
 * Registers a contact for a named offer by submitting them to the matching
 * Global Control tag form. Used by the MasterClass registration form and the
 * assessment's "Save my MasterClass seat" action.
 *
 * Body: { email, firstName?, lastName?, phone?, city?, state?, zip?, tag }
 *       tag: "masterclass" | "challenge"
 *
 * Config (Vercel env vars):
 *   GC_MASTERCLASS_TAG_ID   tag id for the "From Hustle to Command" MasterClass
 *   GC_CHALLENGE_TAG_ID     tag id for the 21-Day Challenge
 *   GC_FORM_BASE            optional override of the submission endpoint
 *   GLOBAL_CONTROL_API_KEY  optional; sent as X-API-KEY when present
 *
 * Verified 2026-08-15: this endpoint returns 200 {"type":"response",
 * "data":{"success":true}} and requires no auth header. The previous
 * implementation posted to /api/ai/tags/fire-tag/{id}, which was never
 * exercised in production.
 */

const GC_FORM_BASE =
  process.env.GC_FORM_BASE || "https://api.globalcontrol.io/api/tag-form-submission";

const TAG_ENV: Record<string, string | undefined> = {
  masterclass: process.env.GC_MASTERCLASS_TAG_ID,
  challenge: process.env.GC_CHALLENGE_TAG_ID,
};

type Body = {
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  city?: string;
  state?: string;
  zip?: string;
  tag?: string;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const email = (body.email || "").trim();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const tagKey = body.tag || "masterclass";
  const tagId = TAG_ENV[tagKey];

  // A missing tag id is a configuration fault, not a visitor's problem. Confirm
  // their seat, but make the fault impossible to miss in the Vercel logs.
  if (!tagId) {
    console.error(
      `[register] NOT CONFIGURED — no tag id for "${tagKey}". ` +
        `Set GC_${tagKey.toUpperCase()}_TAG_ID in Vercel. Lead lost: ${email}`
    );
    return NextResponse.json({ ok: true, crm: "not_configured", tag: tagKey });
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.GLOBAL_CONTROL_API_KEY) {
    headers["X-API-KEY"] = process.env.GLOBAL_CONTROL_API_KEY;
  }

  try {
    const res = await fetch(`${GC_FORM_BASE}/${encodeURIComponent(tagId)}`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email,
        firstName: (body.firstName || "").trim(),
        lastName: (body.lastName || "").trim(),
        ...(body.phone ? { phone: body.phone.trim() } : {}),
        ...(body.city ? { city: body.city.trim() } : {}),
        ...(body.state ? { state: body.state.trim() } : {}),
        ...(body.zip ? { zip: body.zip.trim() } : {}),
      }),
    });

    const payload = await res.json().catch(() => null);

    // Global Control returns HTTP 200 for failures, with the real outcome in the
    // body: success is {"type":"response","data":{"success":true}} and failure is
    // {"type":"error","error":{...,"status":400}}. So we must REQUIRE an explicit
    // success — checking res.ok, or merely that success isn't false, passes on
    // an error body and loses the lead silently. Verified against both 2026-08-15.
    const succeeded = res.ok && payload?.data?.success === true;

    if (!succeeded) {
      // Still confirm the seat — they have the Zoom link on screen and sending
      // them away costs more than a missed CRM row. But shout about it in the logs.
      console.error(
        `[register] TAG SUBMIT FAILED for ${email} (tag=${tagKey}, status=${res.status}) ` +
          `response=${JSON.stringify(payload)}`
      );
      return NextResponse.json({ ok: true, crm: "failed", tag: tagKey, status: res.status });
    }

    return NextResponse.json({ ok: true, crm: "tagged", tag: tagKey });
  } catch (err) {
    console.error(`[register] TAG SUBMIT ERROR for ${email} (tag=${tagKey}):`, err);
    return NextResponse.json({ ok: true, crm: "error", tag: tagKey });
  }
}
