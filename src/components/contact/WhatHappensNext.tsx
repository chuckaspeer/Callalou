import { Section } from "@/components/layout/Section";

export function WhatHappensNext() {
  return (
    <Section>
      <div className="space-y-6">
        <h2 className="text-3xl font-semibold text-slate-900">
          What happens next
        </h2>
        <ul className="space-y-3 text-slate-600">
          <li className="flex items-start gap-3">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              ✓
            </span>
            <span>Review (24–48 hours)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              ✓
            </span>
            <span>Short call (fit + objectives)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
              ✓
            </span>
            <span>If appropriate: private materials</span>
          </li>
        </ul>
        <p className="pt-2 text-sm text-slate-500">
          We do not provide deal specifics or performance projections on this website.
        </p>
      </div>
    </Section>
  );
}
