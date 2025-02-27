
import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, User, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Simulated blog data
const blogPosts = [
  {
    id: 1,
    title: "5 כלי AI חדשים שישנו את דרך העבודה שלכם",
    excerpt: "הכירו את הכלים החדשניים ביותר בתחום הבינה המלאכותית שיכולים לשפר את הפרודוקטיביות שלכם",
    date: "15 במאי, 2023",
    author: "שחר גולן",
    readTime: "5 דקות",
    slug: "/blog/5-new-ai-tools",
    category: "כלים חדשים"
  },
  {
    id: 2,
    title: "איך להשתמש ב-ChatGPT ליצירת תוכן איכותי",
    excerpt: "מדריך מעשי לשימוש ב-ChatGPT ליצירת תוכן שיווקי, מקצועי ויצירתי",
    date: "3 באפריל, 2023",
    author: "שחר גולן",
    readTime: "7 דקות",
    slug: "/blog/chatgpt-content-creation",
    category: "מדריכים"
  },
  {
    id: 3,
    title: "בינה מלאכותית בשירות העסק הקטן",
    excerpt: "כיצד עסקים קטנים יכולים להשתמש בכלי AI כדי להתחרות בשוק ולצמוח",
    date: "21 במרץ, 2023",
    author: "שחר גולן",
    readTime: "6 דקות",
    slug: "/blog/ai-for-small-businesses",
    category: "עסקים"
  },
  {
    id: 4,
    title: "עתיד עולם העבודה עם בינה מלאכותית",
    excerpt: "איך הבינה המלאכותית תשנה את שוק העבודה בשנים הקרובות, והאם המקצוע שלך בסיכון?",
    date: "14 בפברואר, 2023",
    author: "שחר גולן",
    readTime: "8 דקות",
    slug: "/blog/future-of-work-with-ai",
    category: "עתיד העבודה"
  },
  {
    id: 5,
    title: "מבוא לבינה מלאכותית למתחילים",
    excerpt: "מדריך בסיסי להבנת עולם הבינה המלאכותית ומושגי היסוד שחשוב להכיר",
    date: "2 בינואר, 2023",
    author: "שחר גולן",
    readTime: "10 דקות",
    slug: "/blog/ai-introduction-for-beginners",
    category: "בסיסי"
  },
  {
    id: 6,
    title: "האם ל-AI יש מקום בעולם היצירתיות?",
    excerpt: "דיון על היכולות היצירתיות של בינה מלאכותית והאם היא יכולה להחליף יוצרים אנושיים",
    date: "12 בדצמבר, 2022",
    author: "שחר גולן",
    readTime: "9 דקות",
    slug: "/blog/ai-and-creativity",
    category: "יצירתיות"
  },
];

// All unique categories
const allCategories = ["הכל", ...Array.from(new Set(blogPosts.map(post => post.category)))];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("הכל");

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "הכל" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">הבלוג</h1>
            <p className="text-xl text-muted-foreground">
              מאמרים, חדשות ועדכונים בעולם הבינה המלאכותית
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
            <div className="w-full md:w-auto relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="חיפוש מאמרים..."
                className="pr-10 w-full md:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {allCategories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="min-w-16"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Blog Posts */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ y: -5 }}
                >
                  <Link to={post.slug} className="block h-full">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full hover:shadow-md transition-shadow duration-300">
                      <div className="h-48 overflow-hidden bg-gray-200">
                        <img
                          src={`https://picsum.photos/600/400?random=${post.id}`}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-medium text-white bg-primary px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <Calendar size={14} className="ml-1" />
                            {post.date}
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <User size={14} className="ml-1" />
                            {post.author}
                          </div>
                          <div className="flex items-center">
                            <Clock size={14} className="ml-1" />
                            {post.readTime}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">לא נמצאו מאמרים</h3>
              <p className="text-muted-foreground">נסה לחפש מושגים אחרים או לבחור קטגוריה אחרת</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">הישאר מעודכן</h2>
            <p className="text-lg text-muted-foreground mb-8">
              הירשם לניוזלטר שלי וקבל עדכונים על מאמרים חדשים וחדשות מעולם הבינה המלאכותית
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="האימייל שלך"
                className="flex-grow"
              />
              <Button>הרשמה</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
