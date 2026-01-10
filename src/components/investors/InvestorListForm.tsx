"use client";

import { useState } from "react";
import { ComplianceNotice } from "@/components/layout/ComplianceNotice";
import { Section } from "@/components/layout/Section";

export function InvestorListForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    referralSource: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    // TODO: Wire to backend API endpoint
    // For now, log the data
    console.log("Investor List Form Submission:", formData);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitStatus("success");
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ fullName: "", email: "", phone: "", referralSource: "", message: "" });
      setSubmitStatus("idle");
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Section>
      <div className="space-y-8">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Join Investor List
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Connect with Callaloo Ventures
          </h1>
          <p className="max-w-3xl text-lg text-slate-600">
            Join our investor network to receive updates and connect about opportunities. We&apos;ll respond within 24-48 hours to start building a relationship.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-medium text-slate-900"
              >
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-slate-900/10 focus:ring-2"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-900"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-slate-900/10 focus:ring-2"
                placeholder="john@example.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-slate-900"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="(555) 123-4567"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="referralSource"
              className="text-sm font-medium text-slate-900"
            >
              How did you hear about us? <span className="text-slate-500">(optional)</span>
            </label>
            <input
              id="referralSource"
              name="referralSource"
              type="text"
              value={formData.referralSource}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="Friend, website, event, etc."
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-slate-900"
            >
              Message <span className="text-slate-500">(optional)</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="Tell us about your investment interests..."
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed md:w-auto"
          >
            {isSubmitting ? "Submitting..." : "Join Investor List"}
          </button>
          {submitStatus === "success" && (
            <div className="rounded-2xl bg-green-50 border border-green-200 p-4 text-green-800">
              <p className="font-medium">Thank you!</p>
              <p className="text-sm">We&apos;ll respond within 24-48 hours to start building a relationship and discuss next steps.</p>
            </div>
          )}
          </form>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">
                What you&apos;ll receive
              </h2>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    ✓
                  </span>
                  <span>Periodic portfolio and market updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    ✓
                  </span>
                  <span>Access to our investment criteria and approach</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    ✓
                  </span>
                  <span>A relationship-first path to private opportunities</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-slate-900">
                What happens next
              </h2>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    ✓
                  </span>
                  <span>We respond within 24–48 hours.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    ✓
                  </span>
                  <span>We schedule a brief conversation to understand your goals and fit.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    ✓
                  </span>
                  <span>We share a sample of our investment criteria and operating approach.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    ✓
                  </span>
                  <span>If aligned, we continue the relationship and share opportunities privately when appropriate.</span>
                </li>
              </ul>
              <p className="pt-2 text-sm text-slate-500">
                Offerings, if any, are shared privately through appropriate channels and documentation.
              </p>
            </div>
          </div>
        </div>

        <ComplianceNotice />
      </div>
    </Section>
  );
}

