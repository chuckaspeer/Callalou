import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { CTAButton } from "@/components/ui/CTAButton";

export const metadata: Metadata = {
  title: "Founder Letter",
  description:
    "Emil Brown's story and leadership philosophy: from Antigua to building Callaloo Ventures with purpose and stewardship.",
};

export default function FounderLetterPage() {
  return (
    <div className="space-y-16">
      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              Founder Letter
            </p>
            <h1 className="text-4xl font-semibold text-slate-900">
              From Antigua to building home
            </h1>
            <p className="text-lg text-slate-600">
              Emil Brown carries the spirit of Antigua&apos;s marketplaces into
              every boardroom. Raised by multigenerational matriarchs, he learned
              early that community comes first. After immigrating to Cincinnati,
              Emil blended creative strategy, civic innovation, and venture
              experience to serve underestimated founders.
            </p>
            <p className="text-slate-600">
              Callaloo Ventures is Emil&apos;s instrument for returning abundance
              to the people who rarely receive it. He is equal parts cultural
              anthropologist and capital strategist — helping operators
              metabolize lived experience into durable companies that honor home.
            </p>
          </div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <Image
              src="/images/brand/HeadShot.jpg"
              alt="Emil Brown - Founder of Callaloo Ventures"
              fill
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
        </div>
      </Section>
      <Section>
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Burn the Boats: A leadership principle
          </h2>
          <p className="max-w-3xl text-slate-600">
            &quot;Burn the Boats&quot; represents a leadership principle that
            guides how we approach multifamily real estate: a commitment to bold
            action, decisive leadership, and full belief in the path ahead. This
            philosophy informs our operational decisions. We move forward with
            conviction, clarity, and purpose — not through reckless risk, but
            through thorough preparation, disciplined execution, and strategic
            commitment.
          </p>
        </div>
      </Section>
      <Section background="muted" className="rounded-3xl">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-slate-600">
            Start a private dialogue with our team.
          </p>
          <CTAButton variant="primary" />
        </div>
      </Section>
    </div>
  );
}
