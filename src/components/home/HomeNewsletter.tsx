import { Section } from "@/components/layout/Section";

export function HomeNewsletter() {
  return (
    <Section background="muted" className="rounded-3xl shadow-inner" padding="lg">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Investor Updates
          </p>
          <h2 className="text-3xl font-semibold text-slate-900">
            Stay Informed on Multifamily Opportunities
          </h2>
          <p className="text-slate-600">
            Join our investor network to receive updates on portfolio performance, market insights, and investment opportunities. Get insights on multifamily real estate trends and operational strategies.
          </p>
        </div>
        <form className="flex w-full flex-col gap-3 md:max-w-md md:flex-row">
          <label htmlFor="newsletter" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter"
            type="email"
            placeholder="you@email.com"
            className="flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-base text-slate-900 outline-none ring-slate-900/10 focus:ring-2"
          />
          <button
            type="submit"
            className="rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700"
          >
            Join
          </button>
        </form>
      </div>
    </Section>
  );
}

