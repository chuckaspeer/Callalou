import "server-only";

import { unstable_cache } from "next/cache";
import { normalizeReadingPath, VALID_PLATFORMS, type PlatformConfig } from "@/types/insights";

/**
 * Time-to-live for cached Apps Script "media" payload (seconds).
 * Change this value to adjust how often fresh data is fetched from Google.
 */
export const MEDIA_INSIGHTS_CACHE_SECONDS = 21_600; // 6 hours

const INSIGHTS_SCRIPT_URL = process.env.INSIGHTS_SCRIPT_URL;

const TRUNCATE_LEN = 300;

function truncate(s: string): string {
  if (s.length <= TRUNCATE_LEN) return s;
  return s.slice(0, TRUNCATE_LEN) + "...";
}

function splitMulti(cell: unknown): string[] {
  if (Array.isArray(cell)) {
    return cell.map(String).map((s) => s.trim()).filter(Boolean);
  }
  if (typeof cell === "string") {
    return cell
      .split(/[;,|]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizePlatformConfig(raw: unknown): PlatformConfig | null {
  if (!raw || typeof raw !== "object") return null;
  const value = raw as Record<string, unknown>;

  const platformRaw = value.platform != null ? String(value.platform).trim() : "";
  if (!platformRaw) return null;

  const matchedPlatform = VALID_PLATFORMS.find(
    (p) => p.toLowerCase() === platformRaw.toLowerCase()
  );
  if (!matchedPlatform) return null;

  const labelRaw = value.label != null ? String(value.label).trim() : "";
  const learnRaw = value.learn != null ? String(value.learn).trim() : "";
  const urlRaw = value.url != null ? String(value.url).trim() : "";

  const orderRaw = value.order;
  const orderNum = typeof orderRaw === "number" ? orderRaw : Number(orderRaw);
  const order = Number.isFinite(orderNum) ? Number(orderNum) : 9999;

  return {
    platform: matchedPlatform,
    label: labelRaw || undefined,
    learn: learnRaw || undefined,
    order,
    url: urlRaw || undefined,
  };
}

export type MediaInsightsUpstreamError = {
  code: string;
  message: string;
  snippet?: string;
};

export type MediaInsightsResult =
  | { ok: true; data: Record<string, unknown> }
  | { ok: false; status: number; error: MediaInsightsUpstreamError };

/**
 * Fetches and normalizes media from Apps Script. On failure, throws so the result is not
 * stored in unstable_cache (only successful payloads are cached).
 */
async function fetchMediaFromAppsScriptUncached(): Promise<Record<string, unknown>> {
  const url = new URL(INSIGHTS_SCRIPT_URL!);
  url.searchParams.set("path", "media");
  const res = await fetch(url.toString(), { cache: "no-store" });

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    const text = await res.text().catch(() => "");
    throw Object.assign(new Error("non-json"), {
      status: 502,
      body: {
        ok: false,
        error: {
          code: "UPSTREAM",
          message: "Apps Script returned non-JSON",
          snippet: truncate(text),
        },
      },
    });
  }

  if (!res.ok) {
    const payload =
      data != null && typeof data === "object" && "error" in data
        ? { ok: false, error: (data as { error: unknown }).error }
        : {
            ok: false,
            error: {
              code: "UPSTREAM",
              message: "Apps Script request failed",
              snippet: truncate(JSON.stringify(data)),
            },
          };
    throw Object.assign(new Error("upstream-not-ok"), {
      status: res.status >= 400 ? res.status : 502,
      body: payload,
    });
  }

  if (
    data != null &&
    typeof data === "object" &&
    (data as { ok?: boolean }).ok &&
    Array.isArray((data as { items?: unknown }).items)
  ) {
    const typed = data as {
      ok: boolean;
      items: Record<string, unknown>[];
      platforms?: unknown;
    };

    const items = typed.items.map((item: Record<string, unknown>) => {
      const raw =
        splitMulti(item?.reading_paths).length > 0
          ? splitMulti(item?.reading_paths)
          : splitMulti(item?.readingPaths);
      const readingPaths = raw
        .map(normalizeReadingPath)
        .filter((v): v is NonNullable<typeof v> => Boolean(v));
      return { ...item, readingPaths };
    });

    const rawPlatforms = Array.isArray(typed.platforms) ? typed.platforms : [];
    const platforms = rawPlatforms
      .map(normalizePlatformConfig)
      .filter((p): p is PlatformConfig => p != null)
      .sort((a, b) => {
        const orderA = a.order ?? 9999;
        const orderB = b.order ?? 9999;
        if (orderA !== orderB) return orderA - orderB;
        const indexA = VALID_PLATFORMS.indexOf(a.platform);
        const indexB = VALID_PLATFORMS.indexOf(b.platform);
        return indexA - indexB;
      });

    return { ...(data as object), items, platforms };
  }

  throw Object.assign(new Error("invalid-payload"), {
    status: 502,
    body: {
      ok: false,
      error: {
        code: "UPSTREAM",
        message: "Apps Script response missing ok:true or items array",
        snippet: truncate(JSON.stringify(data)),
      },
    },
  });
}

const getCachedMediaPayload = unstable_cache(fetchMediaFromAppsScriptUncached, ["insights-media-apps-script"], {
  revalidate: MEDIA_INSIGHTS_CACHE_SECONDS,
});

function normalizeErrorBody(err: unknown): MediaInsightsUpstreamError {
  if (err && typeof err === "object" && "body" in err) {
    const body = (err as { body?: { error?: unknown } }).body;
    const e = body?.error;
    if (typeof e === "string") {
      const trimmed = e.trim();
      if (trimmed.length > 0) {
        return { code: "UPSTREAM", message: trimmed };
      }
    }
    if (e && typeof e === "object") {
      const o = e as Record<string, unknown>;
      const code = typeof o.code === "string" ? o.code : "UPSTREAM";
      const message = typeof o.message === "string" ? o.message : "Apps Script request failed";
      const snippet = typeof o.snippet === "string" ? o.snippet : undefined;
      return { code, message, snippet };
    }
  }
  if (err instanceof Error) {
    return { code: "UPSTREAM", message: err.message };
  }
  return { code: "UPSTREAM", message: "Apps Script request failed" };
}

/**
 * Loads media insights from Apps Script with server-side caching on success.
 * Configuration errors and upstream failures are not cached.
 */
export async function getMediaInsights(): Promise<MediaInsightsResult> {
  if (!INSIGHTS_SCRIPT_URL) {
    return {
      ok: false,
      status: 503,
      error: { code: "CONFIG", message: "INSIGHTS_SCRIPT_URL missing" },
    };
  }

  try {
    const data = await getCachedMediaPayload();
    return { ok: true, data };
  } catch (err) {
    const status =
      err && typeof err === "object" && "status" in err && typeof (err as { status: unknown }).status === "number"
        ? (err as { status: number }).status
        : 502;
    return { ok: false, status, error: normalizeErrorBody(err) };
  }
}
