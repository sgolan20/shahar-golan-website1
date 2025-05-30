
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getChannelVideos } from "@/services/youtubeService";
import { YouTubeVideo } from "@/lib/models/YouTubeVideo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

const YouTubeVideos = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const fetchedVideos = await getChannelVideos();
        setVideos(fetchedVideos);
      } catch (err) {
        console.error("Error fetching YouTube videos:", err);
        setError("לא ניתן לטעון את סרטוני היוטיוב. אנא נסה שוב מאוחר יותר.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div dir="rtl">
      <section
        className="relative pt-20 pb-16 md:pt-28 md:pb-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
        style={{
          backgroundImage: `url('/lovable-uploads/20250502_0143_לפטופ עם איורים טכנולוגיים_remix_01jt7088trfdqv6hcvs68xjf7f.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-label="Hero section with video blog illustration background"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-[rgba(255,255,255,0.7)] z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">בלוג וידאו</h1>
            <p className="text-lg mt-2 text-white/90 drop-shadow">
              בלוג הווידאו הוא ערוץ היוטיוב שלי, בו תמצאו חדשות ועדכונים על כלים חדשים בבינה מלאכותית, מדריכים וטיפים שימושיים, והסברים מעשיים על איך להפיק את המיטב מה-AI.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-32 w-full mb-4" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-xl text-red-500">{error}</p>
            </div>
          ) : videos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={video.thumbnails.medium.url} 
                        alt={video.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{video.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground mb-4">{video.description.slice(0, 100)}...</p>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(video.publishedAt)}
                      </div>
                    </CardContent>
                    <CardContent>
                      <Button 
                        variant="gradient" 
                        className="w-full"
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank')}
                      >
                        צפה בסרטון
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">לא נמצאו סרטונים</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default YouTubeVideos;
