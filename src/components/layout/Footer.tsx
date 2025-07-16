import { Link } from "react-router-dom";
import { Youtube, Linkedin, Mail, ArrowUp, Send, BookOpen, Users, Presentation, Coffee, HelpCircle, Video, User } from "lucide-react";
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
            <nav className="flex flex-col space-y-4">
              <Link to="/focused-course" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <BookOpen className="ml-2 h-5 w-5" />
                <span>קורס ממוקד</span>
              </Link>
              <Link to="/focused-workshop" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Users className="ml-2 h-5 w-5" />
                <span>סדנה ממוקדת</span>
              </Link>
              <Link to="/custom-lecture" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Presentation className="ml-2 h-5 w-5" />
                <span>הרצאה בהתאמה אישית</span>
              </Link>
              <Link to="/intro-workshop" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Coffee className="ml-2 h-5 w-5" />
                <span>סדנת היכרות</span>
              </Link>
              <Link to="/why-me" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <HelpCircle className="ml-2 h-5 w-5" />
                <span>למה מרצה לבינה מלאכותית?</span>
              </Link>
              <Link to="/video-blog" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <Video className="ml-2 h-5 w-5" />
                <span>בלוג וידאו</span>
              </Link>
              <Link to="/about" className="flex items-center text-muted-foreground hover:text-primary transition-colors">
                <User className="ml-2 h-5 w-5" />
                <span>אודות</span>
              </Link>
            </nav>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display font-medium text-lg mb-4">צור קשר</h3>
            <p className="text-muted-foreground mb-2">
              מעוניינים בהרצאה, סדנה או קורס מותאם אישית?
            </p>
            <Link to="/contact" className="btn-primary inline-flex items-center px-4 py-2 rounded-md text-sm font-medium mb-4">
              <Mail className="ml-2 h-4 w-4" />
              השאירו פרטים
            </Link>
            
            <div className="flex space-x-4 space-x-reverse mb-4">
              <a href="https://www.youtube.com/@sgolan20" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors" aria-label="ערוץ יוטיוב">
                <Youtube size={20} />
              </a>
              <a href="https://www.linkedin.com/in/sgolan20" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors" aria-label="לינקדאין">
                <Linkedin size={20} />
              </a>
              <a href="mailto:shahar@golanai.co.il" className="text-gray-600 hover:text-primary transition-colors" aria-label="אימייל">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display font-medium text-lg mb-4">קהילות AI ששווה להצטרף אליהן</h3>
            <p className="text-muted-foreground mb-4">
              עדכונים שוטפים על עולם הבינה המלאכותית, טיפים וכלים שימושיים
            </p>
            
            <div className="flex flex-col space-y-3">
              <a 
                href="https://www.youtube.com/@sgolan20" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <i className="fab fa-youtube text-xl ml-2"></i>
                <div>
                  <p className="font-medium">ערוץ היוטיוב שלי</p>
                  <p className="text-xs">סרטונים והדרכות על כלי AI וטכנולוגיות חדשות</p>
                </div>
              </a>
              
              <a 
                href="https://whatsapp.com/channel/0029VbAUMkz6rsQkIw39w91o" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <i className="fab fa-whatsapp text-xl ml-2"></i>
                <div>
                  <p className="font-medium">ערוץ העדכונים בוואטסאפ</p>
                  <p className="text-xs">פוסטים ועדכונים על AI פעם עד פעמיים בשבוע</p>
                </div>
              </a>
              
              <a 
                href="http://t.me/sgolanai" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <i className="fab fa-telegram text-xl ml-2"></i>
                <div>
                  <p className="font-medium">ערוץ העדכונים בטלגרם</p>
                  <p className="text-xs">תוכן וטיפים שימושיים לשימוש ב-AI</p>
                </div>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm text-center mx-auto mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} שחר גולן. כל הזכויות שמורות.
          </p>
          <button onClick={scrollToTop} className="mt-4 md:mt-0 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors" aria-label="חזרה למעלה">
            חזרה למעלה
            <ArrowUp size={16} className="mr-1" />
          </button>
        </div>
      </div>
    </footer>;
};
export default Footer;
