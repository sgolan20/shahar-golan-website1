
import { motion } from "framer-motion";

const ContactHero = () => {
  return (
    <section className="pt-20 pb-16 md:pt-28 md:pb-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto text-center" 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">צור קשר</h1>
          <p className="text-xl text-muted-foreground">
            מעוניינים בהרצאה, סדנה או שיתוף פעולה? מוזמנים ליצור איתי קשר
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactHero;
