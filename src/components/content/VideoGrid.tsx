import { Section } from "@/components/layout/Section";

const videos = [
  {
    id: "video-origin-story",
    title: "From Antigua to Opportunity: The Emil Brown Story",
    length: "12 min",
    tag: "Origin Story",
  },
  {
    id: "video-philosophy",
    title: "Burn the Boats: Building Wealth with Purpose",
    length: "15 min",
    tag: "Philosophy",
  },
  {
    id: "video-mission",
    title: "Why Home Matters: Creating Dignity Through Housing",
    length: "10 min",
    tag: "Mission",
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
          Visual stories: From Antigua to Cincinnati, building wealth with purpose.
        </h2>
      </div>
      <div className="grid gap-6 pt-6 md:grid-cols-3">
        {videos.map((video) => (
          <div
            key={video.id}
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

