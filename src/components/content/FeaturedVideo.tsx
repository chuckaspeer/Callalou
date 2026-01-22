import { Section } from "@/components/layout/Section";

export function FeaturedVideo() {
  return (
    <Section>
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold text-slate-900">
          Why Home Matters
        </h2>
        <p className="text-slate-600">
          Housing is more than an asset class. It&apos;s where lives stabilize and communities take shape.
        </p>
      </div>
      <div className="relative mt-6 aspect-video overflow-hidden rounded-3xl border border-slate-200 bg-slate-900">
        <div className="absolute inset-0 grid place-items-center text-center text-white">
          <p className="text-lg font-semibold">▶︎ Watch the video</p>
        </div>
      </div>
    </Section>
  );
}

