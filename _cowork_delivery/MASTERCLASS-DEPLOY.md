# From Hustle to Command — MasterClass registration page

A new `/masterclass` route for the **commandsuite-landing-page** site. Live session:
**Thursday, August 20, 2026 · 5:00 PM Mountain**, wired to your Global Control
`lccs-masterclass` tag through the existing `/api/register` route.

Live URL once deployed: **https://commandsuite-landing-page.vercel.app/masterclass**

---

## 1. Add the two new files

Both go in a **new folder** `app/masterclass/` inside your repo
(`~/Downloads/commandsuite-landing-page`):

```
app/masterclass/page.tsx              ← the page (server component + SEO + JSON-LD)
app/masterclass/MasterclassClient.tsx ← countdown + registration form (client)
```

Just unzip `masterclass-page.zip` into the repo root and the folder lands in the right place.

## 2. Two one-line link swaps (connect the funnel)

These point your existing pages at the new registration page. Both are tiny:

**`app/page.tsx`** — the "Ways to start" cards, change the MasterClass href:
```diff
- ["Free MasterClass", "See the full method and the Command Suite, live.", "Save my seat", "#masterclass"],
+ ["Free MasterClass", "See the full method and the Command Suite, live.", "Save my seat", "/masterclass"],
```

**`app/assessment/page.tsx`** — the `LINKS` block:
```diff
- masterclass: "#", // "From Hustle to Command" MasterClass registration
+ masterclass: "/masterclass", // "From Hustle to Command" MasterClass registration
```

(Both edits are already applied in the copies inside `updated-source/` in the zip, if you'd
rather drop those in.)

## 3. Push + deploy

```bash
cd ~/Downloads/commandsuite-landing-page
git add app/masterclass app/page.tsx app/assessment/page.tsx
git commit -m "Add /masterclass registration page (From Hustle to Command, Aug 20)"
git push
```

Auto-deploy on this project has been flaky, so after the push **fire the Vercel
"deploy-latest" Deploy Hook** to publish (same as you've been doing).

## 4. Global Control — so registrations actually go somewhere

The page posts to `/api/register` with `tag: "masterclass"`, which fires the
`lccs-masterclass` tag. The route is **safe by default** — if the tag isn't configured yet,
the form still confirms the seat to the visitor, you just won't capture the lead until this
is set. To make it live:

1. In Global Control, create/confirm a tag **`lccs-masterclass`** and note its ID.
2. On the **commandsuite-landing-page** Vercel project → Settings → Environment Variables, set:
   - `GLOBAL_CONTROL_API_KEY` — your GC API key (likely already set for the assessment)
   - `GC_MASTERCLASS_TAG_ID` — the tag ID from step 1
3. Redeploy so the env vars take effect.
4. Build a Global Control workflow triggered by `lccs-masterclass` that sends the
   confirmation + join link, and a reminder before **Aug 20, 5 PM MT**. (Mariposa can set
   this up the same way as the challenge workflow.)

## 5. Before you go live — quick checklist

- [ ] Replace the **Alignment Architect bio** placeholder (in `page.tsx`, the `Architect`
      section) with your real bio.
- [ ] Confirm the **webinar/join link** you'll send from Global Control (Zoom, etc.).
- [ ] Set `GC_MASTERCLASS_TAG_ID` + create the tag + build the reminder workflow.
- [ ] Test: open `/masterclass`, submit the form, confirm the contact + tag land in GC.

## Changing the date later

Everything about the session lives in two spots:

- **`MasterclassClient.tsx`** → the `SESSION_UTC_MS` line (the countdown target, in UTC).
- **`page.tsx`** → the `SESSION` object (`dateLong`, `time`, `isoStart`, `isoEnd`) used in
  the copy and the Event structured data.

Update both and the whole page — hero, countdown, and Google's event listing — follows.

---

*Voice check: the page uses your exact anchor language — "You don't have a hustle problem,
you have an alignment problem," "Hustle reacts. Command decides.," "hard-won harmony" (never
"soft landing"), "Command Suite" (never app/tool/platform), and closes on "Head Up — Wings
Out."*
