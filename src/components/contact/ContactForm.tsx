"use client";

import { useState } from "react";
import { Section } from "@/components/layout/Section";

interface ContactFormProps {
  defaultInquiryType?: string;
}

export function ContactForm({ defaultInquiryType = "general" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: defaultInquiryType,
    investmentExperience: "",
    accreditedStatus: "",
    investmentInterest: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Section background="muted" className="rounded-3xl shadow-inner">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Contact
          </p>
          <h1 className="text-4xl font-semibold text-slate-900">
            Connect About Investment Opportunities
          </h1>
          <p className="text-slate-600">
            We&apos;ll respond within 24-48 hours to discuss your investment goals, partnership opportunities, or general inquiries.
          </p>
          <div className="space-y-1 text-sm text-slate-600">
            <p>Email: hello@callalouventures.com</p>
            <p>Social: @callalouventures</p>
            <p>Locations: Cincinnati, Antigua, Atlanta</p>
          </div>
        </div>
        <form className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="inquiryType">
              I&apos;m interested in...
            </label>
            <select
              id="inquiryType"
              name="inquiryType"
              value={formData.inquiryType}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
            >
              <option value="investor">Investor</option>
              <option value="partner">Partner</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
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
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="you@email.com"
            />
          </div>
          {formData.inquiryType === "investor" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="investmentExperience">
                  Investment Experience <span className="text-slate-500">(optional)</span>
                </label>
                <select
                  id="investmentExperience"
                  name="investmentExperience"
                  value={formData.investmentExperience}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
                >
                  <option value="">Select experience level</option>
                  <option value="beginner">New to real estate investing</option>
                  <option value="intermediate">Some real estate experience</option>
                  <option value="experienced">Experienced real estate investor</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="accreditedStatus">
                  Accredited Investor Status <span className="text-slate-500">(informational only)</span>
                </label>
                <select
                  id="accreditedStatus"
                  name="accreditedStatus"
                  value={formData.accreditedStatus}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
                >
                  <option value="">Select status</option>
                  <option value="yes">Yes, I am an accredited investor</option>
                  <option value="no">No, I am not an accredited investor</option>
                  <option value="unsure">I&apos;m not sure</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700" htmlFor="investmentInterest">
                  Investment Interest Area <span className="text-slate-500">(optional)</span>
                </label>
                <input
                  id="investmentInterest"
                  name="investmentInterest"
                  value={formData.investmentInterest}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
                  placeholder="Multifamily, value-add, etc."
                />
              </div>
            </>
          )}
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none ring-slate-900/10 focus:ring-2"
              placeholder="Tell us about your interests..."
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

