import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Extract YouTube video ID from the URL
  const youtubeVideoId = "l0nrxRhU_G8";

  // Function to handle play/pause
  const handlePlayVideo = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const message = isPlaying ? JSON.stringify({
        event: 'command',
        func: 'pauseVideo'
      }) : JSON.stringify({
        event: 'command',
        func: 'playVideo'
      });
      iframe.contentWindow?.postMessage(message, '*');
      setIsPlaying(!isPlaying);
    }
  };

  // Function to toggle mute/unmute
  const toggleMute = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      const message = isMuted ? JSON.stringify({
        event: 'command',
        func: 'unMute'
      }) : JSON.stringify({
        event: 'command',
        func: 'mute'
      });
      iframe.contentWindow?.postMessage(message, '*');
      setIsMuted(!isMuted);
    }
  };

  // Initialize video when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (iframeRef.current && !isPlaying) {
        const iframe = iframeRef.current;
        const message = JSON.stringify({
          event: 'command',
          func: 'playVideo'
        });
        iframe.contentWindow?.postMessage(message, '*');
        setIsPlaying(true);
      }
    }, 1000); // Short delay to ensure iframe is fully loaded

    return () => clearTimeout(timer);
  }, []);
  return <section className="py-20 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4"></h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
        </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }} className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
            <div className="w-full h-full relative">
              <iframe ref={iframeRef} src={`https://www.youtube.com/embed/${youtubeVideoId}?enablejsapi=1&autoplay=1&mute=1&controls=0&rel=0&showinfo=0&modestbranding=1`} allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" className="w-full h-full absolute top-0 left-0" style={{
              border: 'none'
            }} title="YouTube video player" />
              
              {/* Overlay controls */}
              <div className="absolute bottom-4 right-4 flex gap-2 z-10">
                <button onClick={handlePlayVideo} className="bg-white/80 text-purple-700 p-2 rounded-full hover:bg-white transition-colors">
                  <Play className={`h-5 w-5 ${isPlaying ? 'hidden' : 'block'}`} />
                  <div className={`h-5 w-5 ${!isPlaying ? 'hidden' : 'block'}`}>
                    <div className="bg-purple-700 w-[6px] h-[16px] inline-block mr-[2px]"></div>
                    <div className="bg-purple-700 w-[6px] h-[16px] inline-block"></div>
                  </div>
                </button>
                <button onClick={toggleMute} className="bg-white/80 text-purple-700 p-2 rounded-full hover:bg-white transition-colors">
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default VideoSection;