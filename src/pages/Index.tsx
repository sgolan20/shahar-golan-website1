
import { useState, useEffect, useRef } from "react";
import { ArrowRight, BookOpen, Users, Lightbulb, Youtube, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Simulated blog data
const blogPosts = [
  {
    id: 1,
    title: "5 כלי AI חדשים שישנו את דרך העבודה שלכם",
    excerpt: "הכירו את הכלים החדשניים ביותר בתחום הבינה המלאכותית שיכולים לשפר את הפרודוקטיביות שלכם",
    date: "15 במאי, 2023",
    slug: "/blog/5-new-ai-tools"
  },
  {
    id: 2,
    title: "איך להשתמש ב-ChatGPT ליצירת תוכן איכותי",
    excerpt: "מדריך מעשי לשימוש ב-ChatGPT ליצירת תוכן שיווקי, מקצועי ויצירתי",
    date: "3 באפריל, 2023",
    slug: "/blog/chatgpt-content-creation"
  },
  {
    id: 3,
    title: "בינה מלאכותית בשירות העסק הקטן",
    excerpt: "כיצד עסקים קטנים יכולים להשתמש בכלי AI כדי להתחרות בשוק ולצמוח",
    date: "21 במרץ, 2023",
    slug: "/blog/ai-for-small-businesses"
  }
];

// Framer Motion variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const StatNumber = ({ value, label }: { value: string, label: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [targetValue] = useState(parseInt(value.replace(/,/g, "")));
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        const timer = setTimeout(() => {
          const steps = 50;
          const increment = targetValue / steps;
          let current = 0;
          
          const interval = setInterval(() => {
            current += increment;
            if (current >= targetValue) {
              setCount(targetValue);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, 20);
          
          return () => clearInterval(interval);
        }, 400);
        
        return () => clearTimeout(timer);
      }
    }, { threshold: 0.1 });
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [targetValue]);
  
  return (
    <div className="text-center" ref={ref}>
      <div className="text-4xl font-bold mb-2 text-gradient">
        {count.toLocaleString('en-US')}+
      </div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
};

const Index = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gray-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-b from-white/90 to-transparent z-0" />
          <div className="absolute w-96 h-96 bg-purple-200 rounded-full -top-12 -right-12 filter blur-3xl opacity-20" />
          <div className="absolute w-96 h-96 bg-purple-300 rounded-full bottom-0 left-1/3 filter blur-3xl opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-right"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                הבינה המלאכותית כבר כאן,<br />
                <span className="text-gradient">בואו נלמד להשתמש בה</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mr-0 lg:ml-auto">
                מרצה ל-GEN-AI ומומחה להטמעת כלים חדשניים בעולם העבודה והחיים האישיים
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-end gap-4">
                <Button asChild size="lg" className="btn-shine">
                  <Link to="/contact">
                    תיאום הרצאה
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button asChild size="lg" variant="outline">
                  <Link to="/about">למד עוד עליי</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                  alt="שחר גולן" 
                  className="w-full h-auto object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <p className="text-xl font-bold">שחר גולן</p>
                    <p className="text-sm">מרצה ל-GEN-AI ובינה מלאכותית</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatNumber value="6000" label="מנויים בערוץ היוטיוב" />
            <StatNumber value="150" label="הרצאות וסדנאות" />
            <StatNumber value="1000" label="צפיות יומיות" />
          </div>
        </div>
      </section>

      {/* Showreel Video Section */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-purple-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">צפו בהרצאות שלי</h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              סרטון קצר שמציג את סגנון ההרצאות, הסדנאות והקורסים שאני מעביר בנושאי בינה מלאכותית
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative aspect-video rounded-xl overflow-hidden shadow-2xl"
            >
              {/* כאן תוכל להחליף את סרטון הדוגמה בסרטון השואוריל האמיתי שלך */}
              <video 
                ref={videoRef}
                poster="https://images.unsplash.com/photo-1551818255-e6e10975bc17" 
                className="w-full h-full object-cover"
                controls={isVideoPlaying}
              >
                <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4" />
                הדפדפן שלך לא תומך בתגית וידאו.
              </video>
              
              {!isVideoPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                  onClick={handlePlayVideo}
                >
                  <div className="bg-white/90 rounded-full p-4 shadow-lg transform transition-transform hover:scale-110">
                    <Play className="h-12 w-12 text-purple-600 fill-current" />
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* YouTube Channel Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">ערוץ היוטיוב שלי</h2>
              <p className="text-lg mb-6 text-muted-foreground">
                בערוץ היוטיוב שלי אני מעלה באופן קבוע תוכן חינמי ואיכותי על כלי AI חדשים, טיפים, והדרכות מעשיות. הצטרפו לקהילה של למעלה מ-6,000 עוקבים וקבלו עדכונים על כל החידושים בעולם הבינה המלאכותית.
              </p>
              <Button asChild className="btn-shine">
                <a 
                  href="https://www.youtube.com/channel/UCxxxxxxxx" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Youtube className="ml-2 h-5 w-5" />
                  לערוץ היוטיוב
                </a>
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white rounded-xl p-2 shadow-lg transform rotate-3 hover:rotate-0 transition-all duration-300">
                <div className="aspect-video w-full max-w-md overflow-hidden rounded-lg shadow-inner bg-gray-800">
                  <img 
                    src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0" 
                    alt="ערוץ היוטיוב" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 rounded-full p-4 shadow-lg">
                      <Youtube className="h-10 w-10 text-red-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">תמונות מהרצאות וסדנאות</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              רגעים נבחרים מהרצאות וסדנאות שהעברתי בארגונים שונים ברחבי הארץ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-xl shadow-md"
            >
              <img 
                src="https://images.unsplash.com/photo-1551818255-e6e10975bc17" 
                alt="הרצאה 1" 
                className="w-full h-64 md:h-72 object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-xl shadow-md"
            >
              <img 
                src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                alt="הרצאה 2" 
                className="w-full h-64 md:h-72 object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="overflow-hidden rounded-xl shadow-md"
            >
              <img 
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
                alt="סדנה" 
                className="w-full h-64 md:h-72 object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">השירותים שלי</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              פתרונות מותאמים אישית להטמעת בינה מלאכותית בארגון שלכם
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="card-hover">
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">הרצאות לארגונים</h3>
                  <p className="text-muted-foreground mb-4">
                    הרצאות מרתקות לארגונים וחברות, מותאמות לצרכים הספציפיים של הקהל והארגון.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/contact" className="flex items-center text-primary">
                      תיאום הרצאה
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="card-hover">
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                    <Lightbulb className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">סדנאות מעשיות</h3>
                  <p className="text-muted-foreground mb-4">
                    סדנאות פרקטיות ומעשיות להקניית כלים ומיומנויות בעבודה עם טכנולוגיות AI.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/contact" className="flex items-center text-primary">
                      מידע על סדנאות
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants} className="card-hover">
              <Card className="h-full">
                <CardContent className="pt-6">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 text-primary">
                    <BookOpen className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">קורסים ממוקדים</h3>
                  <p className="text-muted-foreground mb-4">
                    קורסים ממוקדים בכלי בינה מלאכותית שונים, מותאמים לקהל היעד ולרמת הידע הקיימת.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/contact" className="flex items-center text-primary">
                      פרטים על קורסים
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">מאמרים אחרונים</h2>
            <Button asChild variant="outline">
              <Link to="/blog" className="flex items-center">
                לכל המאמרים
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.div 
                key={post.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full card-hover">
                  <CardContent className="p-6">
                    <p className="text-sm text-muted-foreground mb-3">{post.date}</p>
                    <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <Button asChild variant="link" className="p-0 h-auto">
                      <Link to={post.slug} className="flex items-center text-primary">
                        קרא עוד
                        <ArrowRight className="mr-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Unique Value Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">הייתרון שלי</h2>
            <p className="text-xl mb-8 leading-relaxed">
              היכולת שלי למקד את התוכן לקהל היעד הספציפי ולהציג נושאים מורכבים בצורה נגישה ופשוטה הופכת את הלמידה לחוויה אפקטיבית ונעימה לכל המשתתפים.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-right">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">התאמה אישית</h3>
                <p className="text-muted-foreground">כל הרצאה וסדנה מותאמת לצרכים והאתגרים הספציפיים של קהל היעד והארגון.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">הנגשת מידע מורכב</h3>
                <p className="text-muted-foreground">הפיכת מושגים ותהליכים מורכבים לפשוטים ומובנים לכל רמת ידע.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">פרקטיקה ותיאוריה</h3>
                <p className="text-muted-foreground">שילוב בין הבנה תיאורטית לבין יישום מעשי של הכלים הנלמדים.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-2">חוויית למידה</h3>
                <p className="text-muted-foreground">יצירת חוויית למידה מעניינת, אינטראקטיבית ובלתי נשכחת.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-700 to-purple-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            מוכנים להכיר את עולם הבינה המלאכותית?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            צרו קשר היום להזמנת הרצאה, סדנה או לכל שאלה אחרת
          </p>
          <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
            <Link to="/contact">
              צור קשר
              <ArrowRight className="mr-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
