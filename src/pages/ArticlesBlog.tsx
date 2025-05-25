import React from 'react';
import { motion } from "framer-motion";

const ArticlesBlog = () => {
  return (
    <div dir="rtl">
      {/* Hero Section */}
      <section
        className="relative pt-20 pb-16 md:pt-28 md:pb-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden"
        style={{
          backgroundImage: `url('/lovable-uploads/creative-copywriting-commercial-text-seo-editing.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
        aria-label="Hero section with articles blog illustration background"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.5)] to-[rgba(255,255,255,0.7)] z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg font-rubik">בלוג מאמרים</h1>
            <p className="text-lg mt-2 text-white/90 drop-shadow">
              כאן תמצאו מאמרים מעמיקים ומדריכים מפורטים על עולם הבינה המלאכותית, הטכנולוגיות החדשניות, וכיצד להטמיען בחיי היומיום ובעולם העבודה.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section - תיכף נוסיף כאן את התוכן */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-600 text-lg">הדף בבנייה...</p>
            <p className="text-gray-500 text-sm mt-2">כאן יופיעו המאמרים בקרוב</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ArticlesBlog; 