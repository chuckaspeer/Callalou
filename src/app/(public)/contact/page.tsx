import { Suspense } from "react";
import { WhatHappensNext } from "@/components/contact/WhatHappensNext";
import { ContactFormWrapper } from "@/components/contact/ContactFormWrapper";

export default function ContactPage() {
  return (
    <div className="space-y-16">
      <WhatHappensNext />
      <Suspense fallback={<div>Loading...</div>}>
        <ContactFormWrapper />
      </Suspense>
    </div>
  );
}

