
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Youtube, BookOpen, Calendar } from "lucide-react";
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
  return (
    <div dir="rtl">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gray-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-b from-white/90 to-transparent z-0" />
          <div className="absolute w-96 h-96 bg-purple-200 rounded-full -top-12 -right-12 filter blur-3xl opacity-20" />
          <div className="absolute w-96 h-96 bg-purple-300 rounded-full bottom-0 left-1/3 filter blur-3xl opacity-20" />
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              הבינה המלאכותית כבר כאן,<br />
              <span className="text-gradient">בואו נלמד להשתמש בה</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              מרצה ל-GEN-AI ומומחה להטמעת כלים חדשניים בעולם העבודה והחיים האישיים
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
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
              מגוון דרכים ללמוד על הכלים החדשניים ביותר בעולם הבינה המלאכותית
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
                    <Calendar className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">הרצאות וסדנאות</h3>
                  <p className="text-muted-foreground mb-4">
                    הרצאות מרתקות וסדנאות מעשיות לארגונים, חברות וכנסים מקצועיים.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/contact" className="flex items-center text-primary">
                      קבע הרצאה
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
                    <Youtube className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">ערוץ יוטיוב</h3>
                  <p className="text-muted-foreground mb-4">
                    תוכן חינמי ואיכותי על כלי AI חדשניים, טיפים ומדריכים שימושיים.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <a 
                      href="https://www.youtube.com/channel/UCxxxxxxxx" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center text-primary"
                    >
                      לערוץ היוטיוב
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </a>
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
                  <h3 className="text-xl font-semibold mb-3">בלוג</h3>
                  <p className="text-muted-foreground mb-4">
                    מאמרים מעמיקים ועדכניים על בינה מלאכותית, כלים חדשים ומגמות בתחום.
                  </p>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to="/blog" className="flex items-center text-primary">
                      לבלוג
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
