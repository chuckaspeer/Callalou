import { BurnTheBoatsIntro } from "@/components/philosophy/BurnTheBoatsIntro";
import { BurnTheBoatsDetails } from "@/components/philosophy/BurnTheBoatsDetails";

export default function PhilosophyPage() {
  return (
    <div className="space-y-16">
      <BurnTheBoatsIntro />
      <BurnTheBoatsDetails />
    </div>
  );
}

