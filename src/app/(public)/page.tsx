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
              A thoughtful approach to multifamily real estate
            </h1>
            <p className="max-w-3xl text-lg text-slate-600">
              Multifamily isn&apos;t about chasing deals. It&apos;s about
              disciplined decisions that compound over time. Callaloo Ventures
              approaches real estate with a long-term lens — grounded in
              experience, operational understanding, and the belief that stable
              housing is foundational to thriving communities and durable
              outcomes.
            </p>
            <p className="max-w-3xl text-base text-slate-500">
              Underwriting standards and transparency trail published weekly.
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
            Foundation
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">
            Our underwriting standard
          </h2>
          <p className="max-w-3xl text-slate-600">
            Our standards are explicit and documented. We publish a transparency
            trail weekly so that expectations are clear and behavior is
            auditable. How we evaluate risk, report to stakeholders, and align
            incentives is stated in advance — not after the fact.
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
            Multifamily real estate with purpose
          </h2>
          <p className="max-w-3xl text-slate-600">
            Callaloo Ventures operates with a long-term, operator-led approach to
            multifamily real estate. We focus on quality apartments and
            community impact. Our work centers on properties that offer both
            operational upside and the opportunity to strengthen the communities
            they serve.
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
              title: "Reporting cadence",
              body: "Clear reporting expectations designed for calm periods and difficult ones.",
            },
            {
              title: "Downside-first",
              body: "Stress tests prioritize leverage, operating assumptions, and liquidity before upside.",
            },
            {
              title: "Alignment",
              body: "Structures favor stewardship and durability over speed.",
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
            Who we align with
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Relationship-first, aligned by design
          </h2>
          <p className="max-w-3xl text-slate-600">
            We do not advertise deals publicly. Any substantive discussion is
            shared only after a relationship has been established and only
            pursuant to applicable law. If you share our focus on
            stewardship, transparency, and long-term value, we welcome a
            conversation.
          </p>
          <CTAButton variant="primary" />
        </div>
      </Section>
    </div>
  );
}
