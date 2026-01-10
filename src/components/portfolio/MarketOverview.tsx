import { Section } from "@/components/layout/Section";

export function MarketOverview() {
  return (
    <Section background="muted" className="rounded-3xl shadow-sm">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Market Focus
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Geographic Markets
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">
              Primary Market: Cincinnati
            </h3>
            <p className="text-slate-600">
              Cincinnati serves as our primary market, where we have deep operational experience and strong local relationships. The city&apos;s stable economy, diverse neighborhoods, and growing demand for quality housing make it an ideal market for multifamily investment.
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-600">
              <li>Established market knowledge and relationships</li>
              <li>Stable economic fundamentals</li>
              <li>Strong demand for quality multifamily housing</li>
              <li>Favorable regulatory environment</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900">
              Strategic Expansion
            </h3>
            <p className="text-slate-600">
              We evaluate additional markets that align with our investment criteria, focusing on areas with strong fundamentals, quality housing demand, and opportunities for value creation.
            </p>
            <p className="text-slate-600">
              Our expansion strategy prioritizes markets where we can apply our operational expertise and maintain our commitment to quality housing standards.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
