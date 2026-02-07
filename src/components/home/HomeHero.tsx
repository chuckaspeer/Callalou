import Image from "next/image";
import { Section } from "@/components/layout/Section";
import { TrackedLink } from "@/components/layout/TrackedLink";

export function HomeHero() {
  return (
    <Section className="gap-12 py-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            A Thoughtful Approach to Multifamily Real Estate Investing
          </h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Multifamily isn&apos;t about chasing deals. It&apos;s about disciplined decisions that compound over time. Callaloo Ventures approaches real estate with a long-term lens — grounded in experience, operational understanding, and the belief that stable housing is foundational to thriving communities and durable outcomes.
          </p>
          <p className="max-w-3xl text-base text-slate-500">
            Underwriting standards + transparency trail published weekly.
          </p>
          <div className="grid gap-4 sm:grid-cols-3 pt-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Portfolio Focus</p>
              <p className="text-lg font-semibold text-slate-900">Multifamily Properties</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Primary Market</p>
              <p className="text-lg font-semibold text-slate-900">Cincinnati</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-slate-500">Approach</p>
              <p className="text-lg font-semibold text-slate-900">Value-Add & Stabilized</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <TrackedLink
              href="/media"
              event="click_explore_thinking"
              className="rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700"
            >
              Explore thinking
            </TrackedLink>
            <TrackedLink
              href="/contact"
              event="click_request_private_introduction"
              className="rounded-full border border-slate-300 px-6 py-3 text-slate-900 transition hover:border-slate-900"
            >
              Request private introduction
            </TrackedLink>
          </div>
          <p className="pt-2 text-xs text-slate-400 tracking-wide">
            Standards • Stress Tests • Stewardship Notes
          </p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src="/images/brand/Cincy-Pano-Pic1.jpg"
            alt="Callaloo Ventures property - a welcoming home with cityscape view"
            fill
            className="object-cover"
            priority
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      </div>
    </Section>
  );
}

