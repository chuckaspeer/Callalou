import { HomeHero } from "@/components/home/HomeHero";
import { FounderNote } from "@/components/home/FounderNote";
import { UnderwritingStandard } from "@/components/home/UnderwritingStandard";
import { ProofOfSeriousness } from "@/components/home/ProofOfSeriousness";
import { PortfolioOverview } from "@/components/home/PortfolioOverview";
import { FeaturedInsights } from "@/components/home/FeaturedInsights";
import { HomeWhyHomeMatters } from "@/components/home/HomeWhyHomeMatters";
import { HowItWorks } from "@/components/home/HowItWorks";
import { HomeEmilIntro } from "@/components/home/HomeEmilIntro";
import { PrinciplesStrip } from "@/components/home/PrinciplesStrip";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HomeHero />
      <FounderNote />
      <UnderwritingStandard />
      <ProofOfSeriousness />
      <PortfolioOverview />
      <FeaturedInsights />
      <HomeWhyHomeMatters />
      <HowItWorks />
      <HomeEmilIntro />
      <PrinciplesStrip />
      <HomeNewsletter />
    </div>
  );
}

