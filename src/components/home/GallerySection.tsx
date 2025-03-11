import { motion } from "framer-motion";
const GallerySection = () => {
  return <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4"></h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto"></p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{
          scale: 1.02
        }} className="overflow-hidden rounded-xl shadow-md">
            <img src="/lovable-uploads/a5b256ad-cf40-49cd-99c6-ae7d3c14a9f5.png" alt="הרצאה בכנס LetsAI" className="w-full h-64 md:h-72 object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>
          <motion.div whileHover={{
          scale: 1.02
        }} className="overflow-hidden rounded-xl shadow-md">
            <img src="/lovable-uploads/1d82bd9e-eb91-4db4-b869-725201b8bc83.png" alt="הרצאה על בינה מלאכותית" className="w-full h-64 md:h-72 object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>
          <motion.div whileHover={{
          scale: 1.02
        }} className="overflow-hidden rounded-xl shadow-md">
            <img src="/lovable-uploads/c6b40b45-c57a-4fb5-8855-cfca13a31f8a.png" alt="הרצאה באודיטוריום" className="w-full h-64 md:h-72 object-cover hover:scale-105 transition-transform duration-500" />
          </motion.div>
        </div>
      </div>
    </section>;
};
export default GallerySection;