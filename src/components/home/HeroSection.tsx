
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image with Darkened Overlay */}
      <div className="absolute inset-0 z-0">
        <img src="/lovable-uploads/567d39ec-198d-4613-b728-b29ef0187284.png" alt="שחר גולן מרצה על במה" className="w-full h-full object-cover object-left md:object-top" // Changed object-top to object-left for mobile screens
      />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-black/50" /> {/* Improved gradient overlay */}
      </div>
      
      {/* Tech particles and lines for futuristic look */}
      <div className="absolute inset-0 overflow-hidden z-1">
        <div className="absolute w-full h-full bg-gradient-to-b from-black/30 to-transparent" />
        <div className="absolute w-96 h-96 bg-brand-gradient rounded-full -top-12 -right-12 filter blur-3xl opacity-20" />
        <div className="absolute w-96 h-96 bg-brand-gradient-radial rounded-full bottom-0 left-1/3 filter blur-3xl opacity-20" />
        
        {/* Animated tech particles */}
        <div className="particles-container">
          <div className="particle particle-1" style={{ left: '15%' }}></div>
          <div className="particle particle-2" style={{ left: '35%' }}></div>
          <div className="particle particle-3" style={{ left: '55%' }}></div>
          <div className="particle particle-4" style={{ left: '75%' }}></div>
          <div className="particle particle-5" style={{ left: '25%' }}></div>
          <div className="particle particle-6" style={{ left: '65%' }}></div>
          <div className="particle particle-7" style={{ left: '85%' }}></div>
          
          {/* Tech lines */}
          <div className="tech-line tech-line-1" style={{ left: '10%', height: '200px' }}></div>
          <div className="tech-line tech-line-2" style={{ left: '30%', height: '150px' }}></div>
          <div className="tech-line tech-line-3" style={{ left: '50%', height: '250px' }}></div>
          <div className="tech-line tech-line-4" style={{ left: '70%', height: '180px' }}></div>
          <div className="tech-line tech-line-5" style={{ left: '90%', height: '220px' }}></div>
        </div>
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight drop-shadow-xl">
              <span className="text-transparent bg-clip-text bg-brand-gradient text-shadow-lg">בואו נכיר את עולם ה-AI</span>
            </h1>
            
            <p className="text-xl text-white mb-8 max-w-2xl mx-auto lg:mr-0 lg:ml-auto font-medium drop-shadow-md">הרצאות וסדנאות AI מותאמות אישית לארגונים ולעסקים שרוצים להוביל בעידן החדש.</p>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-4">
              <Button asChild size="lg" variant="outline" className="bg-black/40 border-white/30 text-white hover:bg-brand-gradient hover-scale">
                <Link to="/about">מי אני?</Link>
              </Button>
            </div>
          </motion.div>

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
            <div className="text-white p-8 rounded-xl bg-black/40 backdrop-blur-sm border border-transparent bg-gradient-to-r from-[#4a52a3]/20 to-[#4aaba3]/20 max-w-md mt-[425px] shadow-lg shadow-[#4aaba3]/10 hover-scale">
              <h3 className="text-2xl font-bold mb-3">שחר גולן</h3>
              <p className="text-white/80">מרצה ל-GEN-AI ובינה מלאכותית. מעביר הדרכות וסדנאות AI לשיפור היצירתיות והיעילות בארגונים.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};

export default HeroSection;
