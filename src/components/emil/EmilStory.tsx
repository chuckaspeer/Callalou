import { Section } from "@/components/layout/Section";

export function EmilStory() {
  return (
    <Section>
      <div className="grid gap-10 md:grid-cols-2 md:items-start">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Founder Story
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            From Antigua to Opportunity.
          </h1>
          <p className="text-lg text-slate-600">
            Emil Calderon carries the spirit of Antigua&apos;s marketplaces into
            every boardroom. Raised by multigenerational matriarchs, he learned
            early that community is the first investor. After immigrating to New
            York, Emil blended creative strategy, civic innovation, and venture
            experience to serve underestimated founders.
          </p>
          <p className="text-slate-600">
            Callalou Ventures is Emil&apos;s instrument for returning abundance
            to the people who rarely receive it. He is equal parts cultural
            anthropologist and capital strategist—helping operators metabolize
            lived experience into durable companies that honor home.
          </p>
        </div>
        <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">
            Guiding Ingredients
          </h2>
          <ul className="list-disc space-y-2 pl-6 text-sm text-slate-600">
            <li>Radical hospitality as a leadership practice.</li>
            <li>Data storytelling that unlocks institutional capital.</li>
            <li>
              Diaspora bridges between the Caribbean, the U.S., and Africa.
            </li>
            <li>
              Field-proven programs for founders navigating housing and culture
              systems.
            </li>
          </ul>
        </div>
      </div>
    </Section>
  );
}

