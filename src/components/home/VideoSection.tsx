
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const VideoSection = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">צפו בהרצאות שלי</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            סרטון קצר שמציג את סגנון ההרצאות, הסדנאות והקורסים שאני מעביר בנושאי בינה מלאכותית
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.5 }} 
            className="relative aspect-video rounded-xl overflow-hidden shadow-2xl"
          >
            <video 
              ref={videoRef} 
              poster="https://images.unsplash.com/photo-1551818255-e6e10975bc17" 
              className="w-full h-full object-cover" 
              controls={isVideoPlaying}
            >
              <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
              הדפדפן שלך לא תומך בתגית וידאו.
            </video>
            
            {!isVideoPlaying && (
              <div 
                className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer" 
                onClick={handlePlayVideo}
              >
                <div className="bg-white/90 rounded-full p-4 shadow-lg transform transition-transform hover:scale-110">
                  <Play className="h-12 w-12 text-purple-600 fill-current" />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
