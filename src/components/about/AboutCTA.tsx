import Link from "next/link";
import { Section } from "@/components/layout/Section";

export function AboutCTA() {
  return (
    <Section background="muted" className="rounded-3xl shadow-sm">
      <div className="space-y-6 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">
          Interested in investing alongside us?
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          Start a conversation to learn how we operate and whether we&apos;re a fit.
        </p>
        <div className="pt-4">
          <Link
            href="/contact?type=investor"
            className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700"
          >
            Invest With Us
          </Link>
        </div>
      </div>
    </Section>
  );
}
