import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { YouTubeVideo as YouTubeVideoType } from "@/services/youtubeService";

interface YouTubeVideoProps {
  video: YouTubeVideoType;
}

const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  } catch (error) {
    return dateString;
  }
};

export const YouTubeVideo = ({ video }: YouTubeVideoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
        <div className="relative aspect-video overflow-hidden bg-gray-200">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center text-muted-foreground text-sm">
              <Calendar size={14} className="ml-1" />
              {formatDate(video.publishedAt)}
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-3 line-clamp-2">{video.title}</h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">{video.description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default YouTubeVideo;
