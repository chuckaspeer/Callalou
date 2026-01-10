import Image from "next/image";
import { Section } from "@/components/layout/Section";

export function HomeEmilIntro() {
  return (
    <Section background="muted" className="rounded-3xl shadow-sm">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Leadership
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Led by Emil Brown: Multifamily Operations with Purpose
          </h2>
          <div className="space-y-4 text-slate-600">
            <p>
              Emil Brown brings deep operational experience in multifamily real estate, with a track record of building quality housing portfolios that serve both investors and communities. His approach combines rigorous property management with a commitment to creating dignified living spaces.
            </p>
            <p>
              Rooted in Caribbean heritage and shaped by values of hospitality and community, Emil&apos;s operational philosophy emphasizes that quality housing is both a sound investment and a foundation for opportunity. This cultural perspective informs how Callaloo Ventures approaches tenant relations, property standards, and community impact.
            </p>
            <p>
              Under Emil&apos;s leadership, Callaloo Ventures focuses on multifamily properties that deliver strong returns while creating lasting value for residents and neighborhoods.
            </p>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
          <Image
            src="/images/brand/Ant-Cin3.jpg"
            alt="Urban Cincinnati scene with brick buildings - representing the journey from Antigua"
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      </div>
    </Section>
  );
}

