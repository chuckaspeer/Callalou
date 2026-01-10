import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/layout/Section";

const galleryImages = [
  {
    src: "/images/properties/Kitchen.jpg",
    alt: "Modern kitchen",
    title: "Kitchen",
  },
  {
    src: "/images/properties/bedroom.jpg",
    alt: "Comfortable bedroom",
    title: "Bedroom",
  },
  {
    src: "/images/properties/loft-with-brick-wall.jpg",
    alt: "Living room with brick wall",
    title: "Living Room",
  },
  {
    src: "/images/properties/art-gallery.jpg",
    alt: "Deck or outdoor space",
    title: "Deck",
  },
];

export function GalleryGrid() {
  return (
    <Section>
      <div className="space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          Portfolio Properties
        </p>
        <h2 className="text-3xl font-semibold text-slate-900">
          Quality homes for quality living.
        </h2>
        <p className="text-slate-600">
          Explore our portfolio of thoughtfully designed and well-maintained multifamily properties. Each property reflects our commitment to operational excellence and quality housing standards.
        </p>
      </div>
      <div className="grid gap-6 pt-6 sm:grid-cols-2 md:grid-cols-3">
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity group-hover:opacity-100">
              <h3 className="text-lg font-semibold">{image.title}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="pt-6">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900"
        >
          View Full Portfolio Details →
        </Link>
      </div>
    </Section>
  );
}

