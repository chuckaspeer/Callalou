import { Section } from "@/components/layout/Section";

export function HomeEmilIntro() {
  return (
    <Section background="muted" className="rounded-3xl shadow-sm">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            From Antigua to Opportunity
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Emil&apos;s story proves that belonging is an investable edge.
          </h2>
          <p className="text-slate-600">
            Raised in Antigua and forged in the boroughs of New York, Emil
            Calderon built Callalou Ventures to close the gap between visionary
            operators and culturally rooted capital. He bridges global diaspora
            insight with institutional rigor to unlock generational ownership.
          </p>
          <p className="text-slate-600">
            Emil brings 15+ years across venture, philanthropy, and creative
            strategy to help founders translate lived experience into scalable,
            durable businesses.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Years building community-first platforms", value: "15+" },
            { label: "Diaspora networks activated", value: "30+" },
            {
              label: "Capital stewarded across ecosystems",
              value: "$150M+",
            },
            { label: "Favorite reminder", value: "Culture is asset class" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white/90 p-4"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                {item.label}
              </p>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

