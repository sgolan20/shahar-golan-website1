
import { motion } from "framer-motion";
import { Calendar, Play, X } from "lucide-react";
import { useState } from "react";
import { YouTubeVideo as YouTubeVideoType } from "@/services/youtubeService";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay
} from "@/components/ui/dialog";

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

// Extract YouTube video ID from various YouTube URL formats
export const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  
  // Regular YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

// Convert any YouTube URL to embed format
export const getYouTubeEmbedUrl = (url: string): string | null => {
  const videoId = extractYouTubeId(url);
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
};

export const YouTubeVideo = ({ video }: YouTubeVideoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // בחירת התמונה המקדימה הטובה ביותר הזמינה
  const thumbnail = 
    video.thumbnails.maxres?.url || 
    video.thumbnails.standard?.url || 
    video.thumbnails.high.url || 
    video.thumbnails.medium.url || 
    video.thumbnails.default.url;

  return (
    <>
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
            <div 
              className="cursor-pointer relative w-full h-full"
              onClick={() => setIsModalOpen(true)}
            >
              <img 
                src={thumbnail} 
                alt={video.title}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all duration-300">
                <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center">
                  <Play size={32} className="text-white ml-1" />
                </div>
              </div>
            </div>
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

      {/* מודל לתצוגת הסרטון במסך מלא */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent">
          <DialogDescription className="sr-only">
            {video.title}
          </DialogDescription>
          <div className="relative w-full aspect-video">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 z-50 bg-black bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-90 transition-all duration-300"
            >
              <X size={24} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default YouTubeVideo;
