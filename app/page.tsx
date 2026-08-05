import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Brand imagery (hosted on ImageKit)                                 */
/* ------------------------------------------------------------------ */

const IK = "https://ik.imagekit.io/amilynne/LC%20Command%20Suite%20";
const IMG = {
  ecosystem: `${IK}/ChatGPT%20Image%20Aug%205,%202026,%2012_30_58%20PM%20(8).png`, // One ecosystem. Multiple doorways.
  clarity: `${IK}/ChatGPT%20Image%20Aug%205,%202026,%2012_30_56%20PM%20(1).png`, // Lead with Clarity. Build with Purpose.
  brand: `${IK}/ChatGPT%20Image%20Aug%205,%202026,%2012_30_57%20PM%20(6).png`, // Clarity. Alignment. Activation. Ascension.
  howItWorks: `${IK}/ChatGPT%20Image%20Aug%205,%202026,%2012_30_58%20PM%20(7).png`, // How the Command Suite Works
  executiveHome: `${IK}/ChatGPT%20Image%20Aug%205,%202026,%2012_30_56%20PM%20(2).png`,
  dailyCompass: `${IK}/ChatGPT%20Image%20Aug%205,%202026,%2012_30_57%20PM%20(4).png`,
  finance: `${IK}/ChatGPT%20Image%20Aug%205,%202026,%2012_30_57%20PM%20(5).png`,
  planning: `${IK}/ChatGPT%20Image%20Aug%205,%202026,%2012_30_56%20PM%20(3).png`,
};

/* ------------------------------------------------------------------ */
/*  Brand motifs                                                       */
/* ------------------------------------------------------------------ */

function Compass({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="46" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.35" />
      <polygon points="50,14 57,50 50,44 43,50" fill="currentColor" opacity="0.9" />
      <polygon points="50,86 43,50 50,56 57,50" fill="currentColor" opacity="0.4" />
      <circle cx="50" cy="50" r="3.5" fill="currentColor" />
    </svg>
  );
}

function Butterfly({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden="true">
      <g fill="currentColor">
        <path d="M60 50c-6-22-24-34-40-30-14 3.5-18 20-8 32 9 11 30 11 48 4z" opacity="0.85" />
        <path d="M60 50c6-22 24-34 40-30 14 3.5 18 20 8 32-9 11-30 11-48 4z" opacity="0.85" />
        <path d="M60 50c-5 16-18 26-30 24-10-2-13-14-5-22 7-7 22-8 35-2z" opacity="0.55" />
        <path d="M60 50c5 16 18 26 30 24 10-2 13-14 5-22-7-7-22-8-35-2z" opacity="0.55" />
        <ellipse cx="60" cy="50" rx="2.6" ry="16" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
      {children}
    </p>
  );
}

function PrimaryCTA({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-semibold tracking-wide text-indigo-deep shadow-soft transition hover:bg-gold-soft focus:outline-none focus:ring-2 focus:ring-gold/60"
    >
      {children}
    </a>
  );
}

function GhostCTA({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full border px-8 py-4 text-sm font-semibold tracking-wide transition focus:outline-none focus:ring-2 focus:ring-gold/50 ${
        light
          ? "border-ivory/40 text-ivory hover:bg-ivory/10"
          : "border-indigo/25 text-indigo hover:bg-indigo/5"
      }`}
    >
      {children}
    </a>
  );
}

function Divider() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-center px-6">
      <div className="filigree-divider w-full" />
      <Compass className="mx-4 h-6 w-6 shrink-0 text-gold" />
      <div className="filigree-divider w-full" />
    </div>
  );
}

/* A framed showcase image (brand banners + product mockups) */
function ShowcaseImage({
  src,
  alt,
  caption,
}: {
  src: string;
  alt: string;
  caption?: string;
}) {
  return (
    <figure className="mx-auto max-w-6xl px-6">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-2xl border border-indigo/10 shadow-soft"
      />
      {caption && (
        <figcaption className="mt-4 text-center text-sm text-indigo/60">{caption}</figcaption>
      )}
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-indigo/10 bg-ivory/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 text-indigo">
          <Compass className="h-6 w-6 text-gold" />
          <span className="font-serif text-lg font-semibold tracking-wide">LifeCharter</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-indigo/80 md:flex">
          <a href="#what" className="hover:text-indigo">What it is</a>
          <a href="#tour" className="hover:text-indigo">The command center</a>
          <a href="#start" className="hover:text-indigo">Ways to start</a>
          <a
            href="#call"
            className="rounded-full bg-gold px-5 py-2 font-semibold text-indigo-deep hover:bg-gold-soft"
          >
            Book an alignment call
          </a>
        </div>
      </nav>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections                                                           */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="top" className="bg-ivory">
      <Nav />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.ecosystem}
        alt="LifeCharter Command Suite — one ecosystem, multiple doorways: your whole business, planning, focus, and finances, in one aligned command center"
        className="mx-auto block w-full max-w-[1600px]"
      />
    </section>
  );
}

function TransformationStatement() {
  return (
    <section className="bg-watercolor-deep relative overflow-hidden py-24 text-ivory">
      <Butterfly className="pointer-events-none absolute -right-10 top-10 h-56 w-56 animate-floaty text-gold/15" />
      <Compass className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 text-lavender/10" />
      <div className="relative mx-auto max-w-4xl px-6 text-center animate-fadeUp">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.28em] text-gold">
          An architect-led alignment program with a working command center
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-[1.1] text-balance sm:text-5xl md:text-6xl">
          From white-knuckling a scattered hustle to a soft landing.
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-ivory/80">
          One clear command center where your mission, brand, and business finally align — on purpose
          — so you can build a legacy instead of just surviving the next launch.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryCTA href="#tour">See the command center in action →</PrimaryCTA>
          <GhostCTA href="#assessment" light>
            Take the free alignment assessment
          </GhostCTA>
        </div>
      </div>
    </section>
  );
}

function Tension() {
  const symptoms = [
    "Too many tools and tabs, no command center",
    "Great work, positioned in a way that doesn't land",
    "Delivery capped because it all runs through you",
    "Growing — but quietly off-mission",
  ];
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="font-serif text-3xl font-semibold leading-tight text-balance md:text-4xl">
          You didn&apos;t build this on a plan. You built it on willpower. And you can feel the ceiling.
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-indigo/80">
          <p>
            You&apos;re good at what you do — that was never the problem. But somewhere along the way
            the business started running <em>you</em>. There are too many tabs, too many tools, a
            handful of half-finished offers, and a nagging sense that none of it quite fits the person
            you actually are.
          </p>
          <p>
            That&apos;s not a productivity problem. It&apos;s an <strong>alignment</strong> problem.
            Your business grew reactively, and now it&apos;s running on fear instead of Truth —
            off-mission, off-brand, and capped, because everything still runs through you.
          </p>
          <p className="font-medium text-indigo">
            You don&apos;t need to hustle harder. You need to come back into alignment — and then have
            somewhere to <em>keep</em> it.
          </p>
        </div>
      </div>
      <div className="mx-auto mt-14 grid max-w-4xl gap-4 px-6 sm:grid-cols-2">
        {symptoms.map((s) => (
          <div
            key={s}
            className="rounded-2xl border border-indigo/10 bg-white/60 px-6 py-5 text-left text-indigo/75 shadow-card"
          >
            {s}
          </div>
        ))}
      </div>
    </section>
  );
}

function WhatItIs() {
  return (
    <section id="what" className="bg-watercolor-soft py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Eyebrow>What LifeCharter actually is</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight text-balance md:text-4xl">
          Find your alignment. Then run your business from it.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl font-serif text-2xl font-medium leading-snug text-plum text-balance">
          &ldquo;The coaching is where you find your alignment. The command center is where you live
          it — every day.&rdquo;
        </p>
      </div>
      <div className="mx-auto mt-14 grid max-w-5xl gap-6 px-6 md:grid-cols-2">
        <div className="card-hover rounded-3xl bg-white/70 p-8 shadow-card">
          <Compass className="h-10 w-10 text-teal" />
          <h3 className="mt-5 font-serif text-xl font-semibold text-indigo">The coaching — your why</h3>
          <p className="mt-3 leading-relaxed text-indigo/75">
            Executive coaching, led by your Alignment Architect in a grounded cohort, is where you find
            your Truth: who you are, what your business is really for, and the legacy you&apos;re
            building.
          </p>
        </div>
        <div className="card-hover rounded-3xl bg-white/70 p-8 shadow-card">
          <Butterfly className="h-10 w-14 text-gold" />
          <h3 className="mt-5 font-serif text-xl font-semibold text-indigo">
            The command center — where you live it
          </h3>
          <p className="mt-3 leading-relaxed text-indigo/75">
            The cockpit where that alignment becomes real work, week after week, instead of evaporating
            after the call. You never get the command center on its own — the coaching and the cockpit
            always come together.
          </p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-2xl px-6 text-center text-indigo/70">
        You&apos;re not a user here; you&apos;re a client — and this is an architect-and-client
        relationship from day one.
      </p>
    </section>
  );
}

function Proof() {
  const modules = [
    [IMG.executiveHome, "Executive Home — see your day, priorities, and momentum at a glance"],
    [IMG.dailyCompass, "Daily Compass — align your day with what matters most"],
    [IMG.finance, "Finance Center — track the numbers that move your mission"],
    [IMG.planning, "Planning Hub — turn big-picture vision into structured, strategic action"],
  ] as const;
  return (
    <section id="tour" className="bg-indigo-deep py-24 text-ivory">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Eyebrow>Proof, not promises</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight text-balance md:text-4xl">
          This isn&apos;t a waitlist. It&apos;s a working command center.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ivory/80">
          Most programs ask you to imagine the transformation. We&apos;ll just show you — a fully
          built command center with real numbers, real scores, and the whole system populated. This is
          what it looks like when your business finally runs from one place.
        </p>
      </div>

      {/* How it works — the centerpiece */}
      <div className="mt-12">
        <ShowcaseImage
          src={IMG.howItWorks}
          alt="How the Command Suite works — four connected pillars: See Clearly, Plan Strategically, Execute Daily, Review & Refine"
        />
      </div>

      {/* Tour the cockpit — module gallery */}
      <p className="mx-auto mt-14 mb-6 max-w-3xl px-6 text-center font-serif text-2xl text-gold">
        Take a tour of the cockpit
      </p>
      <div className="mx-auto grid max-w-6xl gap-5 px-6 sm:grid-cols-2">
        {modules.map(([src, alt]) => (
          <figure
            key={alt}
            className="overflow-hidden rounded-2xl border border-ivory/15 bg-ivory shadow-soft"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} loading="lazy" className="w-full" />
          </figure>
        ))}
      </div>

      <div className="mt-12 flex flex-col items-center justify-center gap-4 px-6 sm:flex-row">
        <PrimaryCTA href="#call">Book your alignment call →</PrimaryCTA>
        <GhostCTA href="#assessment" light>
          Take the free assessment and see your own first score
        </GhostCTA>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const before = [
    "Scattered across tools and tabs",
    "Reactive, running on fear",
    "Great work that doesn't land",
    "Capped — everything runs through you",
    "Growing, but off-mission",
  ];
  const after = [
    "One command center, running on purpose",
    "Aligned — mission, brand, and business as one",
    "Positioned clearly, landing with the right people",
    "Systems that hold it, so you're not the bottleneck",
    "Building a legacy, not just the next launch",
  ];
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <Eyebrow>The transformation, made concrete</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold md:text-4xl">Before → after</h2>
      </div>
      <div className="mx-auto mt-12 grid max-w-4xl gap-6 px-6 md:grid-cols-2">
        <div className="rounded-3xl border border-indigo/10 bg-white/50 p-8">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-indigo/40">
            Before
          </h3>
          <ul className="space-y-3 text-indigo/55">
            {before.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-1 text-indigo/25">—</span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-plum/5 p-8 shadow-card">
          <Butterfly className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 text-gold/15" />
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-teal">After</h3>
          <ul className="space-y-3 text-indigo">
            {after.map((a) => (
              <li key={a} className="flex gap-3">
                <span className="mt-1 text-gold">✦</span>
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-2xl px-6 text-center font-serif text-xl text-plum text-balance">
        This is what a soft landing looks like: not less ambition — less friction, and finally
        aligned.
      </p>
    </section>
  );
}

/* Full-bleed brand banner: Clarity. Alignment. Activation. Ascension. */
function BrandBand() {
  return (
    <section aria-label="Clarity. Alignment. Activation. Ascension." className="bg-indigo-deep">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.brand}
        alt="Clarity. Alignment. Activation. Ascension. — a command system for becoming what you are called to build."
        loading="lazy"
        className="mx-auto w-full max-w-[1600px]"
      />
    </section>
  );
}

function Inside() {
  const suite = [
    "12 live business dimensions",
    "8 operational pillars",
    "Profit Architecture, Brain & Soul assessments",
    "The Daily Compass operating surface",
    "Live finance ledger",
    "Sales pipeline & conversion tracking",
    "Business, marketing, sales & forecasting plans",
    "Scripts & templates library",
    "Guided step-by-step setup",
  ];
  const community = [
    ["Weekly community coaching", "Group calls, with 1:1 as needed."],
    ["Weekly tech-support call", "Get unstuck in the command center."],
    ["2× monthly Growth Sessions", "Learning as a cohort."],
    ["2× monthly Hope Seat", "Bring a real challenge; the community works it live."],
    ["A standalone private community", "Off Facebook, away from prying eyes — coaches and cohort members who get it."],
  ];
  return (
    <section className="bg-watercolor-soft py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>What&apos;s inside the program</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight text-balance md:text-4xl">
          A cockpit to run your business — and a room to be held while you do.
        </h2>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 px-6 md:grid-cols-2">
        <div className="rounded-3xl bg-white/70 p-8 shadow-card">
          <h3 className="font-serif text-xl font-semibold text-indigo">The command center</h3>
          <p className="mt-1 text-sm text-indigo/60">What you&apos;ll run your business from.</p>
          <ul className="mt-5 grid gap-2.5 text-indigo/80">
            {suite.map((s) => (
              <li key={s} className="flex gap-3">
                <Compass className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-white/70 p-8 shadow-card">
          <h3 className="font-serif text-xl font-semibold text-indigo">The coaching community</h3>
          <p className="mt-1 text-sm text-indigo/60">The room you get held in — every tier.</p>
          <ul className="mt-5 space-y-4">
            {community.map(([t, b]) => (
              <li key={t}>
                <p className="font-semibold text-indigo">{t}</p>
                <p className="text-sm text-indigo/70">{b}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function WhoFor() {
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>Who it&apos;s for</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">
          One ecosystem. Multiple doorways.
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-indigo/80">
          LifeCharter is for <strong>coaches of every kind — business, life, mindset, branding — and
          the service-based founders and solopreneurs who sell their expertise.</strong> The branding
          studio you see here is one doorway, not the whole house. We don&apos;t gate by niche or
          revenue band; we meet you where you are.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-indigo/80">
          The one real qualifier is <strong>readiness</strong> — you&apos;re done white-knuckling it,
          and you&apos;re ready to invest in building something aligned and lasting.
        </p>
      </div>
    </section>
  );
}

function ClarityShowcase() {
  return (
    <section className="bg-watercolor-soft py-16">
      <ShowcaseImage
        src={IMG.clarity}
        alt="Lead with clarity. Build with purpose. — the all-in-one command center to align your life, grow your business, and create lasting impact."
      />
    </section>
  );
}

function Investment() {
  return (
    <section className="bg-watercolor-deep py-24 text-ivory">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>The investment</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight text-balance md:text-4xl">
          An investment in alignment — not another subscription.
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-ivory/80">
          LifeCharter is a premium, architect-led program. Every client gets the coaching{" "}
          <em>and</em> the full command center, together — it starts with an implementation phase
          where we architect your alignment and set up your cockpit, then continues as ongoing coaching
          and Suite access. Cancel anytime after the first year, and pay in full for a meaningful
          discount.
        </p>
        <p className="mt-8 font-serif text-2xl font-medium text-gold text-balance">
          Programs begin at a $2,497 implementation fee plus monthly, with pay-in-full options.
        </p>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ivory/75">
          Which level fits you depends on how much hands-on help you want — from self-driven in the
          cohort, to a monthly hand on the wheel, to having it architected right alongside you.
          That&apos;s a conversation, not a checkout — we&apos;ll find the right fit together on your
          alignment call.
        </p>
        <div className="mt-10">
          <PrimaryCTA href="#call">Book your alignment call →</PrimaryCTA>
        </div>
      </div>
    </section>
  );
}

function WaysToStart() {
  const doors = [
    ["Free alignment assessment", "Take it in minutes and see your first live score.", "Take the assessment", "#assessment"],
    ["Free 21-Day Challenge", "A daily taste of what it feels like to run aligned.", "Join the challenge", "#challenge"],
    ["Free MasterClass", "See the full method and the command center, live.", "Save my seat", "#masterclass"],
  ] as const;
  return (
    <section id="start" className="bg-ivory py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>Ways to start</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">
          Not ready for a call? Start with a doorway.
        </h2>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 px-6 md:grid-cols-3">
        {doors.map(([title, body, cta, href]) => (
          <div key={title} className="card-hover flex flex-col rounded-3xl border border-indigo/10 bg-white/70 p-8 shadow-card">
            <Compass className="h-9 w-9 text-gold" />
            <h3 className="mt-5 font-serif text-xl font-semibold text-indigo">{title}</h3>
            <p className="mt-2 flex-1 text-indigo/75">{body}</p>
            <a href={href} className="mt-6 font-semibold text-teal hover:text-plum">
              {cta} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

function Architect() {
  return (
    <section className="bg-watercolor-soft py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>Meet your Alignment Architect</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">
          You don&apos;t need another guru. You need an architect.
        </h2>
        <div className="mx-auto mt-8 flex h-28 w-28 items-center justify-center rounded-full border border-gold/40 bg-white/60">
          <Butterfly className="h-14 w-16 text-gold" />
        </div>
        <p className="mt-8 text-lg leading-relaxed text-indigo/70">
          [Your bio goes here — a few grounded lines on who you are, why you built LifeCharter, and the
          Truth-over-fear conviction behind it. Warm, credible, a little spiritual.]
        </p>
      </div>
    </section>
  );
}

function FinalCall() {
  return (
    <section id="call" className="bg-indigo-deep relative overflow-hidden py-28 text-ivory">
      <Compass className="pointer-events-none absolute -left-10 top-8 h-64 w-64 text-lavender/10" />
      <Butterfly className="pointer-events-none absolute -right-8 bottom-4 h-56 w-56 animate-floaty text-gold/15" />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-serif text-4xl font-semibold leading-tight text-balance md:text-5xl">
          Your business can stop running on fear.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ivory/80">
          Come find your alignment — and get the command center to live it, on purpose, every day.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryCTA href="#call">Book your alignment call →</PrimaryCTA>
          <GhostCTA href="#assessment" light>
            Or take the free assessment first
          </GhostCTA>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-indigo-deep border-t border-ivory/10 py-10 text-ivory/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm sm:flex-row">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-gold" />
          <span className="font-serif text-base text-ivory">LifeCharter</span>
        </div>
        <p>One ecosystem. Multiple doorways. A life, mission, and business built from Truth rather than fear.</p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Page() {
  return (
    <main>
      <Hero />
      <TransformationStatement />
      <Tension />
      <Divider />
      <WhatItIs />
      <Proof />
      <BeforeAfter />
      <BrandBand />
      <Inside />
      <WhoFor />
      <ClarityShowcase />
      <Investment />
      <WaysToStart />
      <Architect />
      <FinalCall />
      <Footer />
    </main>
  );
}
