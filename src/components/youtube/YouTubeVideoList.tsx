
import { YouTubeVideo as YouTubeVideoType } from "@/lib/models/YouTubeVideo";
import YouTubeVideo from "./YouTubeVideo";
import { Loader2 } from "lucide-react";

interface YouTubeVideoListProps {
  videos: YouTubeVideoType[];
  isLoading: boolean;
  error: string | null;
}

const YouTubeVideoList = ({ videos, isLoading, error }: YouTubeVideoListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="mr-2 text-lg">טוען סרטונים...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium mb-2">שגיאה בטעינת הסרטונים</h3>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-xl font-medium mb-2">לא נמצאו סרטונים</h3>
        <p className="text-muted-foreground">נסה לבחור קטגוריה אחרת</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {videos.map((video) => (
        <YouTubeVideo key={video.id} video={video} />
      ))}
    </div>
  );
};

export default YouTubeVideoList;
