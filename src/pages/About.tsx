
import { motion } from "framer-motion";
import { MessageSquare, Youtube, BookOpen, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div dir="rtl">
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">אודות</h1>
            <p className="text-xl text-muted-foreground">
              קצת על הרקע שלי, הניסיון והמומחיות בעולם הבינה המלאכותית
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
                  alt="שחר גולן"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6">שחר גולן</h2>

              <p className="text-lg mb-4 text-muted-foreground">
                שלום! אני שחר, מרצה ומומחה לבינה מלאכותית ו-GEN-AI, עם התמחות בהנגשת הטכנולוגיות החדשניות ביותר לקהל הרחב.
              </p>

              <p className="text-lg mb-4 text-muted-foreground">
                במשך השנים האחרונות, הקדשתי את עצמי ללימוד, מחקר והוראה של כלי AI מתקדמים, במטרה לעזור לאנשים וארגונים להשתמש בהם באופן יעיל ומועיל בחיי היום יום והעבודה.
              </p>

              <p className="text-lg mb-8 text-muted-foreground">
                אני מאמין שהבינה המלאכותית היא לא רק עתיד הטכנולוגיה, אלא ההווה שלה, וחשוב לי להנגיש את הידע הזה לכמה שיותר אנשים בצורה ברורה ומעשית.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild className="btn-shine">
                  <Link to="/contact">צור קשר</Link>
                </Button>
                <Button asChild variant="outline">
                  <a 
                    href="https://www.youtube.com/channel/UCxxxxxxxx" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
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
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">ניסיון ומומחיות</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              תחומי העיסוק והמומחיות העיקריים שלי בעולם הבינה המלאכותית
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">הרצאות וסדנאות</h3>
              <p className="text-muted-foreground">
                הרצאות מרתקות וסדנאות מעשיות לארגונים, חברות וכנסים בתחום הבינה המלאכותית.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                <Youtube className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">תוכן חינוכי</h3>
              <p className="text-muted-foreground">
                יצירת תוכן חינוכי מקצועי ונגיש בערוץ היוטיוב שלי עם למעלה מ-6,000 מנויים.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">מחקר וכתיבה</h3>
              <p className="text-muted-foreground">
                מחקר מעמיק וכתיבה של מאמרים מקצועיים על התפתחויות וטרנדים בעולם הבינה המלאכותית.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                <Lightbulb className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">ייעוץ לארגונים</h3>
              <p className="text-muted-foreground">
                ייעוץ אסטרטגי לארגונים בתהליכי אימוץ והטמעה של טכנולוגיות בינה מלאכותית.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">מה אומרים עליי</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              משוב מארגונים וחברות שעבדתי איתם
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 p-8 rounded-xl shadow-sm"
            >
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

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 p-8 rounded-xl shadow-sm"
            >
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
    </div>
  );
};

export default About;
