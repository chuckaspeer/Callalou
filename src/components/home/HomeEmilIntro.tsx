import Image from "next/image";
import { Section } from "@/components/layout/Section";

export function HomeEmilIntro() {
  return (
    <Section background="muted" className="rounded-3xl shadow-sm">
      <div className="grid gap-10 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold text-slate-900">
            Built on Experience, Guided by Principles
          </h2>
          <div className="space-y-4 text-slate-600">
            <p>
              Every property tells a story. Every decision carries weight. Callaloo Ventures is shaped by hands-on multifamily experience and a clear set of principles that inform how opportunities are evaluated, teams are built, and assets are stewarded over time.
            </p>
            <p>
              This approach prioritizes:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Patience over urgency</li>
              <li>Clarity over complexity</li>
              <li>Partnership over speculation</li>
            </ul>
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

