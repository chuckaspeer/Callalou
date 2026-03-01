"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";
import { CTA_LABEL, CTA_HREF } from "@/lib/cta";

type Variant = "primary" | "secondary";

interface CTAButtonProps {
  variant?: Variant;
  className?: string;
  event?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700",
  secondary:
    "rounded-full border border-slate-300 px-6 py-3 text-slate-900 transition hover:border-slate-900",
};

export function CTAButton({
  variant = "primary",
  className = "",
  event = "click_cta_begin_private_dialogue",
}: CTAButtonProps) {
  return (
    <Link
      href={CTA_HREF}
      className={`inline-flex font-medium ${variantClasses[variant]} ${className}`.trim()}
      onClick={() => trackEvent(event, { destination: CTA_HREF })}
    >
      {CTA_LABEL}
    </Link>
  );
}
