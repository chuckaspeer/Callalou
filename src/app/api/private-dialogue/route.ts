import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT = 2000;
const MAX_SHORT = 200;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName =
      typeof body.fullName === "string" ? body.fullName.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!fullName) {
      return NextResponse.json(
        { message: "Full name is required." },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { message: "Email address is required." },
        { status: 400 }
      );
    }
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const investorProfile =
      typeof body.investorProfile === "string"
        ? body.investorProfile.slice(0, 100)
        : "";
    const accreditedStatus =
      typeof body.accreditedStatus === "string"
        ? body.accreditedStatus.slice(0, 50)
        : "";
    const experience =
      typeof body.experience === "string" ? body.experience.slice(0, 100) : "";
    const commitmentRange =
      typeof body.commitmentRange === "string"
        ? body.commitmentRange.slice(0, 50)
        : "";
    const interests =
      typeof body.interests === "string"
        ? body.interests.slice(0, MAX_TEXT)
        : "";
    const howDidYouHear =
      typeof body.howDidYouHear === "string"
        ? body.howDidYouHear.slice(0, MAX_SHORT)
        : "";

    // Log or send to CRM/email service here. No document delivery.
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log("[private-dialogue]", {
        fullName,
        email,
        investorProfile,
        accreditedStatus,
        experience,
        commitmentRange,
        interests: interests.slice(0, 80) + (interests.length > 80 ? "…" : ""),
        howDidYouHear,
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { message: "Invalid request." },
      { status: 400 }
    );
  }
}
