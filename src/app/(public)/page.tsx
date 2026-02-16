import { HomeHero } from "@/components/home/HomeHero";
import { UnderwritingStandard } from "@/components/home/UnderwritingStandard";
import { ProofOfSeriousness } from "@/components/home/ProofOfSeriousness";
import { PrinciplesStrip } from "@/components/home/PrinciplesStrip";
import { PlatformInFormation } from "@/components/home/PlatformInFormation";
import { FounderNote } from "@/components/home/FounderNote";
import { FeaturedInsights } from "@/components/home/FeaturedInsights";
import { PortfolioOverview } from "@/components/home/PortfolioOverview";
import { HomeWhyHomeMatters } from "@/components/home/HomeWhyHomeMatters";
import { HowItWorks } from "@/components/home/HowItWorks";
import { HomeEmilIntro } from "@/components/home/HomeEmilIntro";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HomeHero />
      <UnderwritingStandard />
      <ProofOfSeriousness />
      <PrinciplesStrip />
      <PlatformInFormation />
      <FounderNote />
      <FeaturedInsights />
      <PortfolioOverview />
      <HomeWhyHomeMatters />
      <HowItWorks />
      <HomeEmilIntro />
      <HomeNewsletter />
    </div>
  );
}

