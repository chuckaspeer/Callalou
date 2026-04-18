import { NextResponse } from "next/server";
import { getMediaInsights } from "@/lib/insights/getMediaInsights";

export const runtime = "nodejs";

const NO_STORE_HEADERS = {
  "Cache-Control": "no-store",
} as const;

export async function GET() {
  const result = await getMediaInsights();

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: result.status, headers: NO_STORE_HEADERS });
  }

  return NextResponse.json(result.data, { headers: NO_STORE_HEADERS });
}
