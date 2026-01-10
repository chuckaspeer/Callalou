import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/Section";

export function HomeHero() {
  return (
    <Section className="gap-12 py-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
            Multifamily Real Estate Investing with Purpose
          </h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Building quality housing portfolios while creating lasting community impact. We invest in multifamily properties that provide stability, dignity, and opportunity for residents while delivering value for investors.
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
              <p className="text-sm font-medium text-slate-500">Investment Approach</p>
              <p className="text-lg font-semibold text-slate-900">Value-Add & Stabilized</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/contact?type=investor"
              className="rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700"
            >
              Explore Investment Opportunities
            </Link>
            <Link
              href="/portfolio"
              className="rounded-full border border-slate-300 px-6 py-3 text-slate-900 transition hover:border-slate-900"
            >
              View Portfolio
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src="/images/brand/Cincinnati-skyline.jpg"
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

