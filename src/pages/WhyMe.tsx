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
  Handshake,
  ArrowRight
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhyMe = () => {
  const reasons = [
    {
      id: 1,
      title: "הדרכה מבוססת צרכי הלקוח",
      description: "לפני כל הדרכה אני בודק מה עולם התוכן שאתם נמצאים בו ומבין את הצרכים הספציפיים. כך אני מכין את ההדרכה כך שתוכלו להתחבר לדוגמאות.",
      icon: <Target className="h-12 w-12 text-primary" />
    },
    {
      id: 2,
      title: "רזולוציה פרטנית",
      description: "אני מתאים באופן אישי את תוכן ההדרכה שלי לרמת הידע של כל אחד מכם. אני מבטיח שכולכם תתקדמו בקצב המתאים לכם.",
      icon: <Users className="h-12 w-12 text-primary" />
    },
    {
      id: 3,
      title: "פישוט מושגים מורכבים",
      description: "הייחודיות שלי היא ביכולת שלי להפוך תהליכים מסובכים לשלבים ברורים וישימים. אני אוהב לראות את הרגע שבו \"נדלקת הנורה\" אצלכם.",
      icon: <Lightbulb className="h-12 w-12 text-primary" />
    },
    {
      id: 4,
      title: "הגישה המעשית שלי",
      description: "אני מתמקד ביישומים מעשיים ולא רק בתיאוריה. אני אוהב להדגים עם דוגמאות אמיתיות מעולם העסקים שאתם מכירים.",
      icon: <CheckCheck className="h-12 w-12 text-primary" />
    },
    {
      id: 5,
      title: "החיבור האישי שלי",
      description: "אני גאה ביכולת שלי ליצור קשר אישי עם כל משתתף ומשתתפת. זה הסוד שלי למידת ההצלחה הגבוהה של התלמידים שלי.",
      icon: <Heart className="h-12 w-12 text-primary" />
    },
    {
      id: 6,
      title: "ההדגמות החיות שלי",
      description: "עולם ה-AI משתנה בקצב מסחרר. בהדרכות שלי, אתם לא תראו סרטונים מוקלטים אלא עבודה אמיתית עם הכלים העדכניים ביותר בזמן אמת. הלמידה שלכם הופכת מיידית לחוויתית ופרקטית.",
      icon: <Clock className="h-12 w-12 text-primary" />
    },
    {
      id: 7,
      title: "קהילה תומכת",
      description: "בניתי בעצמי קהילת עוקבים נאמנה ביוטיוב שמעידה על איכות ההדרכות שלי. אתם מוזמנים להצטרף אליה ולראות בעצמכם.",
      icon: <Users className="h-12 w-12 text-primary" />
    },
    {
      id: 8,
      title: "התעדכנות מתמדת",
      description: "אני מקדיש שעות רבות מזמני האישי ללמידה ומחקר בתחום ה-AI המתפתח במהירות. כשאתם לומדים איתי, אתם מקבלים את המידע העדכני ביותר.",
      icon: <BarChart3 className="h-12 w-12 text-primary" />
    },
    {
      id: 9,
      title: "המומחיות שלי בשילוב AI",
      description: "פיתחתי מומחיות ייחודית בהטמעת כלי AI בתהליכי עבודה קיימים. אני יודע לעזור לכם להטמיע AI בלי לשנות לגמרי את מה שכבר עובד לכם.",
      icon: <Rocket className="h-12 w-12 text-primary" />
    },
    {
      id: 10,
      title: "מחויבות אמיתית להצלחה שלכם",
      description: "כשאתם בוחרים ללמוד איתי, אתם לא רק רוכשים ידע - אתם מקבלים את התשוקה שלי לתחום, את המחויבות שלי להצלחה שלכם וכמובן את הניסיון האישי שאני מביא איתי.",
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
          
          {/* Key Message */}
          <motion.div 
            className="mt-16 max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-8 bg-primary/10 rounded-lg border-2 border-primary/20">
              <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                כשאתם לומדים AI איתי, אתם לא רק רוכשים כלים טכניים - אתם מקבלים שותף אמיתי שמחויב להצלחה שלכם בעולם המשתנה במהירות של הבינה המלאכותית
              </h2>
            </div>
          </motion.div>
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
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
              <Button asChild className="w-full sm:w-auto">
                <Link to="/contact">
                  צרו קשר
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyMe;
