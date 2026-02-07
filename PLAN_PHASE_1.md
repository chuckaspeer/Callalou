# Phase 1 — Home Page: “This Is a System”
Scope: Home + global header CTA only. No Media/Insights refactors. No backend.
Objective: In 8 seconds, signal institutional behavior: standards + proof + principles + founder note + compliant CTAs.

## Repo Reality (confirmed)
- Home: src/app/(public)/page.tsx
  Current order: Hero → PortfolioOverview → HomeWhyHomeMatters → HowItWorks → HomeEmilIntro → HomeNewsletter
  Missing: Underwriting Standard, Proof-of-Seriousness, Principles strip, Founder Note.
- Hero: src/components/home/HomeHero.tsx
  Current: headline + subheadline + stats + CTAs (non-compliant language).
- Header: src/components/layout/SiteHeader.tsx
  Current CTA “Invest With Us” (must change).

---

## 1) Upgrade Hero (HomeHero.tsx)
File: src/components/home/HomeHero.tsx

### Add third line under subheadline
Insert after existing subheadline paragraph:
- "Underwriting standards + transparency trail published weekly."

### Add micro-proof row under CTAs
Below CTA buttons, add a quiet, non-clickable line:
- "Standards • Stress Tests • Stewardship Notes"

Style requirements:
- visually muted (small text, low contrast)
- not clickable, no icons (or extremely subtle)
- should read like internal labeling

### Fix Hero CTAs (hero only)
Replace hero CTAs to be compliant:
- Primary: "Explore thinking" → link to /media
- Secondary: "Request private introduction" → link to /contact
Optional: remove/replace any “portfolio/opportunities” CTA language if it implies offering.

Acceptance:
- Hero reads like a system description.
- No “invest/offering/returns/opportunities” language in hero CTA labels.

---

## 2) Add Founder Note (new component)
File: src/components/home/FounderNote.tsx (new)

Create a short block (4–6 sentences). Rules:
- no origin story
- no credentials flex
- emphasize judgment, temperament, long horizon, responsibility

Tone: calm, disciplined, policy-adjacent.

---

## 3) Add “Our Underwriting Standard” + Proof-of-Seriousness (new components)
Create:
- src/components/home/UnderwritingStandard.tsx (new)
- src/components/home/ProofOfSeriousness.tsx (new)

### UnderwritingStandard.tsx
Section title: "Our Underwriting Standard"
One short paragraph stating:
- standards are explicit
- transparency trail is published weekly
- no deals/returns mentioned

### ProofOfSeriousness.tsx
3 small, quiet cards directly under the standard:

Card 1: Reporting cadence
- "Clear reporting expectations designed for calm periods and difficult ones."

Card 2: Downside-first
- "Stress tests prioritize leverage, operating assumptions, and liquidity before upside."

Card 3: Alignment
- "Structures favor stewardship and durability over speed."

Rules:
- no deals, no examples, no performance language
- visually quiet, compact cards

Acceptance:
- Reads like a policy memo excerpt.
- Sits directly below "Our Underwriting Standard".

---

## 4) Add Principles Strip (new component)
File: src/components/home/PrinciplesStrip.tsx (new)

Placement target: near bottom of Home (after HomeEmilIntro, before HomeNewsletter).

Principles (5):
- Stewardship
- Patience
- Transparency
- Margin of Safety
- Alignment

Format:
- minimal icon (optional), 1 short line per principle
- screenshot-able and standalone

Acceptance:
- Makes sense without context.
- Doesn’t feel like marketing.

---

## 5) Wire into Home page (page.tsx)
File: src/app/(public)/page.tsx

Recommended new order:
1) HomeHero
2) FounderNote
3) UnderwritingStandard
4) ProofOfSeriousness
5) PortfolioOverview
6) HomeWhyHomeMatters
7) HowItWorks
8) HomeEmilIntro
9) PrinciplesStrip
10) HomeNewsletter

Acceptance:
- Founder Note and Underwriting/Proof appear above the first “content” sections.
- Principles appear near bottom.

---

## 6) Update global header CTA (SiteHeader.tsx)
File: src/components/layout/SiteHeader.tsx

Change CTA label:
- "Invest With Us" → "Request private introduction"
Route to: /contact

Also scan header/nav labels for:
- invest, offering, returns, opportunities
Replace with neutral language where needed.

Acceptance:
- No “invest/offering/returns/opportunities” in main nav CTA.

---

## Exit Criteria Checklist
- [ ] Hero has third line + micro-proof row
- [ ] Hero CTAs are compliant and point to /media and /contact
- [ ] FounderNote present under hero
- [ ] “Our Underwriting Standard” + Proof-of-Seriousness present directly below
- [ ] Principles strip near bottom of Home
- [ ] Header CTA updated to “Request private introduction”
