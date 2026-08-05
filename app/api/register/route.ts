import { NextResponse } from "next/server";

/**
 * Registers a contact for a named offer by firing the matching Global Control tag.
 * Used by the assessment results "Save my MasterClass seat" action.
 *
 * Body: { email, firstName?, lastName?, tag: "masterclass" | "challenge" }
 *
 * Config (Vercel env vars):
 *   GLOBAL_CONTROL_API_KEY   the Global Control API key (X-API-KEY)
 *   GC_BASE                  optional, defaults to https://api.globalcontrol.io/api/ai
 *   GC_MASTERCLASS_TAG_ID    tag id for "From Hustle to Command" MasterClass registration (lccs-masterclass)
 *   GC_CHALLENGE_TAG_ID      optional tag id for the 21-Day Challenge
 *
 * Safe by default: if the relevant tag isn't configured, it returns ok without erroring
 * so the button still confirms to the user.
 */

const GC_BASE = process.env.GC_BASE || "https://api.globalcontrol.io/api/ai";

const TAG_ENV: Record<string, string | undefined> = {
  masterclass: process.env.GC_MASTERCLASS_TAG_ID,
  challenge: process.env.GC_CHALLENGE_TAG_ID,
};

export async function POST(req: Request) {
  let body: { email?: string; firstName?: string; lastName?: string; tag?: string };
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
  const apiKey = process.env.GLOBAL_CONTROL_API_KEY;

  if (!apiKey || !tagId) {
    return NextResponse.json({ ok: true, crm: "not_configured" });
  }

  try {
    const res = await fetch(`${GC_BASE}/tags/fire-tag/${encodeURIComponent(tagId)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-API-KEY": apiKey },
      body: JSON.stringify({
        email,
        firstName: (body.firstName || "").trim(),
        lastName: (body.lastName || "").trim(),
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: "fire_tag_failed", status: res.status }, { status: 502 });
    }
    return NextResponse.json({ ok: true, crm: "tagged", tag: tagKey });
  } catch {
    return NextResponse.json({ ok: false, error: "crm_error" }, { status: 502 });
  }
}
