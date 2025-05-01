import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Lightbulb, BookOpen, Coffee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Framer Motion variants
const containerVariants = {
  hidden: {
    opacity: 0
  },
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
  const services = [{
    icon: <BookOpen className="h-8 w-8" />,
    title: "קורסים ממוקדים",
    description: "קורסים ממוקדים בכלי בינה מלאכותית שונים, מותאמים לקהל היעד ולרמת הידע הקיימת.",
    link: "/focused-course",
    linkText: "פרטים על קורסים",
    bgImage: "/lovable-uploads/96348fd7-1c9e-49f8-b9c6-4ea486dfd787.png"
  }, {
    icon: <Users className="h-8 w-8" />,
    title: "הרצאות לארגונים",
    description: "הרצאות מרתקות לארגונים וחברות, מותאמות לצרכים הספציפיים של הקהל והארגון.",
    link: "/custom-lecture",
    linkText: "תיאום הרצאה",
    bgImage: "/lovable-uploads/0d68aedf-beb7-45ae-a23f-322fa1fa7d84.png"
  }, {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "סדנאות מעשיות",
    description: "סדנאות פרקטיות ומעשיות להקניית כלים ומיומנויות בעבודה עם טכנולוגיות AI.",
    link: "/focused-workshop",
    linkText: "מידע על סדנאות",
    bgImage: "/lovable-uploads/8bdd9e5e-cba8-433d-881f-2701802d539e.png"
  }, {
    icon: <Coffee className="h-8 w-8" />,
    title: "סדנת היכרות",
    description: "צעד ראשון להיכרות עם עולם הבינה המלאכותית, מתאים למתחילים.",
    link: "/intro-workshop",
    linkText: "הרשמה לסדנה",
    bgImage: "/lovable-uploads/3ad19a3f-7fcb-4dec-b9ff-7dc0a5aaa713.png"
  }];
  return <section className="py-20 bg-gray-50" id="services">
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
          <h2 className="text-4xl md:text-5xl font-extrabold mb-5 bg-clip-text text-transparent bg-brand-gradient">מה הכי מתאים לכם?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-light">הדרכות <span className="font-semibold">מותאמות אישית</span> להטמעת בינה מלאכותית בחברה שלכם</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{
        once: true
      }}>
          {services.map((service, index) => <motion.div key={index} variants={itemVariants} className="card-hover group" whileHover={{
          y: -5,
          transition: {
            duration: 0.2
          }
        }}>
              <Link to={service.link} className="block h-full">
                <Card className="h-full overflow-hidden border-primary/10 hover:border-primary transition-colors duration-300">
                  <div className="h-60 bg-cover bg-center relative transition-all group-hover:scale-105 duration-700" style={{
                backgroundImage: `url(${service.bgImage})`
              }}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-[#4a52a3]/20 group-hover:from-black/60 group-hover:to-[#4aaba3]/10 transition-colors duration-300"></div>
                  </div>
                  <CardContent className="pt-6 relative">
                    <div className="bg-brand-gradient p-4 rounded-full w-18 h-18 flex items-center justify-center mb-4 text-white absolute -top-9 right-6 border-4 border-white shadow-lg hover-scale glow">
                      {service.icon}
                    </div>
                    <div className="pt-8">
                      <h3 className="text-2xl font-bold mb-4 text-gray-800">{service.title}</h3>
                      <p className="text-gray-500 mb-5 text-base font-light leading-relaxed">
                        {service.description}
                      </p>
                      <Button asChild className="rounded-full py-2 px-5 text-sm md:text-base mt-2 shadow-md hover:shadow-xl transition-all w-full justify-center">
                        <span className="flex items-center text-white font-medium">
                          {service.linkText}
                          <ArrowRight className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
};
export default ServicesSection;