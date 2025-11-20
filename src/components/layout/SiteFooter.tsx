import Link from "next/link";
import { ComplianceNotice } from "./ComplianceNotice";

const quickLinks = [
  { href: "/about", label: "About Emil" },
  { href: "/callalou", label: "Callalou Ventures" },
  { href: "/philosophy", label: "Philosophy" },
  { href: "/content", label: "Content" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
            Callalou Ventures
          </p>
          <h3 className="text-2xl font-semibold">
            Investing in a future where everyone has a place to belong.
          </h3>
          <p className="text-sm text-slate-300">
            Story-first capital, cultural intelligence, and patient conviction
            for underrepresented operators building enduring communities.
          </p>
          <div className="flex gap-4 text-sm text-slate-300">
            <Link href="mailto:hello@callalouventures.com">
              hello@callalouventures.com
            </Link>
            <span>•</span>
            <p>New York &amp; Antigua</p>
          </div>
        </div>
        <div className="space-y-3 text-sm text-slate-300">
          <p className="font-medium text-slate-100">Quick links</p>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-10">
          <ComplianceNotice />
          <p className="mt-6 text-xs uppercase tracking-[0.2em] text-slate-500">
            © {new Date().getFullYear()} Callalou Ventures. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

