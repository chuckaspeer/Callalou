import { HomeHero } from "@/components/home/HomeHero";
import { HomeEmilIntro } from "@/components/home/HomeEmilIntro";
import { HomeCallalouOverview } from "@/components/home/HomeCallalouOverview";
import { HomeWhyHomeMatters } from "@/components/home/HomeWhyHomeMatters";
import { HomeBurnTheBoatsTeaser } from "@/components/home/HomeBurnTheBoatsTeaser";
import { HomeContentPreview } from "@/components/home/HomeContentPreview";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";

export default function HomePage() {
  return (
    <div className="space-y-16">
      <HomeHero />
      <HomeEmilIntro />
      <HomeCallalouOverview />
      <HomeWhyHomeMatters />
      <HomeBurnTheBoatsTeaser />
      <HomeContentPreview />
      <HomeNewsletter />
    </div>
  );
}

