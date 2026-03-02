import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 300;

const INSIGHTS_SCRIPT_URL = process.env.INSIGHTS_SCRIPT_URL;

export async function GET() {
  if (!INSIGHTS_SCRIPT_URL) {
    return NextResponse.json(
      { ok: false, error: { code: "CONFIG", message: "INSIGHTS_SCRIPT_URL not set" } },
      { status: 503 }
    );
  }

  try {
    const url = new URL(INSIGHTS_SCRIPT_URL);
    url.searchParams.set("path", "featured");
    const res = await fetch(url.toString(), {
      next: { revalidate: 300 },
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        data?.error ? { ok: false, error: data.error } : { ok: false, error: { code: "UPSTREAM", message: "Script error" } },
        { status: res.status >= 400 ? res.status : 502 }
      );
    }
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: { code: "NETWORK", message: "Failed to fetch featured" } },
      { status: 502 }
    );
  }
}
