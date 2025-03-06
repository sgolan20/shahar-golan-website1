
import { Link } from "react-router-dom";
import { Youtube, Linkedin, Mail, ArrowUp } from "lucide-react";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  return <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-display font-bold text-gradient mb-4 inline-block">
              שחר גולן
            </Link>
            <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
              מרצה ל-GEN-AI ובינה מלאכותית, מלמד כיצד להשתמש בכלים מתקדמים בחיי היום יום והעבודה.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a href="https://www.youtube.com/channel/UCxxxxxxxx" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors" aria-label="ערוץ יוטיוב">
                <Youtube size={20} />
              </a>
              <a href="https://www.linkedin.com/in/shahargolan" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors" aria-label="לינקדאין">
                <Linkedin size={20} />
              </a>
              <a href="mailto:sgolan20@gmail.com" className="text-gray-600 hover:text-primary transition-colors" aria-label="אימייל">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display font-medium text-lg mb-4">ניווט מהיר</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">בית</Link>
              <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">אודות</Link>
              <Link to="/why-me" className="text-muted-foreground hover:text-primary transition-colors">למה אני?</Link>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">בלוג</Link>
              <Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">צור קשר</Link>
            </nav>
          </div>
          
          <div className="md:col-span-1">
            <h3 className="font-display font-medium text-lg mb-4">צור קשר</h3>
            <p className="text-muted-foreground mb-2">
              מעוניינים בהרצאה, סדנה או קורס מותאם אישית?
            </p>
            <a href="mailto:sgolan20@gmail.com" className="text-primary font-medium hover:underline">sgolan20@gmail.com</a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
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
