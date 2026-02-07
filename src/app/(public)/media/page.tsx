import { ContentIntro } from "@/components/content/ContentIntro";
import { CategoryFilter } from "@/components/content/CategoryFilter";
import { ReadingPathsSection } from "@/components/content/ReadingPathsSection";
import { FeaturedVideo } from "@/components/content/FeaturedVideo";
import { VideoGrid } from "@/components/content/VideoGrid";
import { ArticleList } from "@/components/content/ArticleList";
import { FormatsSection } from "@/components/content/FormatsSection";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";
import {
  CATEGORIES,
  VALID_PLATFORMS,
  getFilteredInsights,
  type InsightCategory,
  type InsightPlatform,
} from "@/content/insights";

type PageProps = {
  searchParams: Promise<{ category?: string; platform?: string }>;
};

function parseCategory(value: string | undefined): InsightCategory | "All" {
  if (!value) return "All";
  const decoded = decodeURIComponent(value);
  if (CATEGORIES.includes(decoded as InsightCategory)) return decoded as InsightCategory;
  return "All";
}

function parsePlatform(value: string | undefined): InsightPlatform | undefined {
  if (!value) return undefined;
  const decoded = decodeURIComponent(value).trim();
  const match = VALID_PLATFORMS.find(
    (p) => p.toLowerCase() === decoded.toLowerCase()
  );
  return match ?? undefined;
}

export default async function MediaPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const selectedCategory = parseCategory(params.category);
  const selectedPlatform = parsePlatform(params.platform);

  const filteredInsights = getFilteredInsights(
    selectedCategory,
    selectedPlatform
  );
  const articleItems =
    selectedCategory !== "All" || selectedPlatform
      ? filteredInsights.map((i) => ({
          id: i.id,
          title: i.title,
          summary: i.summary ?? "",
        }))
      : undefined;

  return (
    <div className="space-y-16">
      <ContentIntro />
      <CategoryFilter
        currentCategory={selectedCategory}
        selectedPlatform={selectedPlatform}
      />
      <ReadingPathsSection
        category={selectedCategory}
        platform={selectedPlatform}
      />
      <FeaturedVideo />
      <VideoGrid />
      <ArticleList items={articleItems} />
      <FormatsSection selectedCategory={selectedCategory} />
      <HomeNewsletter description="Get thoughtful perspectives on multifamily — without hype." />
    </div>
  );
}
