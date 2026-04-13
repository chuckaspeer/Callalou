import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { CTAButton } from "@/components/ui/CTAButton";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <Section className="gap-12 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
              U.S. Multifamily Investing Built on Capital Discipline
            </h1>
            <p className="max-w-3xl text-lg text-slate-600">
              We focus on durable cash flow, conservative leverage, and operational
              execution across market cycles.
            </p>
            <p className="max-w-3xl text-base text-slate-500">
              We do not chase projected returns through structurally weak deals;
              capital is preserved first, then compounded deliberately across
              cycles.
            </p>
            <div className="grid gap-4 pt-4 sm:grid-cols-3">
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">
                  Portfolio focus
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  Multifamily properties
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">
                  Primary market
                </p>
                <p className="text-lg font-semibold text-slate-900">
                  Cincinnati
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-slate-500">Approach</p>
                <p className="text-lg font-semibold text-slate-900">
                  Value-add & stabilized
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
              <CTAButton variant="primary" />
            </div>
            <p className="max-w-3xl text-sm text-slate-500">
              We build substantive relationships before discussing specific
              opportunities.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/images/brand/Cincy-Pano-Pic1.jpg"
              alt="Callaloo Ventures — a welcoming home with cityscape view"
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        </div>
      </Section>

      {/* FOUNDATION */}
      <Section>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Investment approach
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Our Capital Framework
          </h2>
          <p className="max-w-3xl text-slate-600">
            We approach multifamily investing through a disciplined framework
            grounded in capital preservation and operational performance.
          </p>
          <p className="max-w-3xl text-slate-600">
            Every opportunity is evaluated through downside protection,
            structural integrity, and alignment across the capital stack.
          </p>
          <p className="max-w-3xl text-slate-600">
            Cash flow is prioritized. Leverage is applied conservatively.
            Decisions are made with full-cycle performance in mind.
          </p>
        </div>
      </Section>

      {/* PLATFORM OVERVIEW */}
      <Section background="muted" className="rounded-3xl">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Platform overview
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Operational Discipline
          </h2>
          <p className="max-w-3xl text-slate-600">
            Multifamily assets are operating businesses.
          </p>
          <p className="max-w-3xl text-slate-600">
            Performance is driven by execution: expense control, revenue
            management, and consistent asset oversight.
          </p>
          <p className="max-w-3xl text-slate-600">
            We prioritize margin integrity, structured capital deployment, and
            systems that sustain performance through changing market conditions.
          </p>
          <p className="max-w-3xl text-slate-600">
            Emil Brown is an investor focused on multifamily real estate through
            the lens of capital discipline and operational performance.
          </p>
          <p className="max-w-3xl text-slate-600">
            His background in accounting and operational leadership informs a
            disciplined approach centered on capital protection, margin control,
            and long-term asset stewardship.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/our-standard"
              className="text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 transition hover:text-slate-900"
            >
              Our standard →
            </Link>
            <Link
              href="/capital-framework"
              className="text-sm font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 transition hover:text-slate-900"
            >
              Capital framework →
            </Link>
          </div>
        </div>
      </Section>

      {/* STRATEGIC DEVELOPMENT */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              title: "Market & asset fundamentals",
              body: "Population trends, employment diversity, and supply constraints are assessed to determine long-term demand stability. Basis relative to replacement cost, rent sustainability, and physical durability guide acquisition decisions.",
            },
            {
              title: "Capital structure",
              body: "Conservative leverage, fixed-rate debt preference, and liquidity reserves are central to risk management.",
            },
            {
              title: "Operator alignment",
              body: "Track record, capital commitment, and reporting transparency determine long-term partnership alignment.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-slate-200 bg-white/80 p-4 text-slate-700"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                {card.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHO WE ALIGN WITH */}
      <Section background="muted" className="rounded-3xl">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Private dialogue
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Begin a Private Dialogue
          </h2>
          <p className="max-w-3xl text-slate-600">
            We engage with a limited number of investors who value discipline,
            transparency, and long-term alignment.
          </p>
          <p className="max-w-3xl text-slate-600">
            Discussions begin with understanding objectives before any
            consideration of specific investments.
          </p>
          <CTAButton variant="primary" />
          <p className="max-w-3xl text-sm text-slate-500">
            We build substantive relationships before discussing specific
            opportunities.
          </p>
        </div>
      </Section>
    </div>
  );
}
