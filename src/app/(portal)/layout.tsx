import Link from "next/link";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/70">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6">
          <Link href="/" className="text-lg font-semibold text-white">
            Callalou Ventures
          </Link>
          <p className="text-sm text-white/70">Secure Investor Workspace</p>
        </div>
      </header>
      <main className="mx-auto flex max-w-5xl justify-center px-6 py-16">
        {children}
      </main>
    </div>
  );
}

