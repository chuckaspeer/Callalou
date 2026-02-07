# Phase 2 — Media/Insights: “Family Office Library”
Scope: src/app/(public)/media/page.tsx + related components, plus a Home “Featured Insights” preview.
Objective: Make Media feel curated and institutional: categories + reading paths + formats/lanes + featured items.

## Repo Reality (confirmed)
Media page: src/app/(public)/media/page.tsx
Current: ContentIntro → FeaturedVideo → VideoGrid → ArticleList → HomeNewsletter
Missing: category filters, reading paths, platform lanes with “What you’ll learn.”

Home: HomeContentPreview exists but is not currently on home.

---

## 1) Add a shared content config (no backend)
Create: src/content/insights.ts (or src/lib/insights.ts)

Define a lightweight content model:
- id (string)
- title
- type: "video" | "article" | "post"
- url (string)
- platform: "YouTube" | "LinkedIn" | "Instagram" | "Facebook" | "Site"
- categories: Array<"Transparency" | "Risk" | "Allocation" | "Patience" | "Platform Build">
- readingPaths: Array<"Start Here" | "Underwriting" | "Stewardship">
- featured?: boolean

Populate with placeholders using existing items currently shown (FeaturedVideo / VideoGrid / ArticleList).
If those components already source data elsewhere, adapt to map into this config.

Acceptance:
- Media page can render from this config without backend changes.

---

## 2) Add Category Filters (Layer 1)
On src/app/(public)/media/page.tsx:
- Add filter UI at top: Transparency / Risk / Allocation / Patience / Platform Build
- Filtering should affect the visible list sections (or a unified feed).

Style:
- tabs or quiet pills (not flashy)
- default "All" optional

Acceptance:
- Selecting a category changes visible items.

---

## 3) Add Reading Paths (Layer 2)
Add a "Reading Paths" section at the top of Media, above FeaturedVideo:
- Start Here (10 items)
- Underwriting (10 items)
- Stewardship (10 items)

Rules:
- fixed list, stable order
- Start Here most prominent
- use items tagged with readingPaths in config

If fewer than 10 exist today, render up to N without breaking layout.

Acceptance:
- Start Here is immediately visible.
- Lists feel like an intentional reading list.

---

## 4) Add Formats section with “What you’ll learn”
Add a "Formats" or "Where we publish" section (quiet) showing 4 lanes:
- LinkedIn — “Frameworks and standards you can audit.”
- YouTube — “Full breakdowns, downside first.”
- Instagram — “Principles, discipline, stewardship.”
- Facebook — “Community and relationship continuity.”

Each lane should link to:
- external platform profile (if known) OR
- a filtered view on the Media page by platform (preferred if platform metadata exists)

Acceptance:
- This section makes the page feel curated, not chaotic.

---

## 5) Add Featured Insights on Home (4 items)
Create: src/components/home/FeaturedInsights.tsx (new)
Data source: insights config (same file as above).

Selection logic:
- 4 items total:
  - 1 tagged Start Here
  - 1 tagged Underwriting
  - 1 tagged Stewardship
  - 1 wildcard (most institutional)
Hardcode IDs in config for stability (no recency rotation).

Wire into: src/app/(public)/page.tsx
Placement suggestion: after PortfolioOverview or before HomeNewsletter.

Acceptance:
- Home rewards depth and sends serious readers to Media.

---

## Exit Criteria Checklist
- [ ] insights config exists and is used by Media page sections
- [ ] category filters render and work
- [ ] reading paths render (Start Here prominent)
- [ ] formats section exists with “What you’ll learn” copy
- [ ] Home displays Featured Insights (4) from config
