
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type BannerItem = {
  title: string;
  description: string;
  path: string;
  color: string;
};

const RotatingBannerSection = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const banners: BannerItem[] = [
    {
      title: "קורס ממוקד",
      description: "קורס AI מקיף המותאם לצרכים הספציפיים של הארגון שלך",
      path: "/focused-course",
      color: "from-blue-600 to-blue-400",
    },
    {
      title: "סדנה ממוקדת",
      description: "סדנה מעשית וממוקדת להטמעת כלי AI בארגון",
      path: "/focused-workshop",
      color: "from-green-600 to-green-400",
    },
    {
      title: "הרצאה מותאמת",
      description: "הרצאה מרתקת על עולם ה-AI המותאמת לקהל היעד שלך",
      path: "/custom-lecture",
      color: "from-purple-600 to-purple-400",
    },
    {
      title: "סדנת היכרות",
      description: "צעד ראשון להיכרות עם עולם הבינה המלאכותית",
      path: "/intro-workshop",
      color: "from-orange-600 to-orange-400",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const handleBannerClick = (path: string) => {
    navigate(path);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            השירותים שלי
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            מגוון פתרונות להטמעת בינה מלאכותית בארגון שלך
          </p>
        </div>

        <div className="max-w-4xl mx-auto h-48 md:h-40 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 bg-gradient-to-r ${banners[currentIndex].color} text-white rounded-xl p-6 md:p-8 flex flex-col justify-between cursor-pointer`}
              onClick={() => handleBannerClick(banners[currentIndex].path)}
            >
              <div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  {banners[currentIndex].title}
                </h3>
                <p className="text-lg opacity-90 mb-4">
                  {banners[currentIndex].description}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <Button 
                  variant="outline" 
                  className="bg-white/20 hover:bg-white/30 border-white text-white"
                >
                  למידע נוסף
                </Button>
                <div className="flex gap-2">
                  {banners.map((_, index) => (
                    <span
                      key={index}
                      className={`inline-block w-2 h-2 rounded-full ${
                        index === currentIndex ? "bg-white" : "bg-white/40"
                      }`}
                    />
                  ))}
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
