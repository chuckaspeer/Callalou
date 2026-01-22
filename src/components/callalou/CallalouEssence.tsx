import Image from "next/image";
import { Section } from "@/components/layout/Section";

export function CallalouEssence() {
  return (
    <Section>
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Brand Essence
        </p>
        <div className="flex items-center gap-4">
          <Image
            src="/images/brand/newCallalooTranslogo.png"
            alt="Callaloo Ventures logo"
            width={64}
            height={64}
            className="h-24 w-24 object-contain"
          />
          <h1 className="text-4xl font-semibold text-slate-900">
            Callaloo Ventures: The credible, structured, investable entity.
          </h1>
        </div>
        <div className="max-w-3xl space-y-4 text-lg text-slate-600">
          <p>
            &quot;Callaloo&quot; instantly signals Caribbean roots without cliché. It evokes nourishment, home, warmth, and cultural identity. It&apos;s memorable, ownable, and emotionally resonant — perfect for attracting value-driven investors.
          </p>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Brand Promise
            </p>
            <p className="mt-2 text-xl font-semibold italic text-slate-900">
              &quot;Your investment helps give someone else a place to belong — while building wealth for your future.&quot;
            </p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 pt-8 md:grid-cols-3">
        {[
          {
            id: "essence-themes",
            title: "Core Themes",
            copy: "Home • Dignity • Stability • Growth • Community • Forward Momentum",
          },
          {
            id: "essence-personality",
            title: "Brand Personality",
            copy: "Warm, intentional, principled, ambitious, rooted in heritage",
          },
          {
            id: "essence-positioning",
            title: "Positioning",
            copy: "The purpose-driven, heritage-rooted alternative to traditional real estate investors",
          },
        ].map((item) => (
          <div
            key={item.id}
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

