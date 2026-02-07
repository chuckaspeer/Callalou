import { Section } from "@/components/layout/Section";

const cards = [
  {
    title: "Reporting cadence",
    body: "Clear reporting expectations designed for calm periods and difficult ones.",
  },
  {
    title: "Downside-first",
    body: "Stress tests prioritize leverage, operating assumptions, and liquidity before upside.",
  },
  {
    title: "Alignment",
    body: "Structures favor stewardship and durability over speed.",
  },
];

export function ProofOfSeriousness() {
  return (
    <Section className="pt-0">
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-xl border border-slate-200 bg-white/80 p-4 text-slate-700"
          >
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
              {card.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{card.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
