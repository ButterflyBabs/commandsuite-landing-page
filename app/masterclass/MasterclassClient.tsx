"use client";

import { useEffect, useState } from "react";
import { currentSession } from "./sessions";

/* ------------------------------------------------------------------ */
/*  Session timing                                                     */
/*  Driven by the schedule in ./sessions.ts. When a session ends the   */
/*  countdown rolls to the next one by itself. Times are compared as   */
/*  UTC instants, so the countdown is correct in any viewer timezone.  */
/* ------------------------------------------------------------------ */

// Live Zoom room for the MasterClass
const ZOOM_URL = "https://us02web.zoom.us/j/89086652419?pwd=QIUda5GIEwqHWmMhOKhmys27FnhJ7K.1";

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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "busy") return;
    setState("busy");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName, tag: "masterclass" }),
      });
      // The route is "safe by default" — a 200 with crm:"not_configured"
      // still means the person is captured for the workflow to pick up.
      if (!res.ok) throw new Error("bad_status");
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-gold/40 bg-white/85 p-8 text-center shadow-soft">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal/15 text-2xl text-teal">
          ✓
        </div>
        <h3 className="mt-5 font-serif text-2xl font-semibold text-indigo">
          {firstName ? `You're in, ${firstName}.` : "You're in."}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-indigo/75">
          Your seat for <strong>From Hustle to Command</strong> is saved. We go live{" "}
          <strong>Thursday, August 20 at 5:00 PM Mountain</strong> — here&apos;s your room link (we&apos;ve emailed
          it too, and we&apos;ll send a reminder before we start).
        </p>
        <a
          href={ZOOM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-indigo-deep shadow-soft transition hover:bg-gold-soft"
        >
          Join the Zoom room →
        </a>
        <p className="mt-3 text-xs text-indigo/50">
          Tip: save this link — it&apos;s the same room on the day of the class.
        </p>
        <p className="mt-6 font-serif text-lg text-plum">Head Up — Wings Out. 🦋</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-indigo/10 bg-white/85 p-6 shadow-soft sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          autoComplete="given-name"
          className="rounded-xl border border-indigo/20 bg-white px-4 py-3 text-indigo outline-none transition focus:border-gold"
        />
        <input
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          autoComplete="family-name"
          className="rounded-xl border border-indigo/20 bg-white px-4 py-3 text-indigo outline-none transition focus:border-gold"
        />
      </div>
      <input
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        autoComplete="email"
        className="mt-4 w-full rounded-xl border border-indigo/20 bg-white px-4 py-3 text-indigo outline-none transition focus:border-gold"
      />
      <button
        type="submit"
        disabled={state === "busy"}
        className="mt-5 w-full rounded-full bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-indigo-deep shadow-soft transition hover:bg-gold-soft disabled:opacity-60"
      >
        {state === "busy" ? "Saving your seat…" : "Save my seat →"}
      </button>
      {state === "error" && (
        <p className="mt-3 text-center text-sm text-red-600">
          Something hiccupped on our end. Please try once more — or email amilynne@amilynnecarroll.com and we&apos;ll save your seat by hand.
        </p>
      )}
      <p className="mt-4 text-center text-xs text-indigo/50">
        Free to attend. We&apos;ll email the join link and occasional resources — unsubscribe anytime.
      </p>
    </form>
  );
}
