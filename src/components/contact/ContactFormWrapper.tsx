"use client";

import { useSearchParams } from "next/navigation";
import { ContactForm } from "./ContactForm";

export function ContactFormWrapper() {
  const searchParams = useSearchParams();
  const inquiryType = searchParams?.get("type") || "general";
  
  return <ContactForm defaultInquiryType={inquiryType} />;
}
