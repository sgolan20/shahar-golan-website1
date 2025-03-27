import { motion } from "framer-motion";
import { BookOpen, Users, Lightbulb, Youtube, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const About = () => {
  return <div>
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto text-center" initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5
        }}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">אודות</h1>
            <p className="text-xl text-muted-foreground">
              מי אני? אני שחר, מרצה לבינה מלאכותית, חוקר ולומד כל יום את עולם ה-AI ומוביל את קהילת לומדים AI
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="שחר גולן" className="w-full h-full object-cover" />
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              <h2 className="text-3xl font-bold mb-6">שחר גולן</h2>

              <p className="text-lg mb-4 text-muted-foreground">
                שלום! אני שחר, מרצה ומלמד בינה מלאכותית ו-GEN-AI. אני אוהב לחלוק ידע ולהפוך טכנולוגיות חדשניות לנגישות ומובנות לכולם.
              </p>

              <p className="text-lg mb-4 text-muted-foreground">
                בשנים האחרונות, שקעתי בלימוד, ניסוי והוראה של כלי AI מתקדמים. המטרה שלי פשוטה - לעזור לאנשים וארגונים להשתמש בטכנולוגיה בצורה חכמה שתשפר את חיי היומיום והעבודה שלהם.
              </p>

              <p className="text-lg mb-4 text-muted-foreground">
                נהנה במיוחד להתאים את התוכן לקהל היעד ולקחת נושאים מורכבים ולהפוך אותם לקלים להבנה. זה פשוט משהו שאני טוב בו וכיף לי לעשות.
              </p>

              <p className="text-lg mb-8 text-muted-foreground">
                אני חי ונושם AI ואת האפשרויות המעשיות שהוא מביא לחיינו. בוא נגלה יחד איך אפשר לרתום את הטכנולוגיה הזו לפרויקטים מעניינים, לפתרון בעיות אמיתיות, ולהפוך רעיונות לתוצאות מוחשיות.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild className="btn-shine">
                  <Link to="/contact">צור קשר</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href="https://www.youtube.com/@sgolan20" target="_blank" rel="noopener noreferrer" className="bg-red-600 text-white hover:bg-red-700 border-red-600 hover:border-red-700 flex items-center">
                    <Youtube className="ml-2 h-5 w-5" />
                    לערוץ היוטיוב
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience & Expertise */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }}>
            <h2 className="text-3xl font-bold mb-4">השירותים שלי</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              תחומי העיסוק והמומחיות העיקריים שלי בעולם הבינה המלאכותית
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.3,
            delay: 0.1
          }} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">הרצאות לארגונים</h3>
              <p className="text-muted-foreground">
                הרצאות מותאמות אישית לארגונים וחברות, המציגות את עולם הבינה המלאכותית בצורה נגישה ומרתקת.
              </p>
              <Link to="/custom-lecture" className="inline-flex items-center mt-4 text-primary hover:underline">
                למידע נוסף
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.3,
            delay: 0.2
          }} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">סדנאות מעשיות</h3>
              <p className="text-muted-foreground">
                סדנאות פרקטיות המקנות כלים ומיומנויות מעשיות לשימוש בטכנולוגיות AI בעולם העבודה והחיים האישיים.
              </p>
              <Link to="/focused-workshop" className="inline-flex items-center mt-4 text-primary hover:underline">
                לפרטי הסדנאות
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.3,
            delay: 0.3
          }} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">קורסים ממוקדים</h3>
              <p className="text-muted-foreground">
                קורסים ייעודיים בנושאי בינה מלאכותית, המותאמים לרמת הידע וצרכי הלומדים, ומשלבים תיאוריה עם יישום מעשי.
              </p>
              <Link to="/focused-course" className="inline-flex items-center mt-4 text-primary hover:underline">
                לתוכן הקורסים
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.3,
            delay: 0.4
          }} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                <Youtube className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">תוכן דיגיטלי</h3>
              <p className="text-muted-foreground">
                תוכן מקצועי ואיכותי בערוץ היוטיוב שלי, המציע מדריכים, טיפים וסקירות על כלי AI חדשניים לקהל הרחב.
              </p>
              <a href="https://www.youtube.com/@sgolan20" target="_blank" rel="noopener noreferrer" className="inline-flex items-center mt-4 text-primary hover:underline">
                לערוץ היוטיוב
                <ArrowRight className="mr-2 h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Unique Value Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }}>
              <h2 className="text-3xl font-bold mb-6">היתרון שלי</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                היכולת שלי למקד את התוכן לקהל היעד הספציפי ולהציג נושאים מורכבים בצורה נגישה ופשוטה היא מה שמייחד את ההרצאות והסדנאות שלי.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full text-primary mr-3 mt-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">התאמה אישית</h3>
                    <p className="text-muted-foreground">התוכן מותאם לצרכים, לרמת הידע ולאתגרים הספציפיים של קהל היעד</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full text-primary mr-3 mt-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">פישוט מושגים מורכבים</h3>
                    <p className="text-muted-foreground">הסברת רעיונות ותהליכים מורכבים בצורה פשוטה וברורה לכל רמת ידע</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full text-primary mr-3 mt-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">שילוב תיאוריה ומעשה</h3>
                    <p className="text-muted-foreground">חיבור בין עקרונות תיאורטיים ליישומים מעשיים שניתן להטמיע מיד</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full text-primary mr-3 mt-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">התעדכנות מתמדת</h3>
                    <p className="text-muted-foreground">עדכון שוטף בכל החידושים והפיתוחים האחרונים בעולם הבינה המלאכותית</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div initial={{
            opacity: 0,
            x: 20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.3
          }} className="relative">
              <div className="aspect-square bg-gray-50 rounded-2xl p-8 shadow-inner">
                <div className="absolute -top-6 -right-6 bg-purple-100 p-4 rounded-xl shadow-lg transform rotate-6">
                  <h3 className="text-2xl font-bold text-primary">150+</h3>
                  <p className="text-sm">הרצאות וסדנאות</p>
                </div>
                <img src="/lovable-uploads/76f2cafb-36e3-43b9-a0a5-a5fb11f41703.png" alt="הרצאה" className="w-full h-full object-cover rounded-xl shadow-lg" />
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-500 to-purple-700 p-4 rounded-xl shadow-lg text-white transform -rotate-3">
                  <h3 className="text-lg font-bold">המורכב לפשוט</h3>
                  <p className="text-sm">בינה מלאכותית לכל אחד</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12" initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.5
        }}>
            <h2 className="text-3xl font-bold mb-4">מה אומרים עליי</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              משוב מארגונים וחברות שעבדתי איתם
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{
            opacity: 0,
            x: -20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5
          }} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-lg mb-6 flex-grow">
                  ההרצאה של שחר הייתה מרתקת ומעשית. הוא הצליח להנגיש את עולם הבינה המלאכותית לכל העובדים, מהמנהלים ועד אנשי התפעול, והדגים שימושים מעשיים שכבר משפרים את העבודה שלנו.
                </p>
                <footer>
                  <p className="font-semibold">דנה כהן</p>
                  <p className="text-muted-foreground">מנהלת משאבי אנוש, חברת היי-טק</p>
                </footer>
              </div>
            </motion.div>

            <motion.div initial={{
            opacity: 0,
            x: 20
          }} whileInView={{
            opacity: 1,
            x: 0
          }} viewport={{
            once: true
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }} className="bg-white p-8 rounded-xl shadow-sm">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <svg className="h-8 w-8 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-lg mb-6 flex-grow">
                  הסדנה ששחר העביר לצוות המכירות שלנו פתחה לנו את העיניים לאפשרויות הרבות שכלי ה-AI מציעים. בתוך שבועיים כבר ראינו שיפור משמעותי בתהליכי העבודה והיעילות של הצוות.
                </p>
                <footer>
                  <p className="font-semibold">יוסי לוי</p>
                  <p className="text-muted-foreground">סמנכ"ל מכירות, חברת פינטק</p>
                </footer>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-700 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            מעוניינים בהרצאה או סדנה?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            אשמח לדבר על הצרכים הספציפיים של הארגון שלכם ולהתאים הרצאה או סדנה בהתאם
          </p>
          <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
            <Link to="/contact">
              צור קשר
            </Link>
          </Button>
        </div>
      </section>
    </div>;
};
export default About;
