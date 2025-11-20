import { Section } from "@/components/layout/Section";

const reasons = [
  {
    title: "Home is identity infrastructure",
    copy: "Stable housing and rooted public space unlock civic engagement, healthy families, and wealth transfer.",
  },
  {
    title: "Belonging multiplies returns",
    copy: "Teams who lead with cultural fluency move faster, retain talent, and build defensible customer love.",
  },
  {
    title: "Narratives shape capital flows",
    copy: "When we shift who tells the story, we shift who attracts capital, partnerships, and policy wins.",
  },
];

export function HomeWhyHomeMatters() {
  return (
    <Section background="contrast" className="rounded-3xl shadow-lg">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">
          Why Home Matters
        </p>
        <h2 className="text-3xl font-semibold">
          Home is more than place—it is the operating system for equitable
          futures.
        </h2>
        <p className="max-w-3xl text-white/80">
          We back founders who redesign how people access safety, wealth, and
          self-determination. These investments compound across generations and
          geographies.
        </p>
      </div>
      <div className="grid gap-6 pt-6 md:grid-cols-3">
        {reasons.map((reason) => (
          <div key={reason.title} className="rounded-2xl bg-white/10 p-6">
            <h3 className="text-xl font-semibold">{reason.title}</h3>
            <p className="mt-3 text-sm text-white/80">{reason.copy}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

