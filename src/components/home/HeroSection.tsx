
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-gray-50">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-gradient-to-b from-white/90 to-transparent z-0" />
        <div className="absolute w-96 h-96 bg-purple-200 rounded-full -top-12 -right-12 filter blur-3xl opacity-20" />
        <div className="absolute w-96 h-96 bg-purple-300 rounded-full bottom-0 left-1/3 filter blur-3xl opacity-20" />
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-right" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gradient">בינה מלאכותית בשבילך</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mr-0 lg:ml-auto">
              מרצה ל-GEN-AI ומומחה להטמעת כלים חדשניים בעולם העבודה והחיים האישיים
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-4">
              <Button asChild size="lg" className="btn-shine">
                <Link to="/contact">
                  תיאום הרצאה
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline">
                <Link to="/about">למד עוד עליי</Link>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.5, delay: 0.4 }} 
            className="hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="/lovable-uploads/567d39ec-198d-4613-b728-b29ef0187284.png" 
                alt="שחר גולן מרצה על במה" 
                className="w-full h-auto object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div className="text-white">
                  <p className="text-xl font-bold">שחר גולן</p>
                  <p className="text-sm">מרצה ל-GEN-AI ובינה מלאכותית</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
