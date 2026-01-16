// import { ComplianceNotice } from "@/components/layout/ComplianceNotice";

export function InvestorLoginForm() {
  return (
    <div className="space-y-8 rounded-3xl bg-slate-900/70 p-8 shadow-2xl backdrop-blur">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-white/60">
          Investor Portal
        </p>
        <h1 className="text-3xl font-semibold text-white">
          Access your investor dashboard
        </h1>
        <p className="text-white/80">
          For accredited investors with existing relationships. Two-factor authentication is required for all sessions.
        </p>
      </div>
      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-white/80">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none ring-white/30 placeholder:text-white/60 focus:ring-2"
            placeholder="investor@firm.com"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-white/80"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none ring-white/30 placeholder:text-white/60 focus:ring-2"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-white px-5 py-3 text-slate-900 transition hover:bg-slate-100"
        >
          Sign in
        </button>
        <div className="space-y-2">
          <button
            type="button"
            className="w-full text-sm font-semibold text-white/80 underline-offset-4 hover:underline"
          >
            Request access
          </button>
          <p className="text-xs text-white/60 text-center">
            Don&apos;t have access? <a href="/contact?type=investor" className="underline hover:text-white/80">Contact us to start a conversation</a>
          </p>
        </div>
      </form>
      {/* <ComplianceNotice /> */}
    </div>
  );
}

