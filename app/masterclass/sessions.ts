/**
 * MasterClass schedule — every other Thursday at 5:00 PM Mountain, starting
 * 8 October 2026 and continuing (set by AmiLynne 2026-09-25). LAST_SESSION is just
 * a far-off stop so the list is finite; move it out when it gets close.
 *
 * The page only ever names the NEXT session, never the cadence, on purpose:
 * AmiLynne wants urgency to register now, not people waiting for "the next one".
 *
 * The page always advertises the next session that hasn't finished. When one
 * ends, the countdown, the hero date card, the mid-page line and the structured
 * data all roll forward on their own.
 *
 * Unlike the earlier open-ended version, this series ENDS. After the final
 * session, currentSession() returns null and the page falls back to a
 * "next dates announced soon" state that still collects registrations —
 * so the page never advertises a date that isn't happening.
 *
 * TO EXTEND THE SERIES: move LAST_SESSION.
 * TO SKIP A WEEK: add its date to SKIP, e.g. "2026-11-26" for Thanksgiving.
 *
 * Why this isn't just "add 7 days of milliseconds": Mountain Time is UTC-6 in
 * daylight saving and UTC-7 outside it, and DST ends 1 November 2026 — inside
 * this run. Adding fixed milliseconds would hold the UTC instant steady and let
 * the local time drift, so every session from 5 November would quietly start at
 * 4:00 PM. Instead we step forward seven calendar days and re-resolve 5:00 PM in
 * America/Denver each time, which stays correct across the change.
 */

const FIRST_SESSION = { year: 2026, month: 9 /* 0-based: October */, day: 8 };
const LAST_SESSION = { year: 2027, month: 11 /* 0-based: December */, day: 30 };
const EVERY_N_DAYS = 14;

/** Dates to skip, as YYYY-MM-DD in Mountain Time. */
const SKIP: string[] = [];

const HOUR = 17; // 5:00 PM
const MINUTE = 0;
const ZONE = "America/Denver";

export const DURATION_MINUTES = 90;

export type SessionInfo = {
  /** Start, as a UTC instant — correct for a viewer in any timezone. */
  startMs: number;
  endMs: number;
  /** e.g. "Thursday, September 24, 2026" */
  dateLong: string;
  /** e.g. "5:00 PM Mountain Time" */
  time: string;
  /** e.g. "90 minutes" */
  duration: string;
  isoStart: string;
  isoEnd: string;
};

/** How far the zone sits from UTC at a particular instant, in ms. */
function zoneOffsetMs(utcMs: number): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONE,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(utcMs));

  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  const asIfUtc = Date.UTC(
    get("year"),
    get("month") - 1,
    get("day"),
    get("hour") % 24,
    get("minute"),
    get("second")
  );
  return asIfUtc - utcMs;
}

/** Resolve 5:00 PM Denver on a given calendar date to the UTC instant it means. */
function denverToUtcMs(year: number, month: number, day: number): number {
  const naive = Date.UTC(year, month, day, HOUR, MINUTE);
  // Two passes: the first offset is looked up at the wrong instant near a DST
  // boundary, the second lands on the right side of it.
  let utc = naive - zoneOffsetMs(naive);
  utc = naive - zoneOffsetMs(utc);
  return utc;
}

function describe(year: number, month: number, day: number): SessionInfo {
  const startMs = denverToUtcMs(year, month, day);
  const endMs = startMs + DURATION_MINUTES * 60_000;
  const start = new Date(startMs);

  const dateLong = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: ZONE,
  }).format(start);

  const clock = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: ZONE,
  }).format(start);

  return {
    startMs,
    endMs,
    dateLong,
    time: `${clock} Mountain Time`,
    duration: `${DURATION_MINUTES} minutes`,
    isoStart: start.toISOString(),
    isoEnd: new Date(endMs).toISOString(),
  };
}

/** Every session in the run, in order. Date arithmetic is done in pure UTC, which has no DST to trip over. */
function allSessions(): SessionInfo[] {
  const out: SessionInfo[] = [];
  const firstUtc = Date.UTC(FIRST_SESSION.year, FIRST_SESSION.month, FIRST_SESSION.day);
  const lastUtc = Date.UTC(LAST_SESSION.year, LAST_SESSION.month, LAST_SESSION.day);

  for (let ms = firstUtc; ms <= lastUtc; ms += EVERY_N_DAYS * 86_400_000) {
    const d = new Date(ms);
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth();
    const day = d.getUTCDate();
    const key = `${y}-${String(m + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    if (SKIP.includes(key)) continue;
    out.push(describe(y, m, day));
  }
  return out;
}

/**
 * The session to advertise right now — the next one that hasn't finished.
 * Returns null once the whole run is over, so the page can say so honestly
 * rather than promoting a date nobody is going to show up for.
 */
export function currentSession(now: number = Date.now()): SessionInfo | null {
  return allSessions().find((s) => now < s.endMs) ?? null;
}

/** How many sessions are still to come, including one in progress. */
export function sessionsRemaining(now: number = Date.now()): number {
  return allSessions().filter((s) => now < s.endMs).length;
}
