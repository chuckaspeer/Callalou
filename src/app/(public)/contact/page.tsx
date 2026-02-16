import { Suspense } from "react";
import { WhatHappensNext } from "@/components/contact/WhatHappensNext";
import { ContactFormWrapper } from "@/components/contact/ContactFormWrapper";
import { DownsideChecklistSection } from "@/components/contact/DownsideChecklistSection";
import { ContactPageScrollToFocus } from "@/components/contact/ContactPageScrollToFocus";

export default function ContactPage() {
  return (
    <div className="space-y-16">
      <WhatHappensNext />
      <Suspense fallback={<div>Loading...</div>}>
        <ContactFormWrapper />
      </Suspense>
      <DownsideChecklistSection />
      <Suspense fallback={null}>
        <ContactPageScrollToFocus />
      </Suspense>
    </div>
  );
}

