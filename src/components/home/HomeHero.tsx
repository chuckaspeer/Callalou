import Link from "next/link";
import { Section } from "@/components/layout/Section";

export function HomeHero() {
  return (
    <Section className="gap-12 py-24">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Impact x Story x Capital
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
          Invest in a future where everyone has a place to belong.
        </h1>
        <p className="max-w-3xl text-lg text-slate-600">
          Callalou Ventures partners with founders shaping culture, housing, and
          community outcomes for the New Majority. We pair narrative strategy
          with catalytic capital to accelerate people-first innovation.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/contact"
            className="rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700"
          >
            Start a conversation
          </Link>
          <Link
            href="/callalou"
            className="rounded-full border border-slate-300 px-6 py-3 text-slate-900 transition hover:border-slate-900"
          >
            Explore Callalou Ventures
          </Link>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-3">
        {[
          {
            label: "Portfolio conviction themes",
            value: "Belonging, Home, Culture",
          },
          {
            label: "Guiding mantra",
            value: "From Antigua to Opportunity",
          },
          {
            label: "Investment stage",
            value: "Early + community-driven",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-sm"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
              {stat.label}
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

