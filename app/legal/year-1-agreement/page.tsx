import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Year-1 Commitment Acknowledgment — LifeCharter Command Suite",
  description: "What you're agreeing to when you start your first year with LifeCharter Command Suite.",
};

export default function Year1AgreementPage() {
  return (
    <main className="bg-ivory min-h-screen">
      <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
        <a href="/" className="text-sm font-semibold text-teal hover:text-plum">
          ← Back to LifeCharter
        </a>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          LifeCharter Command Suite
        </p>
        <h1 className="mt-2 font-serif text-3xl sm:text-4xl font-semibold text-indigo">
          Year-1 Commitment Acknowledgment
        </h1>
        <p className="mt-3 text-sm text-indigo/60">Effective Date: October 1, 2026</p>

        <p className="mt-8 text-indigo/80 leading-relaxed">
          Before you get started with LifeCharter Command Suite, please read and acknowledge the following. This is
          a short summary of Section 4 of our full{" "}
          <a href="/legal/terms-of-sale" className="font-semibold text-teal hover:text-plum">
            Terms of Sale &amp; Service Agreement
          </a>{" "}
          — both apply to your purchase, and if anything here and the full Terms of Sale ever conflict, the full
          Terms of Sale governs.
        </p>

        <ul className="mt-8 space-y-4 text-indigo/80 leading-relaxed">
          <li className="flex gap-3">
            <span className="mt-1 text-gold">●</span>
            <span>Your Implementation Fee is charged today and covers your onboarding and setup.</span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 text-gold">●</span>
            <span>
              Your Monthly Fee begins about 30 days after your Implementation Fee, once your implementation is
              complete.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 text-gold">●</span>
            <span>
              Once your Monthly Fee begins, you&apos;re committing to 12 consecutive months of billing at your
              tier&apos;s rate — your &ldquo;Year-1 Term.&rdquo;
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 text-gold">●</span>
            <span>
              If you cancel before your Year-1 Term is complete, you&apos;ll pay an early-termination fee equal to
              whichever is greater: $500, or 50% of the remaining months&apos; fees owed for the rest of your Year-1
              Term.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="mt-1 text-gold">●</span>
            <span>
              After your Year-1 Term, your plan continues month-to-month until either of us ends it in writing with
              45 days&apos; advance notice.
            </span>
          </li>
        </ul>

        <div className="mt-12 rounded-2xl border border-gold/40 bg-white/70 p-6 shadow-card">
          <label className="flex items-start gap-3 text-indigo font-medium">
            <input type="checkbox" className="mt-1" disabled />
            I have read and agree to this Year-1 Commitment.
          </label>
        </div>

        <p className="mt-10 text-sm text-indigo/50">
          Questions? Reach us at amilynne@amilynnecarroll.com.
        </p>
      </div>
    </main>
  );
}
