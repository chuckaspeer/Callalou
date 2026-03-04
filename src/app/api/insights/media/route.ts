import { NextResponse } from "next/server";
import { normalizeReadingPath } from "@/types/insights";

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

    if (data != null && typeof data === "object" && (data as { ok?: boolean }).ok && Array.isArray((data as { items?: unknown }).items)) {
      const items = ((data as { items: Record<string, unknown>[] }).items).map((item: Record<string, unknown>) => {
        const raw =
          splitMulti(item?.reading_paths).length > 0
            ? splitMulti(item?.reading_paths)
            : splitMulti(item?.readingPaths);
        const readingPaths = raw
          .map(normalizeReadingPath)
          .filter((v): v is NonNullable<typeof v> => Boolean(v));
        return { ...item, readingPaths };
      });
      return NextResponse.json({ ...(data as object), items }, { headers: NO_STORE_HEADERS });
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
