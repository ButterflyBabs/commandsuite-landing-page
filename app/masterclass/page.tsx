import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Countdown, RegisterForm } from "./MasterclassClient";

/* ================================================================== */
/*  SEO                                                                */
/* ================================================================== */

const SITE = "https://commandsuite-landing-page.vercel.app";

export const metadata: Metadata = {
  title: "From Hustle to Command — Free Live MasterClass | LifeCharter",
  description:
    "A free 90-minute live training with the Alignment Architect. You don't have a hustle problem — you have an alignment problem. See the whole method that takes you from a scattered hustle to hard-won harmony, and build your first command move live. Thursday, August 20, 2026 at 5:00 PM Mountain.",
  keywords: [
    "From Hustle to Command",
    "MasterClass",
    "alignment",
    "command center",
    "Command Suite",
    "LifeCharter",
    "executive coaching",
    "coaches",
    "founders",
    "solopreneurs",
    "hustle to harmony",
    "Alignment Architect",
  ],
  alternates: { canonical: `${SITE}/masterclass` },
  openGraph: {
    title: "From Hustle to Command — Free Live MasterClass",
    description:
      "90 minutes, live. See the full method — from a scattered hustle to hard-won harmony — and build your first command move in the room. Thursday, August 20, 2026 · 5:00 PM Mountain.",
    type: "website",
    url: `${SITE}/masterclass`,
  },
};

export const viewport: Viewport = {
  themeColor: "#1F315B",
};

/* ================================================================== */
/*  Session details                                                    */
/* ================================================================== */

const SESSION = {
  dateLong: "Thursday, August 20, 2026",
  time: "5:00 PM Mountain Time",
  duration: "90 minutes",
  isoStart: "2026-08-20T17:00:00-06:00",
  isoEnd: "2026-08-20T18:30:00-06:00",
};

const CHALLENGE_URL = "https://command-shift-landing.vercel.app/";
const CONSULT_URL = "https://app.globalcontrol.io/appointment-booking/executive-consultation-lccs";

/* ================================================================== */
/*  Brand marks                                                        */
/* ================================================================== */

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

/* ================================================================== */
/*  Small building blocks                                              */
/* ================================================================== */

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={`mb-5 text-xs font-semibold uppercase tracking-[0.28em] ${light ? "text-gold" : "text-gold"}`}>
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

function GhostCTA({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full border px-8 py-4 text-sm font-semibold tracking-wide transition focus:outline-none focus:ring-2 focus:ring-gold/50 ${
        light ? "border-ivory/40 text-ivory hover:bg-ivory/10" : "border-indigo/25 text-indigo hover:bg-indigo/5"
      }`}
    >
      {children}
    </a>
  );
}

function Divider() {
  return (
    <div className="mx-auto flex max-w-4xl items-center justify-center px-6 py-2">
      <div className="filigree-divider w-full" />
      <Compass className="mx-4 h-6 w-6 shrink-0 text-gold" />
      <div className="filigree-divider w-full" />
    </div>
  );
}

/* ================================================================== */
/*  Navigation                                                         */
/* ================================================================== */

function Nav() {
  return (
    <header className="sticky top-0 z-30 border-b border-ivory/10 bg-indigo-deep/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="flex items-center gap-2 text-ivory">
          <Compass className="h-6 w-6 text-gold" />
          <span className="font-serif text-lg font-semibold tracking-wide">LifeCharter</span>
        </a>
        <div className="hidden items-center gap-8 text-sm font-medium text-ivory/80 md:flex">
          <a href="#method" className="hover:text-ivory">The method</a>
          <a href="#build" className="hover:text-ivory">What you&apos;ll build</a>
          <a href="#faq" className="hover:text-ivory">FAQ</a>
        </div>
        <a
          href="#register"
          className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-indigo-deep hover:bg-gold-soft"
        >
          Save my seat
        </a>
      </nav>
    </header>
  );
}

/* ================================================================== */
/*  Hero                                                               */
/* ================================================================== */

function Hero() {
  return (
    <section id="top" className="bg-watercolor-deep relative overflow-hidden text-ivory">
      <Nav />
      <Butterfly className="pointer-events-none absolute -right-12 top-24 h-64 w-64 animate-floaty text-gold/15" />
      <Compass className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 text-lavender/10" />
      <div className="relative mx-auto max-w-4xl px-6 py-20 text-center animate-fadeUp sm:py-24">
        <Eyebrow light>Free Live MasterClass · {SESSION.duration}</Eyebrow>
        <h1 className="font-serif text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl md:text-6xl">
          From Hustle to Command
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-serif text-xl font-medium italic text-gold-soft text-balance sm:text-2xl">
          You don&apos;t have a hustle problem — you have an alignment problem.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ivory/80">
          In 90 minutes, see the whole method that takes you from white-knuckling a scattered hustle to{" "}
          <strong className="font-semibold text-ivory">hard-won harmony</strong> — one command center where your
          mission, brand, and business finally point the same direction, on purpose. And you won&apos;t just watch:
          you&apos;ll build your first command move live, in the room.
        </p>

        {/* When */}
        <div className="mx-auto mt-10 flex max-w-md flex-col items-center gap-1 rounded-2xl border border-ivory/15 bg-ivory/5 px-6 py-5">
          <p className="font-serif text-xl font-semibold text-ivory">{SESSION.dateLong}</p>
          <p className="text-ivory/75">
            {SESSION.time} · Live, online
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-8">
          <Countdown />
        </div>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <PrimaryCTA href="#register">Save my seat →</PrimaryCTA>
          <GhostCTA href="#method" light>
            See what we&apos;ll cover
          </GhostCTA>
        </div>
        <p className="mt-5 text-sm text-ivory/55">
          Taught live by your Alignment Architect. Free to attend — a replay goes to everyone who registers.
        </p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  The reframe — Hustle vs Command                                    */
/* ================================================================== */

function Reframe() {
  const hustle = [
    "Motion driven by fear — always busy, never settled",
    "Accumulating tools, tabs, and half-built offers",
    "Chasing more; copying what's working for everyone else",
    "The whole business held in one overloaded mind",
  ];
  const command = [
    "Leadership driven by Truth — you see the whole business",
    "Choosing the next move on purpose, not on reflex",
    "Subtracting what doesn't serve; systematizing what does",
    "Everything run from one command center, one leader",
  ];
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>The one reframe everything hangs on</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight text-balance md:text-4xl">
          Most founders aren&apos;t failing for lack of effort. They&apos;re working harder than ever.
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-indigo/80">
          <p>
            You stall or burn out because the business grew <em>reactively</em> — tools bolted on, offers piled up,
            yeses given from fear — until it fractured across a dozen tabs and one tired mind. The fix isn&apos;t more
            hustle. It&apos;s <strong className="text-indigo">alignment</strong>: getting mission, brand, and business
            pointing the same way, run from one command center, on purpose.
          </p>
          <p className="font-serif text-2xl font-medium text-plum text-balance">
            &ldquo;Hustle reacts. Command decides.&rdquo;
          </p>
        </div>
      </div>

      <div className="mx-auto mt-14 grid max-w-4xl gap-6 px-6 md:grid-cols-2">
        <div className="rounded-3xl border border-indigo/10 bg-white/50 p-8">
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-indigo/40">Hustle</h3>
          <ul className="space-y-3 text-indigo/60">
            {hustle.map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-1 text-indigo/25">—</span>
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden rounded-3xl border border-gold/40 bg-plum/5 p-8 shadow-card">
          <Butterfly className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 text-gold/15" />
          <h3 className="mb-5 text-sm font-semibold uppercase tracking-widest text-teal">Command</h3>
          <ul className="space-y-3 text-indigo">
            {command.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-1 text-gold">✦</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-2xl px-6 text-center text-indigo/70">
        The shift isn&apos;t <em>do more</em>. It&apos;s <strong className="text-indigo">align</strong> — and step into
        the leader&apos;s seat instead of staying the business&apos;s hardest worker.
      </p>
    </section>
  );
}

/* ================================================================== */
/*  The method — the three-phase arc                                   */
/* ================================================================== */

function Method() {
  const phases = [
    {
      n: "Phase 1",
      title: "Truth & Clarity",
      tag: "See it honestly",
      body: "Get radically honest about where the business stands and why it exists.",
    },
    {
      n: "Phase 2",
      title: "Build the Engine",
      tag: "Turn clarity into structure",
      body: "Encode that Truth into offer, revenue, systems, voice, position, and a daily rhythm.",
    },
    {
      n: "Phase 3",
      title: "Live in Command",
      tag: "Consolidate, lead, make it permanent",
      body: "Bring it into one command center and one leader — built to last.",
    },
  ];
  return (
    <section id="method" className="bg-watercolor-soft py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>What we&apos;ll cover</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight text-balance md:text-4xl">
          The whole method, in one sitting.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-indigo/80">
          You&apos;ll get a fly-over of all 21 aligned moves that make the shift — organized into three phases — and
          then we&apos;ll go deep on the ones that change everything, and actually <em>do</em> them together.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 px-6 md:grid-cols-3">
        {phases.map((p) => (
          <div key={p.n} className="card-hover flex flex-col rounded-3xl bg-white/70 p-8 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">{p.n}</p>
            <h3 className="mt-3 font-serif text-2xl font-semibold text-indigo">{p.title}</h3>
            <p className="mt-1 text-sm font-medium italic text-plum">{p.tag}</p>
            <p className="mt-4 leading-relaxed text-indigo/75">{p.body}</p>
          </div>
        ))}
      </div>
      <p className="mx-auto mt-10 max-w-2xl px-6 text-center font-serif text-xl text-plum text-balance">
        Insight that isn&apos;t consolidated decays. You&apos;ll leave with an operating system — and a leader who runs
        the business on purpose.
      </p>
    </section>
  );
}

/* ================================================================== */
/*  Build it live — the deep dives                                     */
/* ================================================================== */

function BuildLive() {
  const builds = [
    {
      k: "01",
      title: "The Command Audit",
      teaching: "You can't command what you refuse to look at.",
      body: "Rate every area of your business 1–5 and instantly see the map. Your two lowest areas become your personal starting point — clear, honest, right there on the screen.",
    },
    {
      k: "02",
      title: "Your True North",
      teaching: "Clarity isn't knowing everything — it's knowing what matters most.",
      body: "Name a single heading for this season in one sentence. The audit reveals the gaps; True North makes every decision after it simpler.",
    },
    {
      k: "03",
      title: "The Command Center",
      teaching: "You can't lead what you can't see in one place.",
      body: "Consolidate mission, True North, priorities, and numbers into one view — the culminating artifact, and exactly what running your business daily inside the Command Suite looks like.",
    },
  ];
  return (
    <section id="build" className="bg-indigo-deep py-24 text-ivory">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow light>You&apos;ll build, not just watch</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight text-balance md:text-4xl">
          Three things you&apos;ll walk out having actually made.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ivory/80">
          This is a MasterClass, not a lecture. For each deep-dive we follow the same rhythm you&apos;d meet inside the
          challenge: a teaching, an honest question, and one aligned action you do live.
        </p>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-6 px-6 md:grid-cols-3">
        {builds.map((b) => (
          <div key={b.k} className="flex flex-col rounded-3xl border border-ivory/15 bg-ivory/5 p-8">
            <span className="font-serif text-3xl font-semibold text-gold/70">{b.k}</span>
            <h3 className="mt-4 font-serif text-xl font-semibold text-ivory">{b.title}</h3>
            <p className="mt-3 text-sm font-medium italic text-gold-soft">&ldquo;{b.teaching}&rdquo;</p>
            <p className="mt-4 leading-relaxed text-ivory/75">{b.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Who it's for                                                       */
/* ================================================================== */

function WhoFor() {
  const takeaways = [
    "A completed Command Audit — your real map",
    "A named True North for this season",
    "The shape of your one command center",
    "The full 21-move method, start to finish",
    "The same language and tools as the challenge",
    "A next step that finally feels on purpose",
  ];
  return (
    <section className="bg-watercolor-soft py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>Who it&apos;s for</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight text-balance md:text-4xl">
          For the founder who&apos;s successful on paper — and scattered in practice.
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-indigo/80">
          This MasterClass is for <strong>founders, coaches, and solopreneurs</strong> who are done white-knuckling
          it and want <strong>clearer over busier</strong>. Whether you&apos;ve never heard of the method or
          you&apos;ve already walked the 21 days, you&apos;ll leave seeing the whole picture — and holding real pieces
          of it.
        </p>
      </div>
      <div className="mx-auto mt-12 max-w-3xl px-6">
        <p className="mb-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-teal">
          What you&apos;ll walk away with
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {takeaways.map((t) => (
            <div key={t} className="flex items-start gap-3 rounded-2xl border border-indigo/10 bg-white/70 px-5 py-4 text-indigo/80 shadow-card">
              <Compass className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Architect                                                          */
/* ================================================================== */

function Architect() {
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Eyebrow>Your host</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">
          Taught live by your Alignment Architect.
        </h2>
        <div className="mx-auto mt-8 flex h-28 w-28 items-center justify-center rounded-full border border-gold/40 bg-white/60">
          <Butterfly className="h-14 w-16 text-gold" />
        </div>
        <p className="mt-8 text-lg leading-relaxed text-indigo/70">
          [Your bio goes here — a few grounded lines on who you are, why you built LifeCharter, and the
          Truth-over-fear conviction behind the shift from hustle to command. Warm, credible, a little spiritual.]
        </p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Register                                                           */
/* ================================================================== */

function Register() {
  return (
    <section id="register" className="bg-watercolor-deep relative overflow-hidden py-24 text-ivory">
      <Compass className="pointer-events-none absolute -left-16 top-10 h-72 w-72 text-lavender/10" />
      <Butterfly className="pointer-events-none absolute -right-10 bottom-6 h-56 w-56 animate-floaty text-gold/15" />
      <div className="relative mx-auto max-w-2xl px-6 text-center">
        <Eyebrow light>Save your seat</Eyebrow>
        <h2 className="font-serif text-3xl font-semibold leading-tight text-balance md:text-4xl">
          Come see the whole shift — and start building it live.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ivory/80">
          {SESSION.dateLong} · {SESSION.time} · Live &amp; online. Free to attend, with a replay for everyone who
          registers.
        </p>
        <div className="mx-auto mt-10 max-w-lg text-left">
          <RegisterForm />
        </div>
        <p className="mx-auto mt-10 max-w-md text-sm text-ivory/60">
          Not ready for the live room?{" "}
          <a href={CHALLENGE_URL} className="font-semibold text-gold-soft underline-offset-2 hover:underline">
            Start the free 21-Day Challenge
          </a>{" "}
          — or{" "}
          <a href={CONSULT_URL} className="font-semibold text-gold-soft underline-offset-2 hover:underline">
            book an Executive Consultation
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  FAQ                                                                */
/* ================================================================== */

const FAQS: { q: string; a: string }[] = [
  {
    q: "How long is the MasterClass?",
    a: "About 90 minutes, taught live. We move through the full method, then go deep and build together — with time to actually do the work in the room.",
  },
  {
    q: "Is it really free?",
    a: "Yes. From Hustle to Command is free to attend. Register with your name and email and we'll send the join link and a reminder before we go live.",
  },
  {
    q: "What if I can't make it live?",
    a: "Register anyway. Everyone who signs up gets the replay, so you can watch when it works for you — though the live room is where you build alongside everyone else.",
  },
  {
    q: "Do I need to have done the 21-Day Challenge first?",
    a: "Not at all. If you're brand new, this is your first real taste of the method. If you've walked the 21 days, it's the synthesis that ties them together and shows the bigger picture.",
  },
  {
    q: "What will I actually leave with?",
    a: "Real artifacts — a completed Command Audit, a named True North, and the shape of your one command center — plus the full method and a clear next step.",
  },
];

function FAQ() {
  return (
    <section id="faq" className="bg-ivory py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <Eyebrow>Before you register</Eyebrow>
          <h2 className="font-serif text-3xl font-semibold leading-tight md:text-4xl">Questions, answered.</h2>
        </div>
        <div className="mt-12 divide-y divide-indigo/10 overflow-hidden rounded-3xl border border-indigo/10 bg-white/60">
          {FAQS.map((f) => (
            <details key={f.q} className="group px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-lg font-semibold text-indigo">
                {f.q}
                <span className="ml-4 text-gold transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-indigo/75">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/*  Close + footer                                                     */
/* ================================================================== */

function Close() {
  return (
    <section className="bg-indigo-deep py-20 text-center text-ivory">
      <div className="mx-auto max-w-2xl px-6">
        <Compass className="mx-auto h-10 w-10 text-gold" />
        <p className="mt-6 font-serif text-2xl font-semibold text-balance md:text-3xl">
          Command is not a moment. It&apos;s a habit.
        </p>
        <div className="mt-8">
          <PrimaryCTA href="#register">Save my seat →</PrimaryCTA>
        </div>
        <p className="mt-8 font-serif text-lg text-gold-soft">Head Up — Wings Out. 🦋</p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-indigo-deep border-t border-ivory/10 py-10 text-ivory/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 text-sm sm:flex-row">
        <a href="/" className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-gold" />
          <span className="font-serif text-base text-ivory">LifeCharter</span>
        </a>
        <p>One ecosystem. Multiple doorways. A life, mission, and business built from Truth rather than fear.</p>
      </div>
    </footer>
  );
}

/* ================================================================== */
/*  Structured data (Event + FAQ)                                      */
/* ================================================================== */

function StructuredData() {
  const eventLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "From Hustle to Command — Free MasterClass",
    description:
      "A free 90-minute live training: see the whole method that takes you from a scattered hustle to hard-won harmony, and build your first command move live.",
    startDate: SESSION.isoStart,
    endDate: SESSION.isoEnd,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: `${SITE}/masterclass`,
    },
    image: [`${SITE}/hero.png`],
    organizer: {
      "@type": "Organization",
      name: "LifeCharter",
      url: SITE,
    },
    performer: {
      "@type": "Person",
      name: "The Alignment Architect",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${SITE}/masterclass`,
      validFrom: "2026-08-01T00:00:00-06:00",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
    </>
  );
}

/* ================================================================== */
/*  Page                                                               */
/* ================================================================== */

export default function MasterclassPage() {
  return (
    <main>
      <StructuredData />
      <Hero />
      <Reframe />
      <Divider />
      <Method />
      <BuildLive />
      <WhoFor />
      <Architect />
      <Register />
      <FAQ />
      <Close />
      <Footer />
    </main>
  );
}
