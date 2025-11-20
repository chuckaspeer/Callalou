import { Section } from "@/components/layout/Section";

const values = [
  {
    title: "Belonging over bureaucracy",
    copy: "We measure success by the rooms we open, not the rooms we keep people out of.",
  },
  {
    title: "Narrative stewardship",
    copy: "Stories sourced from the block deserve the same rigor as Wall Street memos.",
  },
  {
    title: "Abundance mindset",
    copy: "We invest in people as whole humans and expect prosperity to ripple.",
  },
];

export function EmilValues() {
  return (
    <Section background="muted" className="rounded-3xl shadow-inner">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Leadership Values
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Principles that shape every partnership.
        </h2>
      </div>
      <div className="grid gap-6 pt-6 md:grid-cols-3">
        {values.map((value) => (
          <div
            key={value.title}
            className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              {value.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600">{value.copy}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

