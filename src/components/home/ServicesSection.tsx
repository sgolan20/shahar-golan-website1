
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Lightbulb, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  hidden: {
    y: 20,
    opacity: 0
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const ServicesSection = () => {
  return (
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
  );
};

export default ServicesSection;
