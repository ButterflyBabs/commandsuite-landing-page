/**
 * MasterClass schedule — every other Thursday at 5:00 PM Mountain, from
 * August 20, 2026, with no end date.
 *
 * The page always advertises the next session that hasn't finished. When one
 * ends, the countdown, the hero date card, the mid-page line and the structured
 * data all roll forward on their own — no code change, no deploy, nothing to
 * remember the morning after.
 *
 * Why this isn't just "add 14 days of milliseconds": Mountain Time is UTC-6 in
 * daylight saving and UTC-7 outside it. Adding fixed milliseconds would hold the
 * UTC instant steady and let the *local* time drift — so the November sessions
 * would quietly start at 4:00 PM. Instead we step forward 14 calendar days and
 * re-resolve 5:00 PM in America/Denver each time, which stays correct across
 * every DST change, forever.
 */

/** First session: Thursday, August 20, 2026. */
const ANCHOR = { year: 2026, month: 7 /* 0-based: August */, day: 20 };
const HOUR = 17; // 5:00 PM
const MINUTE = 0;
const EVERY_N_DAYS = 14;
const ZONE = "America/Denver";

export const DURATION_MINUTES = 90;

export type SessionInfo = {
  /** Start, as a UTC instant — correct for a viewer in any timezone. */
  startMs: number;
  endMs: number;
  /** e.g. "Thursday, September 3, 2026" */
  dateLong: string;
  /** e.g. "5:00 PM Mountain Time" */
  time: string;
  /** e.g. "90 minutes" */
  duration: string;
  isoStart: string;
  isoEnd: string;
};

/** How far the given zone sits from UTC at a particular instant, in ms. */
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

/** Resolve a wall-clock time in Denver to the UTC instant it refers to. */
function denverToUtcMs(year: number, month: number, day: number): number {
  const naive = Date.UTC(year, month, day, HOUR, MINUTE);
  // Two passes: the first offset is looked up at the wrong instant near a DST
  // boundary, the second lands on the right side of it.
  let utc = naive - zoneOffsetMs(naive);
  utc = naive - zoneOffsetMs(utc);
  return utc;
}

/** The nth session (0 = August 20, 2026), stepping 14 calendar days at a time. */
function occurrence(n: number): SessionInfo {
  // Date arithmetic in pure UTC has no DST to trip over, so the calendar step
  // is exact; the time-of-day is resolved separately, above.
  const dateOnly = new Date(
    Date.UTC(ANCHOR.year, ANCHOR.month, ANCHOR.day) + n * EVERY_N_DAYS * 86_400_000
  );
  const startMs = denverToUtcMs(
    dateOnly.getUTCFullYear(),
    dateOnly.getUTCMonth(),
    dateOnly.getUTCDate()
  );
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

/** The session to advertise right now: the next one that hasn't finished. */
export function currentSession(now: number = Date.now()): SessionInfo {
  const first = occurrence(0);
  if (now < first.endMs) return first;

  // Jump close to the right occurrence rather than counting from 2026 forever,
  // then step forward to land exactly.
  let n = Math.max(0, Math.floor((now - first.startMs) / (EVERY_N_DAYS * 86_400_000)) - 1);
  for (let guard = 0; guard < 64; guard++) {
    const s = occurrence(n);
    if (now < s.endMs) return s;
    n++;
  }
  return occurrence(n);
}
