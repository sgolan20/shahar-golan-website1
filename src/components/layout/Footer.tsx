import { Link } from "react-router-dom";
import { Youtube, Linkedin, Mail, ArrowUp, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Footer = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // יצירת אובייקט FormData מהטופס
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      
      // שליחת הנתונים לנטליפיי
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as any).toString()
      });
      
      toast({
        title: "הודעה נשלחה בהצלחה",
        description: "תודה על פנייתך! אחזור אליך בהקדם האפשרי."
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "שגיאה בשליחת הטופס",
        description: "אירעה שגיאה בעת שליחת הטופס. אנא נסה שוב מאוחר יותר.",
        variant: "destructive"
      });
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return <footer className="bg-gray-50 pt-16 pb-8">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-display font-bold text-gradient mb-4 inline-block">
              שחר גולן
            </Link>
            <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
              מרצה ל-GEN-AI ובינה מלאכותית, מלמד כיצד להשתמש בכלים מתקדמים בחיי היום יום והעבודה.
            </p>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display font-medium text-lg mb-4">ניווט מהיר</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">בית</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">אודות</Link>
              <Link to="/why-me" className="text-muted-foreground hover:text-primary transition-colors">למה מרצה לבינה מלאכותית?</Link>
              <Link to="/focused-course" className="text-muted-foreground hover:text-primary transition-colors">קורס ממוקד</Link>
              <Link to="/focused-workshop" className="text-muted-foreground hover:text-primary transition-colors">סדנה ממוקדת</Link>
              <Link to="/custom-lecture" className="text-muted-foreground hover:text-primary transition-colors">הרצאה בהתאמה אישית</Link>
              <Link to="/intro-workshop" className="text-muted-foreground hover:text-primary transition-colors">סדנת מבוא</Link>
              <Link to="/video-blog" className="text-muted-foreground hover:text-primary transition-colors">בלוג וידאו</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">צור קשר</Link>
            </nav>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display font-medium text-lg mb-4">צור קשר</h3>
            <p className="text-muted-foreground mb-2">
              מעוניינים בהרצאה, סדנה או קורס מותאם אישית?
            </p>
            <a href="mailto:sgolan20@gmail.com" className="text-primary font-medium hover:underline mb-4 inline-block">sgolan20@gmail.com</a>
            
            <div className="flex space-x-4 space-x-reverse mb-4">
              <a href="https://www.youtube.com/@sgolan20" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors" aria-label="ערוץ יוטיוב">
                <Youtube size={20} />
              </a>
              <a href="https://www.linkedin.com/in/sgolan20" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors" aria-label="לינקדאין">
                <Linkedin size={20} />
              </a>
              <a href="mailto:sgolan20@gmail.com" className="text-gray-600 hover:text-primary transition-colors" aria-label="אימייל">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display font-medium text-lg mb-4">טופס יצירת קשר</h3>
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit} 
              className="space-y-3"
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input id="name" name="name" type="text" value={formData.name} onChange={handleChange} required placeholder="שם מלא" className="text-sm" />
                </div>
                <div>
                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required placeholder="אימייל" className="text-sm" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="טלפון" className="text-sm" />
                </div>
                <div>
                  <Input id="subject" name="subject" type="text" value={formData.subject} onChange={handleChange} required placeholder="נושא" className="text-sm" />
                </div>
              </div>
              
              <div>
                <Textarea id="message" name="message" rows={3} value={formData.message} onChange={handleChange} required placeholder="הודעה" className="text-sm" />
              </div>
              
              <Button type="submit" className="w-full btn-shine text-sm" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    שולח...
                  </>
                ) : (
                  <>
                    <Send className="ml-2 h-4 w-4" />
                    שליחה
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} שחר גולן. כל הזכויות שמורות.
          </p>
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">הצטרפו לקהילה שלי</h3>
            <div className="flex gap-4">
              <a href="https://www.youtube.com/@sgolan20" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube text-xl hover:opacity-80 transition-opacity"></i>
              </a>
              <a href="https://t.me/sgolanai" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-telegram text-xl hover:opacity-80 transition-opacity"></i>
              </a>
              <a href="https://chat.whatsapp.com/CuYj1dsmrcH80cbfAOsotQ" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp text-xl hover:opacity-80 transition-opacity"></i>
              </a>
              <a href="https://www.facebook.com/groups/976255830459659/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook text-xl hover:opacity-80 transition-opacity"></i>
              </a>
            </div>
          </div>
          <button onClick={scrollToTop} className="mt-4 md:mt-0 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="חזרה למעלה">
            חזרה למעלה
            <ArrowUp size={16} className="mr-1" />
          </button>
        </div>
      </div>
    </footer>;
};
export default Footer;
