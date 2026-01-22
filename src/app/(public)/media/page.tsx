import { ContentIntro } from "@/components/content/ContentIntro";
import { FeaturedVideo } from "@/components/content/FeaturedVideo";
import { VideoGrid } from "@/components/content/VideoGrid";
import { ArticleList } from "@/components/content/ArticleList";
import { HomeNewsletter } from "@/components/home/HomeNewsletter";

export default function MediaPage() {
  return (
    <div className="space-y-16">
      <ContentIntro />
      <FeaturedVideo />
      <VideoGrid />
      <ArticleList />
      <HomeNewsletter description="Get thoughtful perspectives on multifamily investing — without hype." />
    </div>
  );
}
