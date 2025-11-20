import { Section } from "@/components/layout/Section";

export function CallalouEssence() {
  return (
    <Section>
      <div className="space-y-5">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Brand Essence
        </p>
        <h1 className="text-4xl font-semibold text-slate-900">
          Callalou Ventures is a recipe for belonging.
        </h1>
        <p className="text-lg text-slate-600">
          Like the dish it is named after, Callalou combines bold ingredients:
          diaspora brilliance, institutional know-how, and storycraft. We invest
          in founders designing products that make culture feel like home.
        </p>
      </div>
      <div className="grid gap-6 pt-8 md:grid-cols-3">
        {[
          {
            title: "Promise",
            copy: "Champion founders who make belonging scalable and investable.",
          },
          {
            title: "Posture",
            copy: "Lead with empathy, ship with excellence, and share the mic.",
          },
          {
            title: "Practice",
            copy: "Pair capital with narrative, customer research, and network design.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-slate-900">
              {item.title}
            </h3>
            <p className="mt-3 text-sm text-slate-600">{item.copy}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

