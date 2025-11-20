import { Section } from "@/components/layout/Section";

export function ContactForm() {
  return (
    <Section background="muted" className="rounded-3xl shadow-inner">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Contact
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Let&apos;s build home together.
          </h1>
          <p className="text-slate-600">
            Share your story, deal flow, or collaboration ideas. We respond to
            every note and welcome introductions across the Callalou ecosystem.
          </p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>Email: hello@callalouventures.com</p>
            <p>Social: @callalouventures</p>
            <p>Locations: New York, Antigua, Atlanta</p>
          </div>
        </div>
        <form className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="you@email.com"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="Tell us about your work..."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-700"
          >
            Send note
          </button>
        </form>
      </div>
    </Section>
  );
}

