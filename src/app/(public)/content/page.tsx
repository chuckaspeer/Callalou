import { FeaturedVideo } from "@/components/content/FeaturedVideo";
import { VideoGrid } from "@/components/content/VideoGrid";
import { ArticleList } from "@/components/content/ArticleList";

export default function ContentPage() {
  return (
    <div className="space-y-16">
      <FeaturedVideo />
      <VideoGrid />
      <ArticleList />
    </div>
  );
}

