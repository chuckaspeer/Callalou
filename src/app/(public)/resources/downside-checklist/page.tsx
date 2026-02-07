"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { trackEvent } from "@/lib/analytics";

export default function DownsideChecklistPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent("submit_downside_checklist", { email: email || "(not provided)" });
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.log("[downside-checklist] submit", { email });
    }
    setSubmitted(true);
  };

  return (
    <div className="space-y-16">
      <Section>
        <div className="max-w-2xl space-y-6">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Resource
          </p>
          <h1 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
            The 5-Minute Downside Checklist
          </h1>
          <ul className="list-disc space-y-2 pl-6 text-slate-600">
            <li>The 7 risks I check first</li>
            <li>The 3 assumptions that kill deals</li>
            <li>A simple pass/fail screen you can reuse</li>
          </ul>

          {submitted ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="font-medium text-slate-900">
                Thank you. We&apos;ll send it shortly.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Check your inbox. If you don&apos;t see it, check spam or reach out directly.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6"
            >
              <div className="space-y-2">
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="checklist-email"
                >
                  Email
                </label>
                <input
                  id="checklist-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
                  placeholder="you@email.com"
                />
              </div>
              <p className="text-xs text-slate-500">
                We do not share your information. Communications are informational.
              </p>
              <button
                type="submit"
                className="rounded-full bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-700"
              >
                Send checklist
              </button>
            </form>
          )}
        </div>
      </Section>
    </div>
  );
}
