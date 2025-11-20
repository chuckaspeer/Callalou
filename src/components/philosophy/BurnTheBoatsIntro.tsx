import { Section } from "@/components/layout/Section";

export function BurnTheBoatsIntro() {
  return (
    <Section>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Burn the Boats
        </p>
        <h1 className="text-4xl font-semibold text-slate-900">
          We commit fully, because our communities cannot afford half-measures.
        </h1>
        <p className="text-lg text-slate-600">
          The Burn the Boats philosophy invites founders, investors, and
          partners to eliminate the backup plan that dilutes ambition. We honor
          the risk our ancestors took by matching it with focus, discipline, and
          care for those coming after us.
        </p>
      </div>
    </Section>
  );
}

