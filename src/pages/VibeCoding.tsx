import { motion } from "framer-motion";
import { Calendar, Code, Zap, CheckCircle, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const VibeCoding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white overflow-hidden">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 flex justify-between items-center">
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#06b6d4]">
          VIBECODING
        </div>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] hover:opacity-90 transition-all"
        >
          הרשמה לקורס
        </Button>
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute w-96 h-96 bg-[#4f46e5] rounded-full -top-12 -right-12 filter blur-3xl opacity-20" />
          <div className="absolute w-96 h-96 bg-[#06b6d4] rounded-full bottom-0 left-1/3 filter blur-3xl opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#06b6d4]">
                VIBECODING
              </span>
              <br />
              <span>יצירת קוד בעזרת AI</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
              קורס מעשי בן 3 מפגשים שיאפשר לך ליצור את האתר, האפליקציה או הכלי שתמיד רצית - גם אם אין לך ניסיון קודם בתכנות
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] hover:opacity-90 transition-all text-lg py-6"
              >
                הרשמה לקורס
                <Zap className="mr-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="border-gray-500 text-gray-300 hover:bg-gray-800 text-lg py-6"
              >
                מידע נוסף
                <ExternalLink className="mr-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Course Details */}
      <section className="py-16 md:py-24 bg-[#1e293b]/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#06b6d4]">
                על הקורס
              </span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <div className="bg-[#0f172a]/60 p-6 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-[#4f46e5]/20 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-[#4f46e5]" />
                </div>
                <h3 className="text-xl font-bold mb-3">3 מפגשים</h3>
                <p className="text-gray-400">
                  שלושה מפגשים בני שעה כל אחד בזום, עם תרגול מעשי ותמיכה אישית
                </p>
              </div>
              
              <div className="bg-[#0f172a]/60 p-6 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-[#06b6d4]/20 rounded-full flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-[#06b6d4]" />
                </div>
                <h3 className="text-xl font-bold mb-3">ללא ידע קודם</h3>
                <p className="text-gray-400">
                  לא נדרש ניסיון קודם בתכנות. הקורס מותאם לכל רמות הידע
                </p>
              </div>
              
              <div className="bg-[#0f172a]/60 p-6 rounded-xl border border-gray-700">
                <div className="w-12 h-12 bg-[#4f46e5]/20 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-[#4f46e5]" />
                </div>
                <h3 className="text-xl font-bold mb-3">יצירה מיידית</h3>
                <p className="text-gray-400">
                  תצאו עם תוצר מוחשי - אתר, אפליקציה או כלי שאתם צריכים
                </p>
              </div>
            </div>
            
            <div className="bg-[#0f172a]/60 p-8 rounded-xl border border-gray-700 mb-16">
              <h3 className="text-2xl font-bold mb-6 text-center">מה נלמד בקורס?</h3>
              
              <ul className="space-y-4 text-right" dir="rtl">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#06b6d4] flex-shrink-0" />
                  <span>איך ליצור אתר/אפליקציה/כלי בהתאמה אישית לצרכים שלכם</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#06b6d4] flex-shrink-0" />
                  <span>שימוש בכלי AI מתקדמים לכתיבת קוד (LOVABLE, WINDSURF)</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#06b6d4] flex-shrink-0" />
                  <span>עבודה עם GITHUB - ניהול קוד ושיתוף פעולה</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#06b6d4] flex-shrink-0" />
                  <span>העלאת האתר לאוויר עם NETLIFY - בחינם וללא צורך בשרת</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#06b6d4] flex-shrink-0" />
                  <span>עיצוב ממשק משתמש מקצועי ואינטראקטיבי</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-[#06b6d4] flex-shrink-0" />
                  <span>התאמת הפרויקט לצרכים האישיים שלכם</span>
                </li>
              </ul>
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#06b6d4]">
                  מחיר הקורס
                </span>
              </h3>
              <p className="text-3xl font-bold mb-2">₪XXX</p>
              <p className="text-gray-400 mb-8">עבור 3 מפגשים בני שעה + חומרי לימוד</p>
              
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] hover:opacity-90 transition-all text-lg py-6 px-8"
              >
                הרשמה לקורס
                <Zap className="mr-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Instructor */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#06b6d4]">
                המנחה
              </span>
            </h2>
            
            <div className="bg-[#0f172a]/60 p-8 rounded-xl border border-gray-700 flex flex-col md:flex-row gap-8 items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#4f46e5] flex-shrink-0">
                <img 
                  src="/images/shahar-golan.jpg" 
                  alt="שחר גולן" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="text-right" dir="rtl">
                <h3 className="text-2xl font-bold mb-3">שחר גולן</h3>
                <p className="text-gray-300 mb-4">
                  מרצה ומומחה לבינה מלאכותית, עם ניסיון רב בפיתוח תוכנה ובהוראת טכנולוגיה.
                  שחר מתמחה בהנגשת עולם התכנות והבינה המלאכותית לקהל הרחב, ומאמין שכל אחד יכול ליצור פתרונות טכנולוגיים לצרכים שלו.
                </p>
                
                <div className="flex gap-4">
                  <a 
                    href="https://www.youtube.com/@sgolan20" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#06b6d4] hover:text-[#4f46e5] transition-colors"
                  >
                    YouTube
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/shahargolan/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#06b6d4] hover:text-[#4f46e5] transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-[#1e293b]/50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#06b6d4]">
                שאלות נפוצות
              </span>
            </h2>
            
            <div className="space-y-6 text-right" dir="rtl">
              <div className="bg-[#0f172a]/60 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-2">האם אני צריך ידע קודם בתכנות?</h3>
                <p className="text-gray-400">
                  לא! הקורס מיועד גם למתחילים לחלוטין. נלמד להשתמש בכלי AI שיעזרו לך ליצור קוד גם ללא ניסיון קודם.
                </p>
              </div>
              
              <div className="bg-[#0f172a]/60 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-2">איך מתקיימים המפגשים?</h3>
                <p className="text-gray-400">
                  המפגשים מתקיימים בזום, כל מפגש נמשך שעה. תקבלו קישור לפני כל מפגש.
                </p>
              </div>
              
              <div className="bg-[#0f172a]/60 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-2">מה אני אדע לעשות בסוף הקורס?</h3>
                <p className="text-gray-400">
                  בסוף הקורס תדעו ליצור אתרים, אפליקציות או כלים בעזרת AI, להעלות אותם לאינטרנט ולתחזק אותם. תוכלו ליצור פרויקטים אישיים או עסקיים ללא צורך במתכנת.
                </p>
              </div>
              
              <div className="bg-[#0f172a]/60 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold mb-2">האם כל הכלים שנלמד הם בחינם?</h3>
                <p className="text-gray-400">
                  רוב הכלים שנשתמש בהם הם בחינם או כוללים תוכנית חינמית שמספיקה לצרכים אישיים. חלק מהכלים המתקדמים יותר עשויים להיות בתשלום, אך נציג גם חלופות חינמיות.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute w-96 h-96 bg-[#4f46e5] rounded-full top-1/3 -right-12 filter blur-3xl opacity-20" />
          <div className="absolute w-96 h-96 bg-[#06b6d4] rounded-full top-1/3 -left-12 filter blur-3xl opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4f46e5] to-[#06b6d4]">
                מוכנים להתחיל ליצור?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-10">
              הרשמו עכשיו לקורס VIBECODING והתחילו ליצור את הפרויקטים שתמיד חלמתם עליהם!
            </p>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-[#4f46e5] to-[#06b6d4] hover:opacity-90 transition-all text-xl py-7 px-10"
            >
              הרשמה לקורס
              <Zap className="mr-2 h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-[#0f172a] border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} שחר גולן. כל הזכויות שמורות.</p>
            <p className="mt-2">* חלק מהכלים המתקדמים עשויים להיות בתשלום. יוצגו גם חלופות חינמיות.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default VibeCoding;
