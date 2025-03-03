
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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

const BlogSection = () => {
  return (
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
          {blogPosts.map(post => (
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
  );
};

export default BlogSection;
