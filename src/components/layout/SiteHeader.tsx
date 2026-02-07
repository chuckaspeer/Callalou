import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/layout/TrackedLink";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/gallery", label: "Gallery" },
  { href: "/media", label: "Media" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/brand/newCallalooTranslogo.png"
            alt="Callaloo Ventures logo"
            width={32}
            height={32}
            className="h-12 w-12 object-contain"
          />
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Callaloo Ventures
          </span>
          <span className="hidden text-sm font-medium text-slate-500 sm:inline">
            Multifamily Real Estate Platform
          </span>
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
          <TrackedLink
            href="/contact"
            event="click_request_private_introduction"
            className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
          >
            Request private introduction
          </TrackedLink>
        </nav>
      </div>
    </header>
  );
}

