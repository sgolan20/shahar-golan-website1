
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type BannerItem = {
  title: string;
  description: string;
  path: string;
  bgImage: string;
  position?: string;
};

const RotatingBannerSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const banners: BannerItem[] = [
    {
      title: "קורס ממוקד",
      description: "קורס AI מקיף המותאם לצרכים הספציפיים של הארגון שלך",
      path: "/focused-course",
      bgImage: "/lovable-uploads/f5c1b97f-470f-419a-8100-660bfded6922.png",
      position: "center top",
    },
    {
      title: "סדנה ממוקדת",
      description: "סדנה מעשית וממוקדת להטמעת כלי AI בארגון",
      path: "/focused-workshop",
      bgImage: "/lovable-uploads/de7e2267-cc70-4a7d-9c8e-047faa05ed67.png",
    },
    {
      title: "הרצאה מותאמת",
      description: "הרצאה מרתקת על עולם ה-AI המותאמת לקהל היעד שלך",
      path: "/custom-lecture",
      bgImage: "/lovable-uploads/dfd9084b-250e-4bb9-b0a0-c412184506b2.png",
    },
    {
      title: "סדנת היכרות",
      description: "צעד ראשון להיכרות עם עולם הבינה המלאכותית",
      path: "/intro-workshop",
      bgImage: "/lovable-uploads/c6b40b45-c57a-4fb5-8855-cfca13a31f8a.png",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 7000); // Changed to 7 seconds as requested

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleBannerClick = (path: string) => {
    navigate(path);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
            השירותים שלי
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            מגוון פתרונות להטמעת בינה מלאכותית בארגון שלך
          </p>
        </div>

        <div className="max-w-5xl mx-auto h-64 md:h-80 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group`}
              onClick={() => handleBannerClick(banners[currentIndex].path)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center z-0" 
                style={{ 
                  backgroundImage: `url(${banners[currentIndex].bgImage})`,
                  backgroundPosition: banners[currentIndex].position || "center",
                  filter: "brightness(0.7)"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/50 z-10"></div>
              
              <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-12 text-white">
                <h3 className="text-3xl md:text-4xl font-bold mb-3">
                  {banners[currentIndex].title}
                </h3>
                <p className="text-xl opacity-90 mb-6 max-w-md">
                  {banners[currentIndex].description}
                </p>
                <div className="flex justify-between items-center">
                  <Button 
                    variant="outline" 
                    className="bg-white/20 hover:bg-white hover:text-primary border-white text-white transition-all duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2"
                  >
                    למידע נוסף
                    <ArrowLeft className="ml-2 rtl:rotate-180" size={16} />
                  </Button>
                  <div className="flex gap-2">
                    {banners.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDotClick(index);
                        }}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentIndex 
                            ? "bg-white scale-110" 
                            : "bg-white/40 hover:bg-white/60"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default RotatingBannerSection;
