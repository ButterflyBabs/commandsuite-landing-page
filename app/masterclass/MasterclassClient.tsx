"use client";

import { useEffect, useState } from "react";
import { currentSession } from "./sessions";
import { trackEvent } from "../lib/pixel";

/* ------------------------------------------------------------------ */
/*  Session timing                                                     */
/*  Driven by the schedule in ./sessions.ts. When a session ends the   */
/*  countdown rolls to the next one by itself. Times are compared as   */
/*  UTC instants, so the countdown is correct in any viewer timezone.  */
/* ------------------------------------------------------------------ */

// Zoom's own registration page — the single front door now. Zoom requires
// registration on this meeting, so this is what mints each attendee's
// personal join link, not a shared static room URL (that would let people
// skip registration entirely). A cron job in lifecharter-architecture polls
// Zoom's registrant list and syncs it into Global Control's existing
// lccs-masterclass workflow — see /api/cron/masterclass-zoom-sync there.
const ZOOM_REGISTER_URL = "https://us02web.zoom.us/meeting/register/qHumbeSKSP-U3gsNsBHYQw";

function parts(ms: number) {
  const total = Math.max(0, Math.floor(ms / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

/* ------------------------------------------------------------------ */
/*  Countdown                                                          */
/* ------------------------------------------------------------------ */

export function Countdown({ light = false }: { light?: boolean }) {
  // null until mounted, to avoid a hydration mismatch
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    // Static placeholder that matches the mounted layout
    return <CountdownFrame days="--" hours="--" minutes="--" seconds="--" light={light} />;
  }

  const session = currentSession(now);

  // The run has finished. Say so, and keep collecting emails for the next one.
  if (!session) {
    return (
      <p
        className={`mt-2 inline-block rounded-full px-6 py-3 text-sm font-semibold ${
          light ? "border border-indigo/20 bg-white/70 text-indigo" : "border border-ivory/25 bg-ivory/10 text-ivory"
        }`}
      >
        Next dates announced soon — leave your details below and you&apos;ll hear first.
      </p>
    );
  }

  if (now >= session.startMs) {
    return (
      <p className="mt-2 inline-block rounded-full bg-gold px-6 py-3 text-sm font-semibold text-indigo-deep">
        ● We&apos;re live now — check your email for the room link.
      </p>
    );
  }

  const p = parts(session.startMs - now);
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <CountdownFrame
      days={String(p.days)}
      hours={pad(p.hours)}
      minutes={pad(p.minutes)}
      seconds={pad(p.seconds)}
      light={light}
    />
  );
}

function CountdownFrame({
  days,
  hours,
  minutes,
  seconds,
  light = false,
}: {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  light?: boolean;
}) {
  const cells: [string, string][] = [
    [days, "days"],
    [hours, "hrs"],
    [minutes, "min"],
    [seconds, "sec"],
  ];
  const cellClass = light
    ? "border-indigo/10 bg-white/70 shadow-card"
    : "border-ivory/20 bg-ivory/10 backdrop-blur";
  const numClass = light ? "text-indigo" : "text-ivory";
  const labelClass = light ? "text-indigo/50" : "text-ivory/60";
  return (
    <div className="flex items-stretch justify-center gap-3 sm:gap-4" aria-label="Time until the MasterClass begins">
      {cells.map(([val, label]) => (
        <div
          key={label}
          className={`flex min-w-[64px] flex-col items-center rounded-2xl border px-3 py-3 sm:min-w-[80px] ${cellClass}`}
        >
          <span className={`font-serif text-3xl font-semibold leading-none sm:text-4xl ${numClass}`}>{val}</span>
          <span className={`mt-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] ${labelClass}`}>{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Registration form → /api/register (fires the lccs-masterclass tag) */
/* ------------------------------------------------------------------ */

export function RegisterForm() {
  return (
    <div className="rounded-3xl border border-indigo/10 bg-white/85 p-6 text-center shadow-soft sm:p-8">
      <a
        href={ZOOM_REGISTER_URL}
        onClick={() => trackEvent("Lead", { content_name: "masterclass_registration" })}
        className="inline-flex w-full items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-indigo-deep shadow-soft transition hover:bg-gold-soft"
      >
        Save my seat on Zoom →
      </a>
      <p className="mt-4 text-center text-xs text-indigo/50">
        Free to attend. Zoom sends your personal join link and reminders — unsubscribe anytime.
      </p>
    </div>
  );
}
