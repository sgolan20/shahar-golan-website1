import { motion } from "framer-motion";
import { Mail, PhoneCall, MapPin, Youtube, Linkedin } from "lucide-react";
const ContactInfo = () => {
  return <motion.div initial={{
    opacity: 0,
    x: 20
  }} animate={{
    opacity: 1,
    x: 0
  }} transition={{
    duration: 0.5,
    delay: 0.4
  }}>
      <div className="flex flex-col items-center mb-8">
        <img src="/lovable-uploads/logogolanai2.png" alt="שחר גולן לוגו" className="h-24 mb-4" />
        <h2 className="text-2xl font-bold">פרטי התקשרות</h2>
      </div>
      <div className="bg-gray-50 p-6 rounded-xl">
        <div className="space-y-6">
          <div className="flex">
            <div className="bg-primary/10 p-3 rounded-full mr-4 mx-[12px]">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">אימייל</h3>
              <a href="mailto:sgolan20@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                sgolan20@gmail.com
              </a>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-primary/10 p-3 rounded-full mr-4 mx-[12px]">
              <PhoneCall className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">טלפון</h3>
              <a href="tel:+972527332838" className="text-muted-foreground hover:text-primary transition-colors">
                052-733-2838
              </a>
            </div>
          </div>
          
          <div className="flex">
            <div className="bg-primary/10 p-3 rounded-full mr-4 mx-[12px]">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-1">מיקום</h3>
              <p className="text-muted-foreground">
                זמין להרצאות וסדנאות בכל רחבי הארץ
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-3">עקבו אחריי</h3>
          <div className="flex space-x-4 rtl:space-x-reverse">
            <a href="https://www.youtube.com/@sgolan20" target="_blank" rel="noopener noreferrer" className="bg-gray-50 p-3 rounded-full shadow-sm text-gray-600 hover:text-primary border border-gray-200 transition-colors" aria-label="ערוץ יוטיוב">
              <Youtube className="h-5 w-5" />
            </a>
            <a href="https://www.linkedin.com/in/sgolan20" target="_blank" rel="noopener noreferrer" className="bg-gray-50 p-3 rounded-full shadow-sm text-gray-600 hover:text-primary border border-gray-200 transition-colors" aria-label="לינקדאין">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>;
};
export default ContactInfo;