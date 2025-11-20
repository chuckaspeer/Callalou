import { Section } from "@/components/layout/Section";

export function FeaturedVideo() {
  return (
    <Section>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Featured Video
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Why Home Matters Live: Atlanta
        </h2>
        <p className="text-slate-600">
          Emil sits down with community architect Ayanna Moore to unpack how
          creative placemaking, housing cooperatives, and storytelling fuel
          inclusive growth across the American South.
        </p>
      </div>
      <div className="relative mt-6 aspect-video overflow-hidden rounded-3xl border border-slate-200 bg-slate-900">
        <div className="absolute inset-0 grid place-items-center text-center text-white">
          <p className="text-lg font-semibold">Video placeholder</p>
          <p className="text-sm text-white/70">
            Embed upcoming Vimeo/YouTube asset here.
          </p>
        </div>
      </div>
    </Section>
  );
}

