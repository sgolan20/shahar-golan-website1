import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, ChevronRight, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import YouTubeVideoList from "@/components/youtube/YouTubeVideoList";
import YouTubePlaylistCategories from "@/components/youtube/YouTubePlaylistCategories";
import { 
  getChannelPlaylists, 
  getChannelVideos, 
  getPlaylistVideos,
  YouTubeVideo,
  YouTubePlaylist
} from "@/services/youtubeService";

const VIDEOS_PER_PAGE = 6; 

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [playlists, setPlaylists] = useState<YouTubePlaylist[]>([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [isLoadingPlaylists, setIsLoadingPlaylists] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setIsLoadingPlaylists(true);
        const playlistsData = await getChannelPlaylists();
        setPlaylists(playlistsData);
      } catch (err) {
        console.error("שגיאה בטעינת פלייליסטים:", err);
        setError("לא ניתן לטעון את הפלייליסטים. אנא נסה שוב מאוחר יותר.");
      } finally {
        setIsLoadingPlaylists(false);
      }
    };

    fetchPlaylists();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoadingVideos(true);
        setError(null);
        setCurrentPage(1); 
        
        let videosData: YouTubeVideo[];
        
        if (selectedPlaylistId) {
          videosData = await getPlaylistVideos(selectedPlaylistId);
        } else {
          videosData = await getChannelVideos();
        }
        
        // וידוא שהנתונים שהתקבלו הם אכן מערך
        if (!Array.isArray(videosData)) {
          console.error("התקבלו נתוני סרטונים שאינם מערך:", videosData);
          setVideos([]);
          setError("התקבלו נתונים לא תקינים מהשרת. אנא נסה שוב מאוחר יותר.");
        } else {
          setVideos(videosData);
        }
      } catch (err) {
        console.error("שגיאה בטעינת סרטונים:", err);
        setError("לא ניתן לטעון את הסרטונים. אנא נסה שוב מאוחר יותר.");
        setVideos([]);
      } finally {
        setIsLoadingVideos(false);
      }
    };

    fetchVideos();
  }, [selectedPlaylistId]);

  // וידוא שהמשתנה videos הוא מערך לפני השימוש ב-filter
  const filteredVideos = Array.isArray(videos) 
    ? videos.filter(video => 
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        video.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const totalPages = Math.ceil(filteredVideos.length / VIDEOS_PER_PAGE);
  
  const currentVideos = filteredVideos.slice(
    (currentPage - 1) * VIDEOS_PER_PAGE,
    currentPage * VIDEOS_PER_PAGE
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div dir="rtl">
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">בלוג וידאו</h1>
            <p className="text-xl text-muted-foreground">
              צפו בסרטונים העדכניים ביותר מערוץ היוטיוב שלי
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
            <div className="w-full md:w-auto relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="חיפוש סרטונים..."
                className="pr-10 w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <YouTubePlaylistCategories 
              playlists={playlists}
              selectedPlaylistId={selectedPlaylistId}
              onSelectPlaylist={setSelectedPlaylistId}
              isLoading={isLoadingPlaylists}
            />
          </div>

          <YouTubeVideoList 
            videos={currentVideos} 
            isLoading={isLoadingVideos} 
            error={error} 
          />

          {!isLoadingVideos && filteredVideos.length > 0 && (
            <div className="flex justify-center items-center mt-12 gap-2">
              <Button 
                variant="outline" 
                onClick={prevPage} 
                disabled={currentPage === 1}
                className="flex items-center gap-1"
              >
                <ChevronRight size={16} />
                הקודם
              </Button>
              
              <div className="mx-4 text-sm">
                עמוד {currentPage} מתוך {totalPages}
              </div>
              
              <Button 
                variant="outline" 
                onClick={nextPage} 
                disabled={currentPage === totalPages}
                className="flex items-center gap-1"
              >
                הבא
                <ChevronLeft size={16} />
              </Button>
            </div>
          )}

          {!isLoadingVideos && filteredVideos.length === 0 && !error && (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">לא נמצאו סרטונים התואמים לחיפוש שלך</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">הישאר מעודכן</h2>
            <p className="text-lg text-muted-foreground mb-8">
              הירשם לערוץ היוטיוב שלי וקבל התראות על סרטונים חדשים
            </p>
            <a 
              href="https://www.youtube.com/@sgolan20?sub_confirmation=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-md transition-colors duration-300"
            >
              הירשם לערוץ
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
