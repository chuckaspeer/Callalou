import { NextResponse } from "next/server";
import { normalizeReadingPath, VALID_PLATFORMS, type PlatformConfig } from "@/types/insights";

export const runtime = "nodejs";

const INSIGHTS_SCRIPT_URL = process.env.INSIGHTS_SCRIPT_URL;

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
} as const;

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

export async function GET() {
  if (!INSIGHTS_SCRIPT_URL) {
    return NextResponse.json(
      { ok: false, error: { code: "CONFIG", message: "INSIGHTS_SCRIPT_URL missing" } },
      { status: 503, headers: NO_STORE_HEADERS }
    );
  }

  try {
    const url = new URL(INSIGHTS_SCRIPT_URL);
    url.searchParams.set("path", "media");
    const res = await fetch(url.toString(), { cache: "no-store" });

    let data: unknown;
    try {
      data = await res.json();
    } catch {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        {
          ok: false,
          error: {
            code: "UPSTREAM",
            message: "Apps Script returned non-JSON",
            snippet: truncate(text),
          },
        },
        { status: 502, headers: NO_STORE_HEADERS }
      );
    }

    if (!res.ok) {
      const payload =
        data != null && typeof data === "object" && "error" in data
          ? { ok: false, error: (data as { error: unknown }).error }
          : { ok: false, error: { code: "UPSTREAM", message: "Apps Script request failed", snippet: truncate(JSON.stringify(data)) } };
      return NextResponse.json(payload, {
        status: res.status >= 400 ? res.status : 502,
        headers: NO_STORE_HEADERS,
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

      return NextResponse.json(
        { ...(data as object), items, platforms },
        { headers: NO_STORE_HEADERS }
      );
    }

    return NextResponse.json(
      {
        ok: false,
        error: {
          code: "UPSTREAM",
          message: "Apps Script response missing ok:true or items array",
          snippet: truncate(JSON.stringify(data)),
        },
      },
      { status: 502, headers: NO_STORE_HEADERS }
    );
  } catch (err) {
    const snippet = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        ok: false,
        error: { code: "UPSTREAM", message: "Apps Script request failed", snippet: truncate(snippet) },
      },
      { status: 502, headers: NO_STORE_HEADERS }
    );
  }
}
