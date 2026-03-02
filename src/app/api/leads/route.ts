import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INSIGHTS_SCRIPT_URL = process.env.INSIGHTS_SCRIPT_URL;
const INSIGHTS_SCRIPT_SECRET = process.env.INSIGHTS_SCRIPT_SECRET;

export async function POST(request: Request) {
  if (!INSIGHTS_SCRIPT_URL) {
    return NextResponse.json(
      { ok: false, error: { code: "CONFIG", message: "INSIGHTS_SCRIPT_URL not set" } },
      { status: 503 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "BAD_REQUEST", message: "Invalid JSON" } },
      { status: 400 }
    );
  }

  const payload = {
    ...body,
    secret: INSIGHTS_SCRIPT_SECRET,
  };

  try {
    const url = new URL(INSIGHTS_SCRIPT_URL);
    url.searchParams.set("path", "leads");
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
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
      { ok: false, error: { code: "NETWORK", message: "Failed to submit lead" } },
      { status: 502 }
    );
  }
}
