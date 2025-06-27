import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Coffee, ArrowLeft, Clock, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const ThankYouPhysical = () => {
  return (
    <Layout
      title="תודה על קביעת הפגישה - שחר גולן"
      description="תודה שקבעת פגישה פיזית עם שחר גולן בארומה גן הצפון. נתראה בקרוב!"
    >
      <section className="relative min-h-[80vh] flex items-center">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#4a52a3]/10 via-white to-white" />
          
          {/* Tech particles and lines for futuristic look */}
          <div className="absolute inset-0 overflow-hidden">
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
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-lg border border-[#4a52a3]/10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mx-auto w-20 h-20 bg-brand-gradient rounded-full flex items-center justify-center mb-6"
              >
                <Coffee className="h-10 w-10 text-white" />
              </motion.div>
              
              <motion.h1 
                className="text-3xl md:text-4xl font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <span className="text-transparent bg-clip-text bg-brand-gradient">תודה על קביעת הפגישה!</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-700 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                הפגישה נקבעה בהצלחה. נתראה בקרוב!
              </motion.p>
              
              {/* Location and Meeting Details */}
              <motion.div 
                className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <h3 className="font-medium text-lg mb-4 flex items-center gap-2 justify-center">
                  <MapPin className="h-5 w-5 text-[#4a52a3]" />
                  מיקום הפגישה
                </h3>
                                 <div className="text-gray-700 text-center space-y-2">
                   <p className="font-semibold text-lg">ארומה אספרסו בר</p>
                   <p>גן הצפון, מעיין ברוך</p>
                   <p className="text-sm text-gray-600">שחר - 052-733-2838</p>
                 </div>
                
                {/* Navigation Button */}
                <div className="mt-4">
                  <Button asChild variant="outline" size="sm" className="hover-scale">
                    <a 
                      href="https://maps.google.com/?q=ארומה+אספרסו+בר+גן+הצפון+מעיין+ברוך" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Navigation className="h-4 w-4" />
                      פתח בגוגל מפות
                    </a>
                  </Button>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-blue-50 p-6 rounded-lg mb-8 border border-blue-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <h3 className="font-medium text-lg mb-4">לקראת הפגישה:</h3>
                <ul className="text-gray-700 text-right space-y-3" dir="rtl">
                  <li className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-[#4a52a3]" />
                    <span>מומלץ להגיע מספר דקות לפני הזמן הקבוע</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4a52a3]"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
                    <span>אנא הכן/י שאלות או נושאים שתרצה/י לדון בהם</span>
                  </li>
                                     <li className="flex items-center gap-2">
                     <MapPin className="h-5 w-5 text-[#4a52a3]" />
                     <span>המקום נמצא במתחם גן הצפון - יש חניה חינם</span>
                   </li>
                  <li className="flex items-center gap-2">
                    <Coffee className="h-5 w-5 text-[#4a52a3]" />
                    <span>הקפה עליי! בואו נשב ונדבר על הפרויקט שלך</span>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                <Button asChild size="lg" className="btn-shine tech-button hover-scale">
                  <a href="https://www.youtube.com/@sgolan20" target="_blank" rel="noopener noreferrer">
                    צפה בסרטוני ההדרכה שלי
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
                  </a>
                </Button>
                
                <Button asChild size="lg" variant="outline" className="hover-scale">
                  <Link to="/">
                    חזרה לדף הבית
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default ThankYouPhysical; 