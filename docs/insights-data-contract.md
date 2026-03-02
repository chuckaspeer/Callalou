# Insights Data Contract

Single source of truth for the Insight shape and behavior used by the Insights page, proxy API, and Google Sheets CMS. One canonical `Insight` interface only; no parallel types.

---

## Insight interface

Defined in `src/types/insights.ts`. All UI and proxy use this type.

```ts
interface Insight {
  id: string;
  title: string;
  type: "video" | "article" | "post";
  url: string;
  platform: InsightPlatform;
  categories: InsightCategory[];
  readingPaths: ReadingPath[];
  featuredSlot?: FeaturedSlot;
  summary?: string;
  length?: string;
  featured?: boolean;
  order?: number;
  published_at?: string | null;
  status?: "draft" | "published" | "archived";
  youtubeId?: string;
  thumbnailUrl?: string;
}
```

### Required (minimal, UI-critical)

| Field | Type | Notes |
|-------|------|--------|
| `id` | string | Unique identifier |
| `title` | string | Display title |
| `type` | `"video" \| "article" \| "post"` | Content type |
| `url` | string | Link (may be empty if unresolved) |
| `platform` | InsightPlatform | Where it lives |
| `categories` | InsightCategory[] | For category filter (may be empty after validation) |
| `readingPaths` | ReadingPath[] | For reading path grouping (may be empty after validation) |

### Optional

| Field | Type | Notes |
|-------|------|--------|
| `featuredSlot` | FeaturedSlot \| undefined | Slot for "featured for home" |
| `summary` | string \| undefined | Short description |
| `length` | string \| undefined | e.g. "10 min" |
| `featured` | boolean \| undefined | Included in featured listing |
| `order` | number \| undefined | Sort order (lower = earlier) |
| `published_at` | string \| null \| undefined | ISO date or null |
| `status` | `"draft" \| "published" \| "archived"` \| undefined | Public endpoints return only `status === "published"` |
| `youtubeId` | string \| undefined | For embed / links |
| `thumbnailUrl` | string \| undefined | Thumbnail image URL |

---

## Normalization strategy

Use `normalizeInsight(raw: Partial<Insight>): Insight` (from `@/types/insights` or `@/content/insights`) so that:

- **Defaults:** `featured` → false, `order` → 9999, `published_at` → null, `status` → "draft".
- **Validation:** platform/category/readingPaths validated against allowed constants; invalid entries are dropped (not rejected).
- **Coercion:** `order` coerced to number; invalid → 9999.
- **Status:** Only `draft`, `published`, `archived` accepted; otherwise → "draft".

Proxy and UI should normalize any raw payload (e.g. from Apps Script) before use so the app always consumes a full, valid `Insight`.

---

## Sorting rules

Use `sortInsights(list: Insight[]): Insight[]`. Order is:

1. **featured === true** first.
2. **order** ascending (undefined treated as 9999).
3. **published_at** descending (null treated as oldest).
4. **Stable fallback by id** to avoid nondeterministic order.

---

## YouTube / video URL priority

Use `resolveVideoFields(row): { url, youtubeId, thumbnailUrl }` (row may have `url`, `youtubeId`, `youtube_url`, `thumbnailUrl`):

1. If **url** exists → use it (optionally derive youtubeId from it).
2. Else if **youtubeId** exists → build `url` from youtubeId (`https://www.youtube.com/watch?v=${youtubeId}`).
3. Else if **youtube_url** exists → use it as url and derive youtubeId from it.
4. Else → url is empty string.

**Thumbnail:** If `thumbnailUrl` is missing and `youtubeId` exists → `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg`.

---

## Sheet default rules

When reading from the Media sheet (or any row source):

| Blank / missing | Default |
|-----------------|---------|
| featured | false |
| order | 9999 |
| status | "draft" |
| published_at | null |

**Public endpoint (media / featured):**

- Drop invalid categories/readingPaths silently (filter against allowed constants).
- Exclude items where `status !== "published"`.

**Admin write endpoint (e.g. admin_media):**

- Reject invalid platform.
- Reject invalid featuredSlot.
- Reject invalid status.
- Filter out invalid categories/readingPaths (do not reject the whole row; drop invalid entries only).

---

## Apps Script constraints

- **No request headers:** Do not use Origin or any custom header. Web Apps cannot reliably read them.
- **Routing:** Only via `e.parameter.path` (query param).
- **Secret:** Admin and read-introductions operations require secret via `e.parameter.secret` OR JSON `body.secret` only.
- **No CORS logic:** All calls are server-to-server (Next.js proxy).

### Apps Script routing

Single Web App URL; dispatch by `e.parameter.path`:

| Method | Path | Description |
|--------|------|-------------|
| GET | `?path=media` | Public; returns published Insights (media list). |
| GET | `?path=featured` | Public; returns featured items. |
| POST | `?path=introductions` | Append one introduction (Request Introduction form). |
| GET | `?path=introductions` | Admin only; requires secret; returns introduction rows. |
| POST | `?path=admin_media` | Admin only; requires secret; write to Media sheet. |

---

## Constants

- **ReadingPath:** `"Start Here" | "Underwriting" | "Stewardship"` (stable order for UI).
- **InsightCategory:** `"Transparency" | "Risk" | "Allocation" | "Patience" | "Platform Build"`.
- **InsightPlatform:** `"YouTube" | "LinkedIn" | "Instagram" | "Facebook" | "Site"`.
- **InsightStatus:** `"draft" | "published" | "archived"`.

---

## Filtering rules

- **Category:** Filter by `categories` includes selected category; `"All"` = no category filter.
- **Platform:** Filter by `platform` equals selected platform; absent = no platform filter.
- **Public API:** Exclude items where `status !== "published"`.

---

## Reading path grouping logic

- Paths: Start Here, Underwriting, Stewardship (fixed order).
- For each path, include items where `readingPaths` contains that path.
- Apply category and platform filters within each path.
- Limit per path (e.g. 10) and use sort rules above.

---

## Featured (home) logic

- Items with `featured === true`, ordered by sort rules; or use `featuredSlot` to pick one per slot (start-here, underwriting, stewardship, wildcard) for a fixed 4-item home block.

---

## Pagination

- No pagination in the current UI. Endpoints may return full list or a capped list; client uses what’s returned.

---

## Google Sheets CMS design: Media

Tab name: **Media**. Sheet constant: `SHEET_MEDIA`.

| Column         | Maps to / notes                                      | Sheet default (blank) |
|----------------|------------------------------------------------------|------------------------|
| id             | Insight.id                                           | —                      |
| title          | Insight.title                                        | —                      |
| type           | video \| article \| post                              | —                      |
| description    | Insight.summary                                      | —                      |
| platform       | Insight.platform                                     | —                      |
| categories     | Comma-separated → Insight.categories                 | —                      |
| youtube_url    | Used by resolveVideoFields                            | —                      |
| youtube_id     | Insight.youtubeId                                    | —                      |
| thumbnail_url  | Insight.thumbnailUrl                                 | —                      |
| featured       | boolean → Insight.featured                           | false                  |
| featured_slot  | start-here \| underwriting \| stewardship \| wildcard | —                      |
| reading_paths  | Comma-separated → Insight.readingPaths                | —                      |
| order          | number → Insight.order                               | 9999                   |
| published_at   | ISO date or empty → Insight.published_at             | null                   |
| status         | draft \| published \| archived                        | draft                  |
| length         | e.g. "10 min"                                        | —                      |
| created_at     | Audit                                                | —                      |
| updated_at     | Audit                                                | —                      |

---

## Google Sheets Intake design: Introductions

Tab name: **Introductions**. Sheet constant: `SHEET_INTRODUCTIONS`. Used by the /private-dialogue “Request Introduction” form; implemented in Apps Script as `appendIntroduction(body)`.

Columns (in this exact order):

| # | Column           | Notes |
|---|------------------|--------|
| 1 | id               | Generated: `"I"` + timestamp |
| 2 | full_name        | Required |
| 3 | email            | Required; must contain `@` |
| 4 | investor_profile | Optional |
| 5 | accredited_status| Optional |
| 6 | experience       | Optional |
| 7 | commitment_range | Optional |
| 8 | interests        | Optional |
| 9 | referral_source  | Optional |
| 10| created_at       | Generated: ISO string |
| 11| source           | Optional; default `private-dialogue` |
| 12| utm_source       | Optional |
| 13| utm_medium       | Optional |
| 14| utm_campaign     | Optional |

### Introductions Intake Contract

**POST** `?path=introductions` — append one introduction.

**Expected POST body keys:**

| Key | Required | Notes |
|-----|----------|--------|
| full_name | Yes | Non-empty, trimmed |
| email | Yes | Non-empty, trimmed; must contain `@` |
| investor_profile | No | Trimmed string |
| accredited_status | No | Trimmed string |
| experience | No | Trimmed string |
| commitment_range | No | Trimmed string |
| interests | No | Trimmed string |
| referral_source | No | Trimmed string |
| source | No | Default `private-dialogue` |
| utm_source, utm_medium, utm_campaign | No | Trimmed strings |

**Validation rules:**

- `full_name` and `email` are required (non-empty after trim).
- `email` must contain `"@"`.

**Response shape:**

- Success: `{ ok: true, items: [{ id }] }`
- Errors: `{ ok: false, error: { code, message } }` (e.g. `VALIDATION`: "full_name and email required"; `CONFIG`: "Introductions sheet not found").

**GET** `?path=introductions` — admin only; requires secret. Returns `{ ok: true, items: [...] }` (rows from Introductions sheet). Invalid or missing secret → `UNAUTHORIZED`.

---

## Components using this contract

| Component | Usage |
|-----------|--------|
| `insights/page.tsx` | Fetches media, normalizes + sorts, passes list to children |
| `ReadingPathsSection` | getInsightsForPath / getInsightsForPathFromList |
| `CategoryFilter` | Category + platform only (links) |
| `FormatsSection` | Category only (links) |
| `FeaturedInsights` (home) | getFeaturedForHome() / getFeaturedForHomeFromList() |
| `VideoGrid` / `FeaturedVideo` | Can be driven from Insight list (e.g. type === "video") |

---

## Single source of truth

- **Type:** `src/types/insights.ts` only. All UI and proxy use this definition.
- **Re-exports:** `src/content/insights.ts` re-exports types and helpers (including `normalizeInsight`, `sortInsights`, `resolveVideoFields`) for convenience.
- **Proxy responses:** Must match the canonical Insight shape; consumers normalize with `normalizeInsight` and sort with `sortInsights` when reading from API.
