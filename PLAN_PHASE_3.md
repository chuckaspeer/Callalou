# Phase 3 — Conversion Without Sales Energy
Scope: Lead magnet + contact form upgrades + analytics events.
Objective: Higher-signal inquiries, calmer UX, and basic instrumentation.

## Repo Reality (confirmed)
- Contact page: src/app/(public)/contact/page.tsx
  Current: WhatHappensNext (timeline already exists) + ContactForm
  Gaps: missing “What are you optimizing for?” field; form title is non-compliant.
- No lead magnet currently on site.

---

## 1) Tighten “What happens next” timeline (if needed)
File: src/components/contact/WhatHappensNext.tsx

Ensure it matches exactly:
- Review (24–48 hours)
- Short call (fit + objectives)
- If appropriate: private materials

Tone: calm, no urgency.

Acceptance:
- Timeline reads like private banking intake, not sales.

---

## 2) Update Contact form title + language (compliance)
File: src/components/contact/ContactForm.tsx

Change heading/title:
- "Connect About Investment Opportunities" → "Request private introduction"
Remove/replace any “opportunities” wording in visible copy.

Acceptance:
- Contact page avoids “invest/offering/returns/opportunities”.

---

## 3) Add “What are you optimizing for?” field (multi-select)
File: src/components/contact/ContactForm.tsx

Add multi-select options:
- Preservation
- Tax efficiency
- Cash flow
- Compounding
- Learning

Implementation notes:
- Store as array in form state.
- Include in submission payload/email message (whatever current handling is).
- Keep UI compact (checkbox group is fine).

Acceptance:
- Field is optional but visible.
- Captured in submission.

---

## 4) Add Lead Magnet (new page/section)
Create route:
- src/app/(public)/resources/downside-checklist/page.tsx (recommended)

Content:
Title: "The 5-Minute Downside Checklist"
Bullets:
- “The 7 risks I check first”
- “The 3 assumptions that kill deals”
- “A simple pass/fail screen you can reuse”

Microcopy near form:
- “We do not share your information. Communications are informational.”

Form (MVP):
- email input
- submit button
Submission behavior:
- either sends to same contact handler OR logs to an endpoint you already have
- confirmation message on success

Acceptance:
- Page exists, clean, calm, institutional.
- No “returns” language.

---

## 5) Instrumentation (minimum viable events)
Create helper: src/lib/analytics.ts
Function: trackEvent(name: string, props?: Record<string, any>)

Events to fire:
- Click: Explore Insights (hero CTA + any other prominent entry)
- Click: Request Private Introduction (header CTA + hero CTA)
- Submit: Lead magnet
- Submit: Connect form
- Click-outs per platform lane (LinkedIn/YouTube/Instagram/Facebook) on Media page

If no provider exists:
- implement trackEvent as a no-op plus console.log in dev
- leave TODO to wire provider later (Plausible/Vercel/GTM)

Acceptance:
- Events fire from the relevant UI actions without duplication.

---

## Exit Criteria Checklist
- [ ] Contact title compliant
- [ ] Optimization field exists and submits
- [ ] Lead magnet page exists with form + microcopy
- [ ] Analytics helper exists and events are wired
