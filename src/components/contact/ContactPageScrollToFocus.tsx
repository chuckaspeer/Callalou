"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * On /contact, when focus=downside-checklist is in the query, scroll to the
 * checklist section after mount. Works on first navigation and on refresh.
 */
export function ContactPageScrollToFocus() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const focus = searchParams?.get("focus");
    if (focus !== "downside-checklist") return;

    const el = document.getElementById("downside-checklist");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchParams]);

  return null;
}
