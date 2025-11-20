import Link from "next/link";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/callalou", label: "Callalou Ventures" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/content", label: "Content" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-lg font-semibold tracking-tight text-slate-900">
            Callalou Ventures
          </span>
          <span className="hidden text-sm font-medium text-slate-500 sm:inline">
            Investing in belonging
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
          <Link
            href="/portal/login"
            className="rounded-full bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
          >
            Investor Portal
          </Link>
        </nav>
      </div>
    </header>
  );
}

