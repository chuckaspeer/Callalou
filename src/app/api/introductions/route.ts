import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const INSIGHTS_SCRIPT_URL = process.env.INSIGHTS_SCRIPT_URL;
const INSIGHTS_SCRIPT_SECRET = process.env.INSIGHTS_SCRIPT_SECRET;

const HUBSPOT_CONTACTS_API = "https://api.hubapi.com/crm/v3/objects/contacts";

if (process.env.NODE_ENV !== "production") {
  console.log("[introductions route] INSIGHTS_SCRIPT_URL present:", Boolean(INSIGHTS_SCRIPT_URL));
  console.log("[introductions route] INSIGHTS_SCRIPT_SECRET present:", Boolean(INSIGHTS_SCRIPT_SECRET));
  // Don't print the actual values, just presence.
}

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

function splitFullName(fullName: string): { firstname: string; lastname: string } {
  const trimmed = fullName.trim();
  const space = trimmed.indexOf(" ");
  if (space === -1) {
    return { firstname: trimmed, lastname: "" };
  }
  return {
    firstname: trimmed.slice(0, space).trim(),
    lastname: trimmed.slice(space + 1).trim(),
  };
}

/** Trim; returns undefined if missing or blank after trim. */
function trimString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const t = value.trim();
  return t.length ? t : undefined;
}

type IntroductionPayload = {
  full_name?: unknown;
  email?: unknown;
  phone?: unknown;
  investor_profile?: unknown;
  accredited_status?: unknown;
  experience?: unknown;
  commitment_range?: unknown;
  interests?: unknown;
  referral_source?: unknown;
  source?: unknown;
};

/** Safe fields from HubSpot error JSON for logs (no tokens, bodies, or PII). */
function hubSpotErrorDetailsForLog(data: unknown): Record<string, unknown> | undefined {
  if (!data || typeof data !== "object") return undefined;
  const o = data as Record<string, unknown>;
  const out: Record<string, unknown> = {};
  if (typeof o.message === "string") out.message = o.message;
  if (typeof o.category === "string") out.category = o.category;
  if (typeof o.subCategory === "string") out.subCategory = o.subCategory;
  if (typeof o.correlationId === "string") out.correlationId = o.correlationId;
  if (typeof o.status === "string") out.status = o.status;
  if (Array.isArray(o.errors)) out.validationErrorCount = o.errors.length;
  return Object.keys(out).length ? out : undefined;
}

function logHubSpotFailure(
  stage: "create" | "search" | "patch" | "unexpected",
  context: { status?: number; message: string; hubSpotBody?: unknown }
): void {
  console.error("[introductions] HubSpot failure", {
    stage,
    httpStatus: context.status,
    message: context.message,
    ...(context.hubSpotBody !== undefined
      ? { details: hubSpotErrorDetailsForLog(context.hubSpotBody) }
      : {}),
  });
}

function hubspotPropertiesFromBody(body: IntroductionPayload): Record<string, string> | NextResponse {
  const emailRaw = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const fullNameRaw = typeof body.full_name === "string" ? body.full_name.trim() : "";

  if (!emailRaw) {
    return NextResponse.json(
      { ok: false, error: { code: "BAD_REQUEST", message: "email is required" } },
      { status: 400 }
    );
  }
  if (!fullNameRaw) {
    return NextResponse.json(
      { ok: false, error: { code: "BAD_REQUEST", message: "full_name is required" } },
      { status: 400 }
    );
  }

  const { firstname, lastname } = splitFullName(fullNameRaw);

  const properties: Record<string, string> = {
    email: emailRaw,
    firstname,
    lastname,
  };

  const optional = {
    phone: trimString(body.phone),
    investor_profile: trimString(body.investor_profile),
    accredited_status: trimString(body.accredited_status),
    experience: trimString(body.experience),
    commitment_range: trimString(body.commitment_range),
    interests: trimString(body.interests),
    referral_source: trimString(body.referral_source),
    source_detail: trimString(body.source),
  } as const;

  for (const [key, val] of Object.entries(optional)) {
    if (val !== undefined) properties[key] = val;
  }

  return properties;
}

async function hubspotJson(
  accessToken: string,
  url: string,
  init: RequestInit
): Promise<{ res: Response; data: unknown }> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(init.headers as Record<string, string> | undefined),
    },
  });
  const text = await res.text();
  let data: unknown = {};
  if (text) {
    try {
      data = JSON.parse(text) as unknown;
    } catch {
      data = {};
    }
  }
  return { res, data };
}

function hubspotErrorMessage(data: unknown, fallback: string): string {
  if (data && typeof data === "object" && "message" in data && typeof (data as { message: unknown }).message === "string") {
    return (data as { message: string }).message;
  }
  return fallback;
}

export async function POST(request: Request) {
  const token = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!token) {
    return NextResponse.json(
      { ok: false, error: { code: "CONFIG", message: "HUBSPOT_ACCESS_TOKEN missing" } },
      { status: 503 }
    );
  }

  let body: IntroductionPayload;
  try {
    body = (await request.json()) as IntroductionPayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "BAD_REQUEST", message: "Invalid JSON" } },
      { status: 400 }
    );
  }

  const propertiesOrResponse = hubspotPropertiesFromBody(body);
  if (propertiesOrResponse instanceof NextResponse) {
    return propertiesOrResponse;
  }
  const properties = propertiesOrResponse;

  const payload = { properties };

  try {
    const create = await hubspotJson(token, HUBSPOT_CONTACTS_API, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (create.res.ok) {
      return NextResponse.json({ ok: true });
    }

    const createMessage = hubspotErrorMessage(create.data, "HubSpot create failed");
    logHubSpotFailure("create", {
      status: create.res.status,
      message: createMessage,
      hubSpotBody: create.data,
    });

    const search = await hubspotJson(token, `${HUBSPOT_CONTACTS_API}/search`, {
      method: "POST",
      body: JSON.stringify({
        filterGroups: [
          {
            filters: [{ propertyName: "email", operator: "EQ", value: properties.email }],
          },
        ],
        properties: ["email"],
        limit: 1,
      }),
    });

    if (!search.res.ok) {
      logHubSpotFailure("search", {
        status: search.res.status,
        message: hubspotErrorMessage(search.data, "HubSpot contact search failed"),
        hubSpotBody: search.data,
      });
      return NextResponse.json(
        { ok: false, error: { code: "UPSTREAM", message: createMessage } },
        { status: create.res.status >= 400 ? create.res.status : 502 }
      );
    }

    const results =
      search.data &&
      typeof search.data === "object" &&
      "results" in search.data &&
      Array.isArray((search.data as { results: unknown }).results)
        ? (search.data as { results: { id?: string }[] }).results
        : [];

    const id = results[0]?.id;
    if (!id) {
      return NextResponse.json(
        { ok: false, error: { code: "UPSTREAM", message: createMessage } },
        { status: create.res.status >= 400 ? create.res.status : 502 }
      );
    }

    const patch = await hubspotJson(token, `${HUBSPOT_CONTACTS_API}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    });

    if (!patch.res.ok) {
      const patchMessage = hubspotErrorMessage(patch.data, "HubSpot update failed");
      logHubSpotFailure("patch", {
        status: patch.res.status,
        message: patchMessage,
        hubSpotBody: patch.data,
      });
      return NextResponse.json(
        { ok: false, error: { code: "UPSTREAM", message: patchMessage } },
        { status: patch.res.status >= 400 ? patch.res.status : 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    logHubSpotFailure("unexpected", {
      message: err instanceof Error ? err.message : "HubSpot request failed",
    });
    return NextResponse.json(
      { ok: false, error: { code: "UPSTREAM", message: "HubSpot request failed" } },
      { status: 502 }
    );
  }
}
