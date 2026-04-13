import Link from "next/link";

const COMPLIANCE_TEXT = `Callaloo Ventures provides informational content only. Nothing on this website constitutes investment advice, an offer to sell, or a solicitation of an offer to buy any securities. Any investment opportunity, if any, will be made available only to qualified investors after a substantive relationship has been established and only pursuant to applicable law.`;

const footerLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms" },
  { href: "/private-dialogue", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
              Callaloo Ventures
            </p>
            <p className="text-sm text-slate-300">
              A long-term, operator-led approach to multifamily real estate.
            </p>
            <div className="flex gap-4 text-sm text-slate-300">
              <Link
                href="mailto:hello@callalouventures.com"
                className="transition hover:text-white"
              >
                hello@callalouventures.com
              </Link>
              <span>•</span>
              <span>Cincinnati &amp; Atlanta</span>
            </div>
          </div>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="font-medium text-slate-100">Links</p>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
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
      </div>
      <div className="border-t border-white/10 bg-slate-950">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Compliance Disclosure
            </p>
            <p className="text-xs leading-relaxed text-slate-400">
              {COMPLIANCE_TEXT}
            </p>
          </div>
          <p className="mt-8 text-xs uppercase tracking-[0.2em] text-slate-500">
            © {new Date().getFullYear()} Callaloo Ventures. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
