import { Section } from "@/components/layout/Section";

const videos = [
  {
    title: "Designing Home for the Hustle",
    length: "12 min",
    tag: "Mini talk",
  },
  {
    title: "Belonging Field Notes: Antigua Edition",
    length: "8 min",
    tag: "Travel log",
  },
  {
    title: "Burn the Boats: Founder Office Hours",
    length: "15 min",
    tag: "Workshop",
  },
];

export function VideoGrid() {
  return (
    <Section className="pt-0">
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Video Series
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Visual stories from the field.
        </h2>
      </div>
      <div className="grid gap-6 pt-6 md:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.title}
            className="space-y-3 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm"
          >
            <div className="rounded-2xl bg-slate-900/90 p-8 text-white">
              <p className="text-sm uppercase tracking-[0.3em] text-white/70">
                {video.tag}
              </p>
              <p className="mt-3 text-xl font-semibold">{video.title}</p>
              <p className="mt-2 text-sm text-white/60">{video.length}</p>
            </div>
            <button className="text-left text-sm font-semibold text-slate-900">
              Watch trailer →
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}

