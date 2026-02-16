# Callaloo Ventures – 3-Page Rule Refactor Plan

## 1. High-level correction summary

**Goal:** Strict 3-page compliance. Only three public, navigation-visible destinations:

- **Home** (`/`)
- **Insights** (`/media` or `/insights`)
- **Connect** (`/contact`)

**Approach:**

- **Routing:** Remove or redirect all other top-level public routes so only the three above are valid entry points. No new primary URLs.
- **Pillar content (SEO):** Never implement pillar themes as separate routes (e.g. no `/media/transparency-reporting-standards`). Implement them **only** as:
  - **Filtered views** on `/media` via existing `?category=` (and optional `?collection=` for pillar groupings), and/or
  - **Anchored sections** on `/media` with `#transparency-reporting-standards`, `#risk-underwriting`, `#wealth-behavior-stewardship`, with full crawlable content in the same document.
- **Nav:** Header and footer show exactly three links: Home, Insights (or Media), Connect. No About, Portfolio, Gallery, or other top-level items.
- **Deep links:** About, Portfolio, Gallery, Philosophy content is reached by redirecting to `/#section` or by merging key content into Home/Insights. Lead magnet (downside checklist) lives as a section on Connect or is reached via redirect to `/contact#downside-checklist` with the form rendered there.

**What stays unchanged:** Design system, analytics events, Home/Connect internal architecture (except any in-page additions for merged content or lead magnet).

---

## 2. Routing changes (delete / merge / redirect)

### 2.1 Allowed routes (keep as-is)

| Route        | File(s)                           | Action   |
|-------------|------------------------------------|----------|
| `/`         | `src/app/(public)/page.tsx`        | Keep     |
| `/media`    | `src/app/(public)/media/page.tsx`  | Keep     |
| `/contact`  | `src/app/(public)/contact/page.tsx`| Keep     |

Optional: Rename "Media" to "Insights" in UI and optionally use `/insights` as the path (see 3.2). If so, add `src/app/(public)/insights/page.tsx` that re-exports or redirects to the same content, and use `/insights` in nav; otherwise keep `/media` and label nav "Insights".

### 2.2 Routes to remove or convert to redirects

| Current route                      | Action |
|------------------------------------|--------|
| `/about`                           | Replace `src/app/(public)/about/page.tsx` with a **redirect** to `/?section=about` or `/` (and add an about section on Home with `id="about"` if desired). Alternatively delete the folder and redirect at middleware level to `/`. |
| `/portfolio`                       | Replace `src/app/(public)/portfolio/page.tsx` with a **redirect** to `/` (portfolio content can live in a section on Home or be linked from Home). |
| `/gallery`                         | Replace `src/app/(public)/gallery/page.tsx` with a **redirect** to `/` or `/media` (e.g. `/#gallery` or `/media`). |
| `/philosophy`                      | Replace `src/app/(public)/philosophy/page.tsx` with a **redirect** to `/media` or `/` (philosophy as Insights content or Home section). |
| `/resources/downside-checklist`    | **Option A:** Redirect to `/contact#downside-checklist` and render the downside checklist form as a section on the Connect page. **Option B:** Delete the route and move the form component into `src/app/(public)/contact/page.tsx` as a second section; any external link to the old URL redirects to `/contact`. |

**Concrete file changes:**

- **Delete or replace with redirect:**
  - `src/app/(public)/about/page.tsx` → redirect to `/`
  - `src/app/(public)/portfolio/page.tsx` → redirect to `/`
  - `src/app/(public)/gallery/page.tsx` → redirect to `/` or `/media`
  - `src/app/(public)/philosophy/page.tsx` → redirect to `/media` or `/`
  - `src/app/(public)/resources/downside-checklist/page.tsx` → redirect to `/contact#downside-checklist` **and** add the checklist form section to the contact page (see 3.4)

- **Do not create:**
  - `src/app/(public)/media/transparency-reporting-standards/page.tsx`
  - `src/app/(public)/media/risk-underwriting/page.tsx`
  - `src/app/(public)/media/wealth-behavior-stewardship/page.tsx`  
  Any pillar content is implemented only as filters/sections on `/media` (see 3.3 and 4).

### 2.3 Redirect implementation (Next.js App Router)

For each removed page, replace its content with a server redirect:

```ts
// Example: src/app/(public)/about/page.tsx
import { redirect } from "next/navigation";

export default function AboutRedirect() {
  redirect("/");
}
```

Apply the same pattern for portfolio, gallery, philosophy. For `resources/downside-checklist`, redirect to `/contact#downside-checklist`.

---

## 3. Component and page updates

### 3.1 Navigation (header and footer)

**Files:** [src/components/layout/SiteHeader.tsx](src/components/layout/SiteHeader.tsx), [src/components/layout/SiteFooter.tsx](src/components/layout/SiteFooter.tsx)

- **SiteHeader:** Replace `navLinks` with exactly three items:
  - `{ href: "/", label: "Home" }`
  - `{ href: "/media", label: "Insights" }` (or `/insights` if route is renamed)
  - `{ href: "/contact", label: "Connect" }`
- Remove: About, Portfolio, Gallery, Media (if Media is relabeled to Insights, keep the same href so the single Insights link points to `/media` or `/insights`).
- Keep the primary CTA "Request private introduction" linking to `/contact`.

- **SiteFooter:** Mirror the same three links in quick links (Home, Insights, Connect). Remove About, Portfolio, Gallery, Media from the list.

### 3.2 Optional: Rename "Media" to "Insights" in UI

- Update any user-facing copy that says "Media" to "Insights" (e.g. ContentIntro, FormatsSection, nav label). Keep the route as `/media` unless you add an `/insights` alias (e.g. `insights/page.tsx` that redirects to `/media` or uses the same layout and content).
- If you want a single canonical URL for SEO, prefer one path (e.g. `/media` with label "Insights") to avoid duplicate content.

### 3.3 Insights page: pillar content as filters + anchored sections (no new routes)

**File:** [src/app/(public)/media/page.tsx](src/app/(public)/media/page.tsx)

- **Pillar collections:** Define three pillar "collections" in content/config (e.g. in [src/content/insights.ts](src/content/insights.ts)):
  - **Transparency & reporting standards** → map to category/categories (e.g. Transparency) or a new `pillar: "transparency-reporting-standards"` field on insights.
  - **Risk & underwriting** → map to Risk (and optionally Underwriting reading path).
  - **Wealth behavior & stewardship** → map to Patience + Stewardship or a dedicated pillar tag.

- **URL strategy:** Support an optional query param, e.g. `?collection=transparency-reporting-standards` (or reuse `?category=Transparency`). Do **not** create segments like `/media/transparency-reporting-standards`.

- **Rendering on `/media`:**
  - **Option A (recommended):** Add three **anchored sections** on the same `/media` page, each with a stable `id` for SEO and deep links:
    - `id="transparency-reporting-standards"`
    - `id="risk-underwriting"`
    - `id="wealth-behavior-stewardship"`
  - Each section contains a short heading and a curated list of insights (from existing data or placeholders). "Explore collection" buttons can link to `?category=Transparency` (or the appropriate filter) or to `#transparency-reporting-standards`, etc.
  - **Option B:** Only filter by existing categories; no separate pillar sections. Pillar themes are then reachable via `?category=Transparency`, `?category=Risk`, and a combination for stewardship (e.g. Patience + Reading path Stewardship). Less explicit pillar URLs but still one page.

- **Component work:**
  - Add a component (e.g. `PillarCollectionsSection` or extend existing sections) that renders the three pillar blocks on [src/app/(public)/media/page.tsx](src/app/(public)/media/page.tsx) with the above `id`s and curated content.
  - CategoryFilter already supports `?category=`. Add "Explore collection" links that set `?category=...` or scroll to `#...` so pillar content is accessible from the Insights page without new routes.

**Files to add or edit:**

- [src/content/insights.ts](src/content/insights.ts): Add pillar mapping (e.g. `PILLAR_COLLECTIONS` and a helper `getInsightsByPillar(pillar)`) if you want explicit pillar grouping; otherwise reuse categories.
- [src/app/(public)/media/page.tsx](src/app/(public)/media/page.tsx): Render the three anchored pillar sections; pass `selectedCategory` (and optional `collection`) from searchParams.
- New component (e.g. `src/components/content/PillarCollectionsSection.tsx`): Renders three sections with headings, short intro copy, and curated insight links (or placeholders). Each section has the appropriate `id` for anchors and SEO.

### 3.4 Connect page: lead magnet section (if moving checklist here)

**Files:** [src/app/(public)/contact/page.tsx](src/app/(public)/contact/page.tsx), [src/components/contact/ContactFormWrapper.tsx](src/components/contact/ContactFormWrapper.tsx) (or new section component)

- If `/resources/downside-checklist` is redirected to `/contact#downside-checklist`:
  - Add a section on the contact page with `id="downside-checklist"` that renders the 5-Minute Downside Checklist form (extract or reuse the form from the current [src/app/(public)/resources/downside-checklist/page.tsx](src/app/(public)/resources/downside-checklist/page.tsx)).
  - Ensure "What happens next" and the main contact form remain; the checklist can be a second block below or above, with a clear heading so deep link and redirect make sense.
- Update any links that pointed to `/resources/downside-checklist` to point to `/contact#downside-checklist`.

### 3.5 Internal links that pointed to removed routes

Update any in-app links so they do not point to the removed top-level pages:

- [src/components/home/PortfolioOverview.tsx](src/components/home/PortfolioOverview.tsx): `href="/portfolio"` → `href="/#portfolio"` or a new Home section id (e.g. `/#overview`), or remove the link if portfolio is only summarized on Home.
- [src/components/gallery/GalleryGrid.tsx](src/components/gallery/GalleryGrid.tsx): `href="/portfolio"` → `href="/"` or `/#gallery` (if you add a gallery section on Home).
- [src/components/portfolio/BuildingShowcase.tsx](src/components/portfolio/BuildingShowcase.tsx): `href="/gallery"` → `href="/"` or `/#gallery` (these components may only be used on the portfolio page that will redirect; after redirect, these links will be from Home if you merge content).
- [src/components/home/HomeBurnTheBoatsTeaser.tsx](src/components/home/HomeBurnTheBoatsTeaser.tsx): `href="/philosophy"` → `href="/media"` or `href="/media?category=Patience"` (or an anchor on /media if you add a philosophy section there).
- [src/components/about/AboutCTA.tsx](src/components/about/AboutCTA.tsx): `href="/contact?type=investor"` is fine; if this component is only used on the about page, it will still work after redirect when About content is merged into Home (e.g. if you add an About section on Home that includes AboutCTA).

Search the repo for `href="/about"`, `href="/portfolio"`, `href="/gallery"`, `href="/philosophy"`, `href="/resources/downside-checklist"` and replace with the chosen redirect target or new hash/section.

---

## 4. SEO / metadata handling

### 4.1 Single canonical URL for Insights

- The Insights page has **one canonical URL**: `https://callalouventures.com/media` (or `/insights` if you switch). Do not create separate canonical URLs for pillar themes.

### 4.2 Preserving crawlable pillar content

- **Approach:** Render the three pillar themes as **full HTML sections** on the same `/media` page (with `id="transparency-reporting-standards"`, `id="risk-underwriting"`, `id="wealth-behavior-stewardship"`). Crawlers will see the content on `/media`; no need for separate URLs.
- **Optional:** If you use a query param for deep linking (e.g. `?collection=transparency-reporting-standards`), implement **dynamic metadata** in [src/app/(public)/media/page.tsx](src/app/(public)/media/page.tsx) via `generateMetadata({ searchParams })` to set `title` and `description` for that collection while keeping `canonical` as `/media`. This gives better SERP snippets when users share filtered links but does not create new primary URLs.

Example pattern:

```ts
// In media/page.tsx or layout under media
export async function generateMetadata({ searchParams }: { searchParams: Promise<{ collection?: string }> }) {
  const params = await searchParams;
  const collection = params.collection;
  const titles: Record<string, string> = {
    "transparency-reporting-standards": "Transparency & Reporting Standards",
    "risk-underwriting": "Risk & Underwriting",
    "wealth-behavior-stewardship": "Wealth Behavior & Stewardship",
  };
  if (collection && titles[collection]) {
    return {
      title: `${titles[collection]} | Insights`,
      description: `Curated insights: ${titles[collection]}.`,
    };
  }
  return { title: "Insights | Callaloo Ventures", description: "..." };
}
```

- **Recommendation:** Use **anchored sections + optional `?collection=` for metadata**. That way: (1) one canonical URL, (2) crawlable pillar content on one page, (3) shareable links like `/media?collection=risk-underwriting` with appropriate title/description.

### 4.3 No new sitemap URLs

- Sitemap (if any) should list only `/`, `/media`, `/contact` (and optionally `/insights` if it’s a separate path that redirects or aliases). Do not add `/media/transparency-reporting-standards` or similar.

---

## 5. Verification checklist (3-page compliance)

Use this to confirm compliance before and after refactor.

- [ ] **Nav:** Header shows exactly 3 main links (Home, Insights, Connect). No About, Portfolio, Gallery, or Media as a separate nav item (Insights can be labeled "Insights" and point to `/media`).
- [ ] **Nav:** Footer quick links show the same 3 destinations only.
- [ ] **Routes:** Only these route segments render real content: `(public)/page.tsx` (Home), `(public)/media/page.tsx` (Insights), `(public)/contact/page.tsx` (Connect). No `(public)/about/page.tsx`, `(public)/portfolio/page.tsx`, `(public)/gallery/page.tsx`, `(public)/philosophy/page.tsx` as content pages (they redirect or are removed).
- [ ] **Pillar content:** There are no files under `(public)/media/transparency-reporting-standards/`, `(public)/media/risk-underwriting/`, or `(public)/media/wealth-behavior-stewardship/`. Pillar content exists only as filtered views or anchored sections on `/media`.
- [ ] **Lead magnet:** Either `/resources/downside-checklist` redirects to `/contact#downside-checklist` and the form exists on the contact page, or the resources route is removed and the form is only on `/contact`.
- [ ] **Internal links:** No `href="/about"`, `href="/portfolio"`, `href="/gallery"`, `href="/philosophy"` (or they redirect). Links to the lead magnet point to `/contact#downside-checklist` or `/contact`.
- [ ] **SEO:** Canonical for Insights is `/media` (or `/insights`). No canonical URLs for pillar themes as separate pages. Optional: `?collection=` changes only metadata, not the primary URL.
- [ ] **Design / analytics:** No changes to design system or analytics event names (only routing and nav changed).

---

## Summary table: file-by-file actions

| File or area | Action |
|--------------|--------|
| `src/app/(public)/about/page.tsx` | Replace with `redirect("/")` (or redirect to `/#about`). |
| `src/app/(public)/portfolio/page.tsx` | Replace with `redirect("/")`. |
| `src/app/(public)/gallery/page.tsx` | Replace with `redirect("/")` or `redirect("/media")`. |
| `src/app/(public)/philosophy/page.tsx` | Replace with `redirect("/media")` or `redirect("/")`. |
| `src/app/(public)/resources/downside-checklist/page.tsx` | Replace with `redirect("/contact#downside-checklist")`; add checklist section to contact page. |
| `src/components/layout/SiteHeader.tsx` | Nav: only Home, Insights, Connect. |
| `src/components/layout/SiteFooter.tsx` | Quick links: only Home, Insights, Connect. |
| `src/app/(public)/media/page.tsx` | Add three anchored pillar sections; optional `?collection=` and `generateMetadata`. |
| `src/content/insights.ts` | Optional: add pillar mapping / helper for curated pillar lists. |
| New: `src/components/content/PillarCollectionsSection.tsx` | Three sections with ids and "Explore collection" links. |
| `src/app/(public)/contact/page.tsx` | Add downside checklist section with `id="downside-checklist"`. |
| `PortfolioOverview.tsx`, `GalleryGrid.tsx`, `BuildingShowcase.tsx`, `HomeBurnTheBoatsTeaser.tsx`, `AboutCTA.tsx` | Update internal links to `/`, `/media`, or `/contact#...`. |
| Do not create | `media/transparency-reporting-standards/page.tsx`, `media/risk-underwriting/page.tsx`, `media/wealth-behavior-stewardship/page.tsx`. |

This plan brings the site into strict 3-page compliance while preserving SEO value for pillar themes on a single Insights page and keeping the existing design and analytics intact.

---

## Implementation: 3-Page Rule Hardening (Config + Lead Magnet)

### Step-by-step plan (file paths)

1. **Redirects at config level**  
   - **File:** `next.config.ts`  
   - Add `async redirects()` returning permanent redirects: `/about` → `/`, `/portfolio` → `/`, `/gallery` → `/`, `/philosophy` → `/media`, `/resources/downside-checklist` → `/contact?focus=downside-checklist`.  
   - Ensures legacy routes cannot regress (no page-level redirects needed).

2. **Lead magnet on Connect page**  
   - **File:** `src/components/contact/DownsideChecklistSection.tsx` (new)  
   - Client component containing the 5-Minute Downside Checklist form and copy; uses `Section` with `id="downside-checklist"` and `scroll-mt-24`. Fires existing `submit_downside_checklist` analytics event.  
   - **File:** `src/app/(public)/contact/page.tsx`  
   - Import and render `DownsideChecklistSection` and `ContactPageScrollToFocus` after `ContactFormWrapper`.

3. **Scroll to checklist when focus param present**  
   - **File:** `src/components/contact/ContactPageScrollToFocus.tsx` (new)  
   - Client component that reads `useSearchParams()`, and in `useEffect` when `focus=downside-checklist` scrolls `#downside-checklist` into view (smooth). Wrapped in `Suspense` on the contact page because it uses `useSearchParams`.  
   - Uses query param `?focus=downside-checklist` (not hash) so redirect from `/resources/downside-checklist` works reliably.

4. **Remove standalone lead-magnet route**  
   - **File:** `src/app/(public)/resources/downside-checklist/page.tsx`  
   - Delete. Redirect in `next.config.ts` handles the path; checklist lives only on `/contact`.

5. **Nav: only 3 links**  
   - **File:** `src/components/layout/SiteHeader.tsx`  
   - Set `navLinks` to: Home (`/`), Insights (`/media`), Connect (`/contact`).  
   - **File:** `src/components/layout/SiteFooter.tsx`  
   - Set `quickLinks` to the same three.

6. **Cleanup**  
   - Confirm no routes under `src/app/(public)/media/*` except `media/page.tsx` (no pillar sub-routes).  
   - Any internal links to `/resources/downside-checklist` → use `/contact?focus=downside-checklist`. (None found in codebase; use this for any future links.)

### Exact code changes summary

- **next.config.ts:** `redirects()` with the five permanent redirects above.  
- **contact/page.tsx:** Add `DownsideChecklistSection`, `ContactPageScrollToFocus` inside `Suspense`.  
- **New:** `DownsideChecklistSection.tsx` (checklist form + same analytics).  
- **New:** `ContactPageScrollToFocus.tsx` (scroll on `focus=downside-checklist`).  
- **Deleted:** `resources/downside-checklist/page.tsx`.  
- **SiteHeader.tsx / SiteFooter.tsx:** Nav links reduced to Home, Insights, Connect.

### Acceptance checklist (post-implementation)

- [ ] Visiting `/about`, `/portfolio`, `/gallery`, `/philosophy` returns a permanent redirect to `/` or `/media` as configured.
- [ ] Visiting `/resources/downside-checklist` redirects to `/contact?focus=downside-checklist` and the page scrolls to the checklist section (works on first load and on refresh).
- [ ] Header nav shows only: Home, Insights, Connect.
- [ ] Footer quick links show only: Home, Insights, Connect.
- [ ] No pillar routes exist under `/media/` (only `media/page.tsx`).
- [ ] Checklist form on `/contact` still fires `submit_downside_checklist` (Submit: Lead magnet).
- [ ] Loading `/contact` without query params does not scroll; normal behavior unchanged.
