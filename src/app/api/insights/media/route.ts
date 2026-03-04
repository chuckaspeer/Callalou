import { NextResponse } from "next/server";
import { normalizeReadingPath } from "@/types/insights";

export const runtime = "nodejs";
export const revalidate = 120;

const INSIGHTS_SCRIPT_URL = process.env.INSIGHTS_SCRIPT_URL;

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
      { status: 503 }
    );
  }

  try {
    const url = new URL(INSIGHTS_SCRIPT_URL);
    url.searchParams.set("path", "media");
    const res = await fetch(url.toString(), { next: { revalidate: 120 } });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        data?.error ? { ok: false, error: data.error } : { ok: false, error: { code: "UPSTREAM", message: "Apps Script request failed" } },
        { status: res.status >= 400 ? res.status : 502 }
      );
    }
    if (data?.ok && Array.isArray(data?.items)) {
      const items = data.items.map((item: Record<string, unknown>) => {
        const raw =
          splitMulti(item?.reading_paths).length > 0
            ? splitMulti(item?.reading_paths)
            : splitMulti(item?.readingPaths);
        const readingPaths = raw
          .map(normalizeReadingPath)
          .filter((v): v is NonNullable<typeof v> => Boolean(v));
        return { ...item, readingPaths };
      });
      return NextResponse.json({ ...data, items });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "UPSTREAM", message: "Apps Script request failed" } },
      { status: 502 }
    );
  }
}
