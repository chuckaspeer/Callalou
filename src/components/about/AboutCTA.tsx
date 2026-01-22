import Link from "next/link";
import { Section } from "@/components/layout/Section";

export function AboutCTA() {
  return (
    <Section background="muted" className="rounded-3xl shadow-sm">
      <div className="space-y-6 text-center">
        <h2 className="text-3xl font-semibold text-slate-900">
          Continue the Conversation
        </h2>
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          Explore insights and commentary in the Media hub — or subscribe for occasional updates. Measured perspectives. Built to last.
        </p>
        <div className="pt-4 flex flex-wrap gap-4 justify-center">
          <Link
            href="/media"
            className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700"
          >
            Explore Media
          </Link>
          <Link
            href="/contact?type=investor"
            className="inline-flex rounded-full border border-slate-300 px-6 py-3 text-slate-900 transition hover:border-slate-900"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </Section>
  );
}
