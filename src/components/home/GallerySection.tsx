
import { motion } from "framer-motion";

const GallerySection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">תמונות מהרצאות וסדנאות</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            רגעים נבחרים מהרצאות וסדנאות שהעברתי בארגונים שונים ברחבי הארץ
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="overflow-hidden rounded-xl shadow-md"
          >
            <img 
              src="https://images.unsplash.com/photo-1551818255-e6e10975bc17" 
              alt="הרצאה 1" 
              className="w-full h-64 md:h-72 object-cover hover:scale-105 transition-transform duration-500" 
            />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="overflow-hidden rounded-xl shadow-md"
          >
            <img 
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
              alt="הרצאה 2" 
              className="w-full h-64 md:h-72 object-cover hover:scale-105 transition-transform duration-500" 
            />
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            className="overflow-hidden rounded-xl shadow-md"
          >
            <img 
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
              alt="סדנה" 
              className="w-full h-64 md:h-72 object-cover hover:scale-105 transition-transform duration-500" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
