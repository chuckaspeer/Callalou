import { HomeHero } from "@/components/home/HomeHero";
import { PortfolioOverview } from "@/components/home/PortfolioOverview";
import { HomeWhyHomeMatters } from "@/components/home/HomeWhyHomeMatters";
import { HomeEmilIntro } from "@/components/home/HomeEmilIntro";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HomeHero />
      <PortfolioOverview />
      <HomeWhyHomeMatters />
      <HomeEmilIntro />
      <HomeNewsletter />
    </div>
  );
}

