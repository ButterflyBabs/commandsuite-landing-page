# LifeCharter — Command Suite Landing Page

The landing page for **LifeCharter Architecture** — an architect-led alignment program with a working command center.

Built with **Next.js (App Router)** + **Tailwind CSS**, deployed on **Vercel** — matching the LifeCharter ecosystem stack.

## Positioning (do not drift)

This is **not** SaaS. Never describe it as an "app," "tool," "platform," or "software with coaching." Lead with alignment and the coaching relationship; the Command Suite is where it gets implemented. Anchor words: *alignment, Truth, mission, legacy, command center / cockpit, Alignment Architect, hard-won harmony, on purpose.* (Never use "soft landing" — it's retired; always say "hard-won harmony.")

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

- `app/layout.tsx` — fonts (Fraunces serif + Inter), metadata.
- `app/page.tsx` — the full one-page landing site (11 sections + nav/footer).
- `app/globals.css` — brand watercolor gradients + filigree.
- `tailwind.config.ts` — brand palette (Deep Indigo, Royal Plum, Sacred Teal, Warm Gold, Soft Lavender, Ivory).

## Placeholders to fill in

- `/demo` — link to the live Brand Alchemy Studio demo.
- `#assessment`, `#challenge`, `#masterclass`, `#call` — swap the anchor links for the real assessment, challenge, MasterClass, and alignment-call booking URLs.
- The **Alignment Architect** bio in the `Architect` section.
- Replace the CSS watercolor gradients with the real illustrated brand backgrounds when ready.

## Pricing display

Currently follows the "qualify publicly, quote on the call" decision — an honest floor ("Programs begin at a $2,497 implementation fee plus monthly") with tier fit routed to the alignment call. Swap in the full three-tier table if you decide to go fully transparent.
