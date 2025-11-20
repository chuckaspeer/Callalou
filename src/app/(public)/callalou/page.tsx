import { CallalouEssence } from "@/components/callalou/CallalouEssence";
import { WhyHomeMattersFull } from "@/components/callalou/WhyHomeMattersFull";
import { CallalouWhoWeServe } from "@/components/callalou/CallalouWhoWeServe";

export default function CallalouPage() {
  return (
    <div className="space-y-16">
      <CallalouEssence />
      <WhyHomeMattersFull />
      <CallalouWhoWeServe />
    </div>
  );
}

