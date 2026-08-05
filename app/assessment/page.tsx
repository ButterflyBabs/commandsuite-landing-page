"use client";

import { useMemo, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Brand mark                                                         */
/* ------------------------------------------------------------------ */

function Compass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <polygon points="50,14 57,50 50,44 43,50" fill="currentColor" opacity="0.9" />
      <polygon points="50,86 43,50 50,56 57,50" fill="currentColor" opacity="0.4" />
      <circle cx="50" cy="50" r="3.5" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Assessment data — 12 business dimensions + 2 readiness questions   */
/* ------------------------------------------------------------------ */

type Dim = {
  key: string;
  label: string;
  statement: string;
  reason: string; // why the Command Suite fixes this specific gap
};

const DIMENSIONS: Dim[] = [
  {
    key: "marketing",
    label: "Marketing",
    statement: "I have a clear, consistent marketing rhythm — I always know what I'm sharing and why.",
    reason:
      "The Command Suite's content creation, content calendar, and scripts give you a marketing rhythm you don't have to reinvent every week.",
  },
  {
    key: "sales",
    label: "Sales",
    statement: "I have a reliable sales process, and I can see my pipeline and conversion at a glance.",
    reason:
      "A live sales pipeline with conversion tracking means you always know where every opportunity stands — no more guessing.",
  },
  {
    key: "operations",
    label: "Operations",
    statement: "My day-to-day runs on documented processes, not on me remembering everything.",
    reason:
      "The 8 operational pillars turn 'it's all in my head' into documented, trackable systems you can actually rely on.",
  },
  {
    key: "finance",
    label: "Finance",
    statement: "I know my numbers in real time — income, expenses, and profit — without scrambling.",
    reason:
      "A live finance ledger with budgets and a monthly review puts your real numbers one click away, always current.",
  },
  {
    key: "team",
    label: "Team",
    statement: "The people who help me have clear roles and know exactly what to own.",
    reason:
      "Clear plans and roles inside the Command Suite mean your team or contractors know what's theirs — so it stops all running through you.",
  },
  {
    key: "systems",
    label: "Systems",
    statement: "My business runs on repeatable systems and templates I could hand off.",
    reason:
      "Repeatable systems, scripts, and a templates library you can finally delegate instead of rebuilding each time.",
  },
  {
    key: "leadership",
    label: "Leadership",
    statement: "I lead from vision and intention — not from reaction and constant firefighting.",
    reason:
      "Executive coaching plus the Daily Compass keep you leading from vision and priorities, not from your inbox.",
  },
  {
    key: "vision",
    label: "Vision",
    statement: "I have a clear, written vision and plan for where this business is going.",
    reason:
      "Your Business and Vision plans live in the Command Suite and feed your daily focus — so the big picture actually drives the day.",
  },
  {
    key: "product",
    label: "Product & Offers",
    statement: "My offers are clear, priced with confidence, and finished — no half-built ideas.",
    reason:
      "Plan, price, and sharpen your offers in one place — the end of the half-finished-offer pile.",
  },
  {
    key: "client_experience",
    label: "Client Experience",
    statement: "My clients get a consistent, excellent experience from first touch to delivery.",
    reason:
      "Contacts, delivery, and follow-up in one place create a consistent client journey that doesn't depend on your memory.",
  },
  {
    key: "legal",
    label: "Legal & Admin",
    statement: "The legal and admin foundations of my business are handled and current.",
    reason:
      "Track your legal and admin foundations as a live dimension, so nothing important quietly slips.",
  },
  {
    key: "sustainability",
    label: "Sustainability",
    statement: "My business is built to last and grow — without burning me out.",
    reason:
      "Forecasting and the sustainability dimension keep you building something durable, not something that runs on fumes.",
  },
];

type ReadinessQ = { key: string; question: string; options: { label: string; value: number }[] };

const READINESS: ReadinessQ[] = [
  {
    key: "readiness_timeline",
    question: "How soon do you want your business running on one integrated system?",
    options: [
      { label: "Honestly? Yesterday — I'm ready now", value: 5 },
      { label: "In the next 1–3 months", value: 4 },
      { label: "Sometime this year", value: 2 },
      { label: "Just exploring for now", value: 1 },
    ],
  },
  {
    key: "readiness_priority",
    question: "When you find the right system and expert guidance, how ready are you to invest in it?",
    options: [
      { label: "Ready to move now", value: 5 },
      { label: "Ready once I see it's the right fit", value: 4 },
      { label: "Interested, but I need some time", value: 2 },
      { label: "Not there yet", value: 1 },
    ],
  },
];

const SCALE = [
  { label: "Not at all", value: 1 },
  { label: "Rarely", value: 2 },
  { label: "Sometimes", value: 3 },
  { label: "Mostly", value: 4 },
  { label: "Fully", value: 5 },
];

/* ------------------------------------------------------------------ */
/*  Placeholder destination links — swap for the real URLs            */
/* ------------------------------------------------------------------ */

const LINKS = {
  challenge: "#", // 21-Day Executive Challenge signup
  masterclass: "#", // "From Hustle to Command" MasterClass registration
  consultation: "#call", // Executive Consultation booking
};

/* ------------------------------------------------------------------ */
/*  Scoring + recommendation                                           */
/* ------------------------------------------------------------------ */

type Results = {
  overall: number; // 0-100
  band: "foundational" | "building" | "strong";
  topGaps: Dim[];
  readiness: number; // 1-5 avg
  recommendation: "challenge" | "masterclass" | "consultation";
};

function computeResults(dimAnswers: Record<string, number>, readinessAnswers: Record<string, number>): Results {
  const scores = DIMENSIONS.map((d) => dimAnswers[d.key] ?? 3);
  const sum = scores.reduce((a, b) => a + b, 0);
  const overall = Math.round((sum / (DIMENSIONS.length * 5)) * 100);

  const ranked = [...DIMENSIONS].sort((a, b) => (dimAnswers[a.key] ?? 3) - (dimAnswers[b.key] ?? 3));
  const topGaps = ranked.slice(0, 3);

  const rVals = READINESS.map((r) => readinessAnswers[r.key] ?? 3);
  const readiness = rVals.reduce((a, b) => a + b, 0) / rVals.length;

  const band: Results["band"] = overall <= 45 ? "foundational" : overall <= 70 ? "building" : "strong";

  let recommendation: Results["recommendation"];
  if (readiness >= 4 && overall >= 75) recommendation = "consultation";
  else if (readiness >= 4) recommendation = "masterclass";
  else recommendation = "challenge";

  return { overall, band, topGaps, readiness, recommendation };
}

const BAND_COPY: Record<Results["band"], { headline: string; sub: string }> = {
  foundational: {
    headline: "You're running on willpower — and you can feel it.",
    sub: "There's real opportunity here. A few key systems would change how the whole business feels.",
  },
  building: {
    headline: "You've built something real. The ceiling is structural.",
    sub: "You're past survival — now the gaps are in process and structure, exactly what a command system solves.",
  },
  strong: {
    headline: "You're strong, and closer than you think.",
    sub: "The fundamentals are here. One integrated system is how you scale without breaking what works.",
  },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

const TOTAL_QUESTIONS = DIMENSIONS.length + READINESS.length;

export default function AssessmentPage() {
  // step: 0 = intro, 1..TOTAL_QUESTIONS = questions, TOTAL+1 = capture, TOTAL+2 = results
  const [step, setStep] = useState(0);
  const [dimAnswers, setDimAnswers] = useState<Record<string, number>>({});
  const [readinessAnswers, setReadinessAnswers] = useState<Record<string, number>>({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const CAPTURE_STEP = TOTAL_QUESTIONS + 1;
  const RESULTS_STEP = TOTAL_QUESTIONS + 2;

  const results = useMemo(
    () => (step === RESULTS_STEP ? computeResults(dimAnswers, readinessAnswers) : null),
    [step, RESULTS_STEP, dimAnswers, readinessAnswers],
  );

  const answeredCount = Object.keys(dimAnswers).length + Object.keys(readinessAnswers).length;
  const progress = Math.round((answeredCount / TOTAL_QUESTIONS) * 100);

  function pickDim(key: string, value: number) {
    setDimAnswers((p) => ({ ...p, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 180);
  }
  function pickReadiness(key: string, value: number) {
    setReadinessAnswers((p) => ({ ...p, [key]: value }));
    setTimeout(() => setStep((s) => s + 1), 180);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    const computed = computeResults(dimAnswers, readinessAnswers);
    try {
      await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          dimAnswers,
          readinessAnswers,
          overall: computed.overall,
          topGaps: computed.topGaps.map((d) => d.label),
          recommendation: computed.recommendation,
        }),
      });
    } catch {
      // Non-blocking: we still show results even if the CRM save hiccups.
      setSubmitError("");
    } finally {
      setSubmitting(false);
      setStep(RESULTS_STEP);
    }
  }

  /* ---------- shared shell ---------- */
  return (
    <main className="min-h-screen bg-watercolor-soft">
      <header className="border-b border-indigo/10 bg-ivory/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-6 py-4">
          <Compass className="h-6 w-6 text-gold" />
          <span className="font-serif text-lg font-semibold text-indigo">LifeCharter</span>
          <span className="ml-auto text-xs font-semibold uppercase tracking-[0.2em] text-indigo/50">
            Executive Business Assessment
          </span>
        </div>
        {step >= 1 && step <= TOTAL_QUESTIONS && (
          <div className="h-1 w-full bg-indigo/10">
            <div className="h-full bg-gold transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        )}
      </header>

      <div className="mx-auto max-w-3xl px-6 py-14">
        {/* INTRO */}
        {step === 0 && (
          <div className="text-center animate-fadeUp">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
              Complimentary · 3–4 minutes
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-indigo md:text-5xl">
              The Executive Business Assessment
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-indigo/80">
              Twelve quick reads across the dimensions that actually run a business — plus where you
              are on the journey. At the end you&apos;ll get a clear, practical picture of what&apos;s
              working, what&apos;s missing, and your best next step.
            </p>
            <button
              onClick={() => setStep(1)}
              className="mt-10 inline-flex items-center justify-center rounded-full bg-gold px-9 py-4 text-sm font-semibold tracking-wide text-indigo-deep shadow-soft transition hover:bg-gold-soft"
            >
              Start the assessment →
            </button>
            <p className="mt-4 text-sm text-indigo/50">No wrong answers. Just an honest read.</p>
          </div>
        )}

        {/* DIMENSION QUESTIONS */}
        {step >= 1 && step <= DIMENSIONS.length && (() => {
          const d = DIMENSIONS[step - 1];
          return (
            <div key={d.key} className="animate-fadeUp">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">
                {d.label} · Question {step} of {TOTAL_QUESTIONS}
              </p>
              <h2 className="mt-4 font-serif text-2xl font-semibold leading-snug text-indigo md:text-3xl">
                {d.statement}
              </h2>
              <div className="mt-8 space-y-3">
                {SCALE.map((opt) => {
                  const active = dimAnswers[d.key] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => pickDim(d.key, opt.value)}
                      className={`flex w-full items-center justify-between rounded-2xl border px-6 py-4 text-left transition ${
                        active
                          ? "border-gold bg-gold/15 text-indigo"
                          : "border-indigo/15 bg-white/70 text-indigo/80 hover:border-gold/60 hover:bg-white"
                      }`}
                    >
                      <span className="font-medium">{opt.label}</span>
                      <span className={`text-sm ${active ? "text-gold" : "text-indigo/30"}`}>{opt.value}</span>
                    </button>
                  );
                })}
              </div>
              {step > 1 && (
                <button onClick={() => setStep((s) => s - 1)} className="mt-8 text-sm text-indigo/50 hover:text-indigo">
                  ← Back
                </button>
              )}
            </div>
          );
        })()}

        {/* READINESS QUESTIONS */}
        {step > DIMENSIONS.length && step <= TOTAL_QUESTIONS && (() => {
          const r = READINESS[step - DIMENSIONS.length - 1];
          return (
            <div key={r.key} className="animate-fadeUp">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal">
                Readiness · Question {step} of {TOTAL_QUESTIONS}
              </p>
              <h2 className="mt-4 font-serif text-2xl font-semibold leading-snug text-indigo md:text-3xl">
                {r.question}
              </h2>
              <div className="mt-8 space-y-3">
                {r.options.map((opt) => {
                  const active = readinessAnswers[r.key] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => pickReadiness(r.key, opt.value)}
                      className={`flex w-full items-center rounded-2xl border px-6 py-4 text-left transition ${
                        active
                          ? "border-gold bg-gold/15 text-indigo"
                          : "border-indigo/15 bg-white/70 text-indigo/80 hover:border-gold/60 hover:bg-white"
                      }`}
                    >
                      <span className="font-medium">{opt.label}</span>
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setStep((s) => s - 1)} className="mt-8 text-sm text-indigo/50 hover:text-indigo">
                ← Back
              </button>
            </div>
          );
        })()}

        {/* CAPTURE */}
        {step === CAPTURE_STEP && (
          <form onSubmit={handleSubmit} className="animate-fadeUp text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-gold">Almost there</p>
            <h2 className="font-serif text-3xl font-semibold leading-tight text-indigo md:text-4xl">
              Where should we send your results?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-indigo/70">
              Your personalized breakdown and recommended next step are ready.
            </p>
            <div className="mx-auto mt-8 max-w-md space-y-4 text-left">
              <div className="grid grid-cols-2 gap-4">
                <input
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="First name"
                  className="rounded-xl border border-indigo/20 bg-white px-4 py-3 text-indigo outline-none focus:border-gold"
                />
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last name"
                  className="rounded-xl border border-indigo/20 bg-white px-4 py-3 text-indigo outline-none focus:border-gold"
                />
              </div>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-xl border border-indigo/20 bg-white px-4 py-3 text-indigo outline-none focus:border-gold"
              />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-full bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-indigo-deep shadow-soft transition hover:bg-gold-soft disabled:opacity-60"
              >
                {submitting ? "Preparing your results…" : "Show me my results →"}
              </button>
              {submitError && <p className="text-sm text-red-600">{submitError}</p>}
              <p className="text-center text-xs text-indigo/50">
                We&apos;ll email your results and occasional resources. Unsubscribe anytime.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="mt-8 text-sm text-indigo/50 hover:text-indigo"
            >
              ← Back
            </button>
          </form>
        )}

        {/* RESULTS */}
        {step === RESULTS_STEP && results && (
          <ResultsView results={results} firstName={firstName} lastName={lastName} email={email} />
        )}
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/*  Results view                                                       */
/* ------------------------------------------------------------------ */

function ResultsView({
  results,
  firstName,
  lastName,
  email,
}: {
  results: Results;
  firstName: string;
  lastName: string;
  email: string;
}) {
  const band = BAND_COPY[results.band];
  const rec = results.recommendation;
  const [mcState, setMcState] = useState<"idle" | "busy" | "done">("idle");

  async function joinMasterclass() {
    if (mcState === "busy") return;
    setMcState("busy");
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, lastName, tag: "masterclass" }),
      });
    } catch {
      /* non-blocking */
    }
    setMcState("done");
    if (LINKS.masterclass && LINKS.masterclass !== "#") {
      window.location.href = LINKS.masterclass;
    }
  }

  const registeredInline = mcState === "done" && (!LINKS.masterclass || LINKS.masterclass === "#");

  const mcPrimary = registeredInline ? (
    <p className="mt-7 inline-block rounded-full bg-teal/10 px-7 py-4 text-sm font-semibold text-teal">
      ✓ You&apos;re in — your seat is saved. Check your email for the details.
    </p>
  ) : (
    <button
      onClick={joinMasterclass}
      disabled={mcState === "busy"}
      className="mt-7 inline-block rounded-full bg-gold px-8 py-4 text-sm font-semibold text-indigo-deep shadow-soft transition hover:bg-gold-soft disabled:opacity-60"
    >
      {mcState === "busy" ? "Saving your seat…" : "Save my MasterClass seat →"}
    </button>
  );

  const mcLink = (label: string) =>
    registeredInline ? (
      <span className="font-semibold text-teal">✓ You&apos;re registered — check your email</span>
    ) : (
      <button
        onClick={joinMasterclass}
        disabled={mcState === "busy"}
        className="font-semibold text-teal underline-offset-2 hover:text-plum hover:underline disabled:opacity-60"
      >
        {mcState === "busy" ? "Saving your seat…" : label}
      </button>
    );

  return (
    <div className="animate-fadeUp">
      {/* Score */}
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          {firstName ? `${firstName}, here's your read` : "Your results"}
        </p>
        <div className="mx-auto mt-6 flex h-40 w-40 flex-col items-center justify-center rounded-full border-4 border-gold/40 bg-white/70">
          <span className="font-serif text-5xl font-semibold text-indigo">{results.overall}</span>
          <span className="text-xs uppercase tracking-widest text-indigo/50">out of 100</span>
        </div>
        <h1 className="mx-auto mt-8 max-w-xl font-serif text-3xl font-semibold leading-tight text-indigo md:text-4xl">
          {band.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-indigo/75">{band.sub}</p>
      </div>

      {/* Top gaps → why the Command Suite */}
      <div className="mt-14">
        <h2 className="text-center font-serif text-2xl font-semibold text-indigo">
          Your three biggest openings — and exactly how the Command Suite closes them
        </h2>
        <div className="mt-8 space-y-4">
          {results.topGaps.map((d) => (
            <div key={d.key} className="rounded-2xl border border-indigo/10 bg-white/80 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <Compass className="h-5 w-5 shrink-0 text-teal" />
                <h3 className="font-serif text-lg font-semibold text-indigo">{d.label}</h3>
              </div>
              <p className="mt-2 leading-relaxed text-indigo/75">{d.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendation / routing */}
      <div className="mt-14 rounded-3xl border border-gold/40 bg-white/80 p-8 text-center shadow-soft">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">Your best next step</p>

        {rec === "challenge" && (
          <>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-indigo md:text-3xl">
              Start with the free 21-Day Executive Challenge
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-indigo/75">
              A daily, guided on-ramp that turns these openings into momentum — and shows you what it
              feels like to run your business with structure, one day at a time.
            </p>
            <a href={LINKS.challenge} className="mt-7 inline-block rounded-full bg-gold px-8 py-4 text-sm font-semibold text-indigo-deep shadow-soft transition hover:bg-gold-soft">
              Join the 21-Day Challenge →
            </a>
            <p className="mt-6 text-sm text-indigo/60">
              Ready sooner? {mcLink("Join the free “From Hustle to Command” MasterClass")}
            </p>
          </>
        )}

        {rec === "masterclass" && (
          <>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-indigo md:text-3xl">
              Join the free “From Hustle to Command” MasterClass
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-indigo/75">
              You&apos;re ready to move. See the full method — and the Command Suite that runs it —
              then get started on the spot.
            </p>
            {mcPrimary}
            <p className="mt-6 text-sm text-indigo/60">
              Prefer a slower on-ramp?{" "}
              <a href={LINKS.challenge} className="font-semibold text-teal hover:text-plum">
                Start with the free 21-Day Challenge
              </a>
            </p>
          </>
        )}

        {rec === "consultation" && (
          <>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-indigo md:text-3xl">
              Let&apos;s talk — book your Executive Consultation
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-indigo/75">
              You have the fundamentals and you&apos;re ready now. A short consultation is the fastest
              way to map your build and find the right fit.
            </p>
            <a href={LINKS.consultation} className="mt-7 inline-block rounded-full bg-gold px-8 py-4 text-sm font-semibold text-indigo-deep shadow-soft transition hover:bg-gold-soft">
              Book my Executive Consultation →
            </a>
            <p className="mt-6 text-sm text-indigo/60">
              Want to see the method first? {mcLink("Join “From Hustle to Command”")}
            </p>
          </>
        )}
      </div>

      <p className="mx-auto mt-10 max-w-xl text-center font-serif text-lg text-plum">
        From white-knuckling a scattered hustle to a soft landing — one system, on purpose.
      </p>
    </div>
  );
}
