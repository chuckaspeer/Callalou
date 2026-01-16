import Image from "next/image";
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
            Emil Brown carries the spirit of Antigua&apos;s marketplaces into
            every boardroom. Raised by multigenerational matriarchs, he learned
            early that community is the first investor. After immigrating to Cincinnati, Emil blended creative strategy, civic innovation, and venture
            experience to serve underestimated founders.
          </p>
          <p className="text-slate-600">
            Callaloo Ventures is Emil&apos;s instrument for returning abundance
            to the people who rarely receive it. He is equal parts cultural
            anthropologist and capital strategist—helping operators metabolize
            lived experience into durable companies that honor home.
          </p>
        </div>
        <div className="space-y-6">
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
      </div>
    </Section>
  );
}

