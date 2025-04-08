import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, VolumeX, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogOverlay
} from "@/components/ui/dialog";

const VideoSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);

  // Extract YouTube video ID from the URL
  const youtubeVideoId = "l0nrxRhU_G8";

  // Function to toggle mute/unmute in the modal
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return <section className="tech-gradient-bg text-white py-14" id="video-showcase">
      <div className="container mx-auto py-8 px-4">
        {/* Tech lines animation in background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="tech-line tech-line-1" style={{ left: '10%', height: '300px' }}></div>
          <div className="tech-line tech-line-2" style={{ left: '30%', height: '250px' }}></div>
          <div className="tech-line tech-line-3" style={{ left: '55%', height: '350px' }}></div>
          <div className="tech-line tech-line-4" style={{ left: '75%', height: '280px' }}></div>
          <div className="tech-line tech-line-5" style={{ left: '90%', height: '320px' }}></div>
        </div>
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">איך אני נראה על הבמה?</h2>
          <p className="text-lg opacity-95 max-w-2xl mx-auto font-medium">
            לקט מההרצאות שהיו לי בשנה האחרונה
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
            <div className="w-full h-full relative">
              {/* סרטון שרץ בלופ אינסופי בשקט */}
              <div 
                className="cursor-pointer relative w-full h-full"
                onClick={() => setIsModalOpen(true)}
              >
                <iframe 
                  ref={videoRef}
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeVideoId}&rel=0&showinfo=0&modestbranding=1`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="w-full h-full absolute top-0 left-0"
                  style={{ border: 'none' }}
                />
                
                {/* שכבת שקיפות עם כפתור הפעלה במרכז */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 via-black/30 to-black/10 hover:from-black/70 hover:via-black/40 hover:to-black/20 transition-all duration-300">
                  <div className="w-24 h-24 rounded-full bg-white/90 text-purple-700 flex items-center justify-center hover:bg-white hover:scale-105 transition-all duration-300 shadow-lg mb-4 glow">
                    <Play size={40} className="ml-1" />
                  </div>
                  <p className="text-white font-medium text-lg md:text-xl max-w-md text-center bg-black/40 px-4 py-2 rounded-full mb-2 shadow-md">לקט הרצאות AI מהשנה האחרונה</p>
                  <p className="text-white/90 text-sm max-w-md text-center bg-black/30 px-3 py-1 rounded-full shadow-sm">לחצו לצפייה בקטע מלא</p>
                </div>
              </div>
              
              {/* כפתור השתקה בפינה */}
              <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                <button onClick={() => setIsModalOpen(true)} className="bg-white/80 text-purple-700 p-2 rounded-full hover:bg-white transition-colors">
                  <Play className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* מודל לתצוגת הסרטון במסך מלא עם שמע */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogOverlay className="bg-black/80" />
        <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent">
          <div className="relative w-full aspect-video">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 z-50 bg-black bg-opacity-70 rounded-full p-1 text-white hover:bg-opacity-90 transition-all duration-300"
            >
              <X size={24} />
            </button>
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0&rel=0&modestbranding=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              style={{ border: 'none' }}
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </section>;
};

export default VideoSection;