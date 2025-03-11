import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
  return <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image with Darkened Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/lovable-uploads/567d39ec-198d-4613-b728-b29ef0187284.png" alt="שחר גולן מרצה על במה" className="w-full h-full object-cover object-top" // Added object-top to keep the top part of the image visible
      />
        <div className="absolute inset-0 bg-black/60" /> {/* Darkened transparent overlay */}
      </div>
      
      {/* Gradient effects */}
      <div className="absolute inset-0 overflow-hidden z-1">
        <div className="absolute w-full h-full bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute w-96 h-96 bg-purple-200 rounded-full -top-12 -right-12 filter blur-3xl opacity-10" />
        <div className="absolute w-96 h-96 bg-purple-300 rounded-full bottom-0 left-1/3 filter blur-3xl opacity-10" />
      </div>
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-right text-white" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }}>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gradient">בואו נכיר את עולם ה-AI</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mr-0 lg:ml-auto">הרצאות וסדנאות מותאמות אישית לארגונים.</p>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-4">
              <Button asChild size="lg" className="btn-shine">
                <Link to="/contact">
                  תיאום הרצאה
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
              
              <Button asChild size="lg" variant="outline" className="bg-black/40 border-white/30 text-white hover:bg-black/60">
                <Link to="/about">למד עוד עליי</Link>
              </Button>
            </div>
          </motion.div>

          {/* We're removing the separate image display since it's now the background */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }} className="hidden lg:flex justify-center items-center">
            <div className="text-white p-8 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 max-w-md">
              <h3 className="text-2xl font-bold mb-3">שחר גולן</h3>
              <p className="text-white/80">מרצה ל-GEN-AI ובינה מלאכותית, מלווה ארגונים וחברות בהטמעת טכנולוגיות חדשניות לשיפור היצירתיות והיעילות.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default HeroSection;