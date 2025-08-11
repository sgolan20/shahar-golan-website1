
import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 min-h-[50vh] flex items-center">
      {/* Background Image with Darkened Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/lovable-uploads/freepik__a-modern-minimalist-workspace-scene-wide-panoramic__22713.png" 
          alt="מרחב עבודה מודרני" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/50" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto text-center" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          {/* Text container with background for better readability */}
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="text-transparent bg-clip-text bg-brand-gradient">צור קשר</span>
            </h1>
            <p className="text-xl text-white/90 font-medium leading-relaxed">
              מעוניינים בהרצאה, סדנה או שיתוף פעולה? מוזמנים ליצור איתי קשר
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
