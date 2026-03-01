import type { Metadata } from "next";
import { PrivateDialogueForm } from "@/components/private-dialogue/PrivateDialogueForm";

export const metadata: Metadata = {
  title: "Begin a Private Dialogue",
  description:
    "Request an introduction to Callaloo Ventures. Share your profile and interests. We respond within 24–48 hours.",
};

export default function PrivateDialoguePage() {
  return (
    <div className="space-y-16">
      <PrivateDialogueForm />
    </div>
  );
}
