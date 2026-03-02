import Image from "next/image";
import Link from "next/link";
import { CTAButton } from "@/components/ui/CTAButton";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/insights", label: "Insights" },
  { href: "/our-standard", label: "Our Standard" },
  { href: "/capital-framework", label: "Capital Framework" },
  { href: "/founder-letter", label: "Founder Letter" },
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
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-600 sm:items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
          <CTAButton variant="primary" />
        </nav>
      </div>
    </header>
  );
}
