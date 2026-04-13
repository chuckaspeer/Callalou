"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";
import { trackEvent } from "@/lib/analytics";

const INVESTOR_PROFILES = [
  "High Net Worth Individual",
  "Family Office",
  "Investment Professional",
  "Other",
] as const;

const ACCREDITED_OPTIONS = ["Yes", "No", "Unsure"] as const;

const EXPERIENCE_OPTIONS = [
  "Passive Real Estate",
  "Direct Business Ownership",
  "Private Equity",
  "First Allocation",
] as const;

const COMMITMENT_RANGES = [
  "$50k–$100k",
  "$100k–$250k",
  "$250k+",
] as const;

interface FormState {
  fullName: string;
  email: string;
  phone: string;
  investorProfile: string;
  accreditedStatus: string;
  experience: string;
  commitmentRange: string;
  interests: string;
  howDidYouHear: string;
}

const initialFormState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  investorProfile: "",
  accreditedStatus: "",
  experience: "",
  commitmentRange: "",
  interests: "",
  howDidYouHear: "",
};

export function PrivateDialogueForm() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setError(null);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName.trim()) {
      setError("Full name is required.");
      return;
    }
    if (!formData.email.trim()) {
      setError("Email address is required.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim() || undefined,
        investor_profile: formData.investorProfile.trim() || undefined,
        accredited_status: formData.accreditedStatus.trim() || undefined,
        experience: formData.experience.trim() || undefined,
        commitment_range: formData.commitmentRange.trim() || undefined,
        interests: formData.interests.trim() || undefined,
        referral_source: formData.howDidYouHear.trim() || undefined,
        source: "private-dialogue",
      };
      const res = await fetch("/api/introductions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: { code?: string; message?: string } };

      if (data?.ok === true) {
        trackEvent("private_dialogue_submitted", { email: formData.email });
        setSubmitted(true);
        return;
      }
      setError(
        (data?.error && typeof data.error.message === "string")
          ? data.error.message
          : "Something went wrong. Please try again."
      );
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <Section background="muted" className="rounded-3xl">
        <div className="mx-auto max-w-xl space-y-4 text-center">
          <h2 className="text-2xl font-semibold text-slate-900">
            Thank you
          </h2>
          <p className="text-slate-600">
            We&apos;ll be in touch within 24–48 hours. This site is informational
            only; we do not send documents or materials by email unless a
            substantive relationship has been established and only pursuant to
            applicable law.
          </p>
        </div>
      </Section>
    );
  }

  return (
    <Section background="muted" className="rounded-3xl shadow-inner">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Private Dialogue
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Request introduction
          </h1>
          <p className="text-slate-600">
            Share your profile and interests. We respond within 24–48 hours to
            discuss fit and next steps. No documents or materials are sent
            automatically.
          </p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>Email: hello@callalouventures.com</p>
            <p>Locations: Cincinnati, Antigua</p>
          </div>
        </div>
        <form
          className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="fullName"
            >
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="Your full name"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="email"
            >
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="you@email.com"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="phone"
            >
              Phone Number <span className="text-slate-500">(optional)</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="(555) 555-5555"
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="investorProfile"
            >
              Investor Profile
            </label>
            <select
              id="investorProfile"
              name="investorProfile"
              value={formData.investorProfile}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
            >
              <option value="">Select</option>
              {INVESTOR_PROFILES.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="accreditedStatus"
            >
              Accredited Investor Status
            </label>
            <select
              id="accreditedStatus"
              name="accreditedStatus"
              value={formData.accreditedStatus}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
            >
              <option value="">Select</option>
              {ACCREDITED_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="experience"
            >
              Experience
            </label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
            >
              <option value="">Select</option>
              {EXPERIENCE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="commitmentRange"
            >
              Typical Commitment Range
            </label>
            <select
              id="commitmentRange"
              name="commitmentRange"
              value={formData.commitmentRange}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
            >
              <option value="">Select</option>
              {COMMITMENT_RANGES.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="interests"
            >
              What interests you about multifamily allocation?
            </label>
            <textarea
              id="interests"
              name="interests"
              rows={4}
              value={formData.interests}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="Share your interests..."
            />
          </div>
          <div className="space-y-2">
            <label
              className="text-sm font-medium text-slate-700"
              htmlFor="howDidYouHear"
            >
              How did you hear about Callaloo Ventures?{" "}
              <span className="text-slate-500">(optional)</span>
            </label>
            <input
              id="howDidYouHear"
              name="howDidYouHear"
              type="text"
              value={formData.howDidYouHear}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="e.g. referral, search, event"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-slate-900 px-5 py-3 font-medium text-white transition hover:bg-slate-700 disabled:opacity-60"
          >
            {isSubmitting ? "Sending…" : "Request Introduction"}
          </button>
          <p className="text-xs text-slate-500">
            This site is informational only. We do not share your information
            with third parties for marketing. Communications are confidential
            and do not constitute advice, an offer, or a solicitation.
          </p>
        </form>
      </div>
    </Section>
  );
}
