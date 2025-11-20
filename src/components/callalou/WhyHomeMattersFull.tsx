import { Section } from "@/components/layout/Section";

const pillars = [
  {
    title: "Home is agency",
    description:
      "Secure, culturally grounded housing lets families plan, vote, and invest with a long-term horizon.",
  },
  {
    title: "Home is memory",
    description:
      "When we archive our stories intentionally, we export culture on our own terms.",
  },
  {
    title: "Home is economy",
    description:
      "Belonging infrastructure creates jobs, supply chains, and creative IP that compounds locally.",
  },
];

export function WhyHomeMattersFull() {
  return (
    <Section background="contrast" className="rounded-3xl shadow-lg">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-white/70">
          Why Home Matters
        </p>
        <h2 className="text-3xl font-semibold">
          We invest in ventures that treat home as a strategic asset class.
        </h2>
        <p className="text-white/80">
          Callalou backs platforms that move people from precarious to powerful,
          aligning financial returns with social repair.
        </p>
      </div>
      <div className="grid gap-6 pt-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="rounded-2xl bg-white/10 p-6">
            <h3 className="text-xl font-semibold">{pillar.title}</h3>
            <p className="mt-3 text-sm text-white/80">{pillar.description}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

