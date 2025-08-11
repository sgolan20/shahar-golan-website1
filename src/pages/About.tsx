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
                <img src="/lovable-uploads/IMG-20250219-WA0074.jpg" alt="שחר גולן" className="w-full h-full object-cover" />
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
              <h2 className="text-3xl font-bold mb-6">היתרונות שתקבלו</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                תהנו מהדרכות המותאמות במדויק לצרכים שלכם, שהופכות מושגים מורכבים לפשוטים ומעשיים.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full text-primary mr-3 mt-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">תוכן המותאם לצרכים שלכם</h3>
                    <p className="text-muted-foreground">תקבלו הדרכה מותאמת בדיוק לאתגרים ולמטרות של הארגון שלכם, עם דוגמאות מעולם התוכן שלכם</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full text-primary mr-3 mt-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">הבנה מהירה של טכנולוגיות מורכבות</h3>
                    <p className="text-muted-foreground">גם ללא רקע טכני, תוכלו להבין ולהשתמש בכלי AI מתקדמים דרך הסברים פשוטים ודוגמאות מוחשיות</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full text-primary mr-3 mt-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">יישום מיידי בעבודה</h3>
                    <p className="text-muted-foreground">תצאו עם כלים פרקטיים שתוכלו ליישם כבר למחרת, ותראו תוצאות ושיפור ביעילות באופן מיידי</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full text-primary mr-3 mt-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">הישארו בחזית הטכנולוגיה</h3>
                    <p className="text-muted-foreground">תהיו מעודכנים בכל החידושים האחרונים והדרכים לנצל אותם לטובת העסק והקריירה שלכם</p>
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
