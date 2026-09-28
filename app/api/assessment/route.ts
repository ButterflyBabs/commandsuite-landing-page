import { NextResponse } from "next/server";

/**
 * Receives an Executive Business Assessment submission and hands it to the
 * LifeCharter Command Suite's own CRM (Babs, 2026-09-28: nothing new in Global
 * Control). The Suite saves the contact (tagged executive-assessment) with
 * their scores on their timeline, emails them their results, and copies Babs.
 *
 *   SUITE_URL   optional, defaults to https://lccommandsuite.com
 *
 * The assessment still shows results even if this call fails — capture is best-effort.
 */

const SUITE = (process.env.SUITE_URL || "https://lccommandsuite.com").replace(/\/$/, "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }
  const email = String(body.email || "").trim();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }
  try {
    const res = await fetch(`${SUITE}/api/assessment-results`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const out = await res.json().catch(() => ({}));
    return NextResponse.json(res.ok ? { ok: true, crm: "saved" } : { ok: false, error: out.error || "crm_error" }, { status: res.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false, error: "crm_error" }, { status: 502 });
  }
}
