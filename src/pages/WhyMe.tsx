
import { motion } from "framer-motion";
import { 
  Lightbulb, 
  Users, 
  Heart, 
  CheckCheck, 
  Rocket, 
  GraduationCap,
  Target,
  Clock,
  BarChart3,
  Handshake
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const WhyMe = () => {
  const reasons = [
    {
      id: 1,
      title: "הדרכה מותאמת לצרכים שלכם",
      description: "לפני כל מפגש אני לומד את עולם התוכן שבו אתם עובדים ומזהה את הצרכים שלכם, כדי שההדרכה תהיה רלוונטית ומדויקת עבורכם.",
      icon: <Target className="h-12 w-12 text-primary" />
    },
    {
      id: 2,
      title: "התאמה אישית לכל משתתף",
      description: "אני מתאים את קצב ותוכן ההדרכה לרמה האישית של כל משתתף, כך שכולם יוכלו להפיק ממנה את המקסימום ולהתקדם בביטחון.",
      icon: <Users className="h-12 w-12 text-primary" />
    },
    {
      id: 3,
      title: "פישוט של מושגים מורכבים",
      description: "אני מתמחה בהסבר פשוט וברור של נושאים מורכבים. הכי חשוב לי שתצאו עם הבנה מעשית וברורה של כל שלב בדרך.",
      icon: <Lightbulb className="h-12 w-12 text-primary" />
    },
    {
      id: 4,
      title: "דגש על יישום מעשי",
      description: "ההדרכות שלי מתמקדות בתכל'ס, לא רק בתיאוריה. אני משתמש בדוגמאות אמיתיות מתוך עולם העבודה שלכם כדי שתוכלו ליישם מיד את מה שלמדתם.",
      icon: <CheckCheck className="h-12 w-12 text-primary" />
    },
    {
      id: 5,
      title: "קשר אישי ואכפתיות",
      description: "אני שם דגש על יצירת קשר אישי ואותנטי עם כל משתתף ומשתתפת, מתוך אמונה שהצלחת ההדרכה מבוססת קודם כל על קשר אמיתי ויחס אישי.",
      icon: <Heart className="h-12 w-12 text-primary" />
    },
    {
      id: 6,
      title: "הדגמות עדכניות בזמן אמת",
      description: "עולם ה-AI מתפתח במהירות, ובהדרכות שלי תראו איך עובדים בזמן אמת עם הכלים הכי עדכניים בשוק, לא מתוך סרטונים מוקלטים אלא מתוך התנסות אמיתית וחווייתית.",
      icon: <Clock className="h-12 w-12 text-primary" />
    },
    {
      id: 7,
      title: "קהילה פעילה ותומכת",
      description: "יש לי קהילה פעילה ותומכת ביוטיוב שמעידה על איכות ההדרכות שלי. אני מזמין אתכם להצטרף, לשאול שאלות ולהיות חלק מהלמידה המשותפת.",
      icon: <Users className="h-12 w-12 text-primary" />
    },
    {
      id: 8,
      title: "מידע עדכני ומבוסס",
      description: "אני משקיע הרבה זמן בלמידה והתעדכנות מתמדת, כך שתמיד תקבלו ממני את המידע החדש והמדויק ביותר בתחום ה-AI.",
      icon: <BarChart3 className="h-12 w-12 text-primary" />
    },
    {
      id: 9,
      title: "מומחיות בהטמעת AI בתהליכי עבודה קיימים",
      description: "פיתחתי ניסיון מעשי בהכנסת פתרונות AI לתוך תהליכים שכבר עובדים בארגונים, בלי לשבש את מה שכבר קיים, אלא לשפר אותו.",
      icon: <Rocket className="h-12 w-12 text-primary" />
    },
    {
      id: 10,
      title: "מחויבות אמיתית להצלחה שלכם",
      description: "כשאתם לומדים איתי, אתם מקבלים יותר מידע טכני – אתם מקבלים את התשוקה שלי לתחום, את המחויבות שלי להצלחה שלכם, ואת הניסיון המעשי שלי שאותו אשמח לחלוק אתכם.",
      icon: <GraduationCap className="h-12 w-12 text-primary" />
    },
  ];

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
            <h1 className="text-4xl md:text-5xl font-bold mb-6">למה מרצה לבינה מלאכותית?</h1>
            <p className="text-xl text-muted-foreground">
              10 סיבות ללמוד AI דווקא איתי
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content - Reasons */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border-none">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center md:items-start text-center md:text-right space-y-4">
                      <div className="p-3 rounded-md bg-purple-50">
                        {reason.icon}
                      </div>
                      <h3 className="text-xl font-bold">{reason.title}</h3>
                      <p className="text-muted-foreground">{reason.description}</p>
                      
                      {/* Placeholder for potential video or image */}
                      {/* {reason.id === 5 && (
                        
                      )} */}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">מוכנים להתחיל?</h2>
            <p className="text-xl mb-8">
              צרו קשר עוד היום ונתחיל את המסע שלכם לעולם חדש של אפשרויות עם בינה מלאכותית
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full sm:w-auto"
                >
                  צרו קשר
                </a>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href="https://www.youtube.com/channel/UCxxxxxxxx" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full sm:w-auto"
                >
                  <Handshake className="h-4 w-4" />
                  הקהילה שלנו
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyMe;
