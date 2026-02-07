import { Section } from "@/components/layout/Section";

const principles = [
  { name: "Stewardship", line: "Capital and community over short-term gain." },
  { name: "Patience", line: "Time horizon and discipline over speed." },
  { name: "Transparency", line: "Explicit standards and a published trail." },
  { name: "Margin of Safety", line: "Downside clarity before upside." },
  { name: "Alignment", line: "Structures that favor durability." },
];

export function PrinciplesStrip() {
  return (
    <Section background="muted" className="rounded-2xl py-10">
      <div className="flex flex-wrap items-baseline justify-center gap-x-8 gap-y-6 text-center sm:justify-between sm:gap-x-12">
        {principles.map((p) => (
          <div key={p.name} className="min-w-0 max-w-[12rem] sm:max-w-[14rem]">
            <p className="text-sm font-medium text-slate-900">{p.name}</p>
            <p className="mt-0.5 text-xs text-slate-600">{p.line}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
