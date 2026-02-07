"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/analytics";

interface TrackedLinkProps {
  href: string;
  event: string;
  eventProps?: Record<string, string>;
  className?: string;
  children: React.ReactNode;
}

export function TrackedLink({
  href,
  event,
  eventProps,
  className,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackEvent(event, eventProps)}
    >
      {children}
    </Link>
  );
}
