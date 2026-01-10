import { Suspense } from "react";
import { ContactFormWrapper } from "@/components/contact/ContactFormWrapper";

export default function ContactPage() {
  return (
    <div className="space-y-16">
      <Suspense fallback={<div>Loading...</div>}>
        <ContactFormWrapper />
      </Suspense>
    </div>
  );
}

