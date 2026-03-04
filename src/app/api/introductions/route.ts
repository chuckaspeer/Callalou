import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INSIGHTS_SCRIPT_URL = process.env.INSIGHTS_SCRIPT_URL;
const INSIGHTS_SCRIPT_SECRET = process.env.INSIGHTS_SCRIPT_SECRET;

if (process.env.NODE_ENV !== "production") {
  console.log("[introductions route] INSIGHTS_SCRIPT_URL present:", Boolean(INSIGHTS_SCRIPT_URL));
  console.log("[introductions route] INSIGHTS_SCRIPT_SECRET present:", Boolean(INSIGHTS_SCRIPT_SECRET));
  // Don't print the actual values, just presence.
}
console.log("INSIGHTS_SCRIPT_URL =", process.env.INSIGHTS_SCRIPT_URL);
console.log("Upstream URL =", INSIGHTS_SCRIPT_URL);
export async function GET() {
  if (!INSIGHTS_SCRIPT_URL) {
    return NextResponse.json(
      { ok: false, error: { code: "CONFIG", message: "INSIGHTS_SCRIPT_URL missing" } },
      { status: 503 }
    );
  }
  if (!INSIGHTS_SCRIPT_SECRET) {
    return NextResponse.json(
      { ok: false, error: { code: "CONFIG", message: "INSIGHTS_SCRIPT_SECRET required for GET introductions" } },
      { status: 503 }
    );
  }

  try {
    const url = new URL(INSIGHTS_SCRIPT_URL);
    url.searchParams.set("path", "introductions");
    url.searchParams.set("secret", INSIGHTS_SCRIPT_SECRET);
    const res = await fetch(url.toString());
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        data?.error ? { ok: false, error: data.error } : { ok: false, error: { code: "UPSTREAM", message: "Apps Script request failed" } },
        { status: res.status >= 400 ? res.status : 502 }
      );
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "UPSTREAM", message: "Apps Script request failed" } },
      { status: 502 }
    );
  }
}

export async function POST(request: Request) {
  if (!INSIGHTS_SCRIPT_URL) {
    return NextResponse.json(
      { ok: false, error: { code: "CONFIG", message: "INSIGHTS_SCRIPT_URL missing" } },
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

  try {
    const url = new URL(INSIGHTS_SCRIPT_URL);
    url.searchParams.set("path", "introductions");
    const res = await fetch(url.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const rawBody = await res.text();
    const snippet = rawBody.length > 300 ? rawBody.slice(0, 300) + "…" : rawBody;

    if (process.env.NODE_ENV !== "production") {
      console.log("[introductions] Upstream status:", res.status);
      console.log("[introductions] Upstream content-type:", res.headers.get("content-type"));
      console.log("[introductions] Upstream body (first 300):", snippet);
    }

    let data: { error?: { message?: string }; [key: string]: unknown } = {};
    try {
      data = rawBody ? (JSON.parse(rawBody) as typeof data) : {};
    } catch {
      data = {};
    }

    if (!res.ok) {
      const message =
        data?.error?.message
          ? `${res.status}: ${data.error.message}`
          : `${res.status}: ${snippet || "Upstream error"}`;

      return NextResponse.json(
        { ok: false, error: { code: "UPSTREAM", message } },
        { status: res.status >= 400 ? res.status : 502 }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "UPSTREAM", message: "Apps Script request failed" } },
      { status: 502 }
    );
  }
}
