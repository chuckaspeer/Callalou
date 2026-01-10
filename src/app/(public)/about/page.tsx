import { CompanyOverview } from "@/components/about/CompanyOverview";
import { CallalouEssence } from "@/components/callalou/CallalouEssence";
import { EmilStory } from "@/components/emil/EmilStory";
import { EmilValues } from "@/components/emil/EmilValues";
import { OperationalApproach } from "@/components/about/OperationalApproach";
import { AboutCTA } from "@/components/about/AboutCTA";
import { KeyPartnerships } from "@/components/about/KeyPartnerships";
import { Advisors } from "@/components/about/Advisors";
import { BrandArchitecture } from "@/components/home/BrandArchitecture";

export default function AboutPage() {
  return (
    <div className="space-y-16">
      <CompanyOverview />
      <CallalouEssence />
      <EmilStory />
      <EmilValues />
      <OperationalApproach />
      <AboutCTA />
      <KeyPartnerships />
      <Advisors />
      <BrandArchitecture />
    </div>
  );
}

