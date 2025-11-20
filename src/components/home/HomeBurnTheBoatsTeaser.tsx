import Link from "next/link";
import { Section } from "@/components/layout/Section";

export function HomeBurnTheBoatsTeaser() {
  return (
    <Section className="rounded-3xl border border-slate-200 bg-white py-16 shadow-sm">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Burn the Boats
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Conviction looks like refusing to keep a return ticket.
          </h2>
          <p className="text-slate-600">
            Our philosophy is simple: when you burn the boats you commit to the
            bold path forward. We work with founders who channel that same
            resolve—no hedging, no tourist capital, just relentless belief in
            the communities we serve.
          </p>
        </div>
        <div className="space-y-4 rounded-2xl bg-slate-50 p-6 text-slate-700">
          <p className="font-semibold text-slate-900">
            How it shows up in our work:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-sm">
            <li>Hands-on narrative strategy and go-to-community design.</li>
            <li>
              Patient, values-aligned capital that honors founder wellbeing.
            </li>
            <li>
              Operator guilds that turn shared experience into unfair
              advantages.
            </li>
          </ul>
          <Link
            href="/philosophy"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
          >
            Explore the philosophy →
          </Link>
        </div>
      </div>
    </Section>
  );
}

