import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Presentation, Users } from "lucide-react";

const CustomLecture = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
          <img 
            src="/lovable-uploads/76f2cafb-36e3-43b9-a0a5-a5fb11f41703.png" 
            alt="תמונה המדגימה הרצאה מותאמת" 
            className="w-full h-full object-cover" 
            style={{ objectPosition: "center 20%" }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
                הרצאה מותאמת
              </h1>
              <p className="text-xl mb-8 text-white/90 drop-shadow max-w-2xl">
                הרצאה מרתקת ועדכנית על עולם הבינה המלאכותית, מותאמת במיוחד לקהל היעד שלכם
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">

          <div className="bg-primary/5 p-6 rounded-lg mb-12 border border-primary/10">
            <div className="flex items-center mb-4">
              <Presentation className="h-6 w-6 text-primary ml-2" />
              <h2 className="text-2xl font-semibold">תוכן תיאורטי עם רלוונטיות מעשית</h2>
            </div>
            <p className="text-lg">
              ההרצאות שלי מתמקדות בהעברת ידע תיאורטי עדכני על עולם הבינה המלאכותית, אך תמיד עם חיבור לעולם המעשי והשלכות 
              רלוונטיות לקהל המאזינים. אני מתאים את התוכן, הדוגמאות והמקרים כך שידברו ישירות לעולם התוכן של הארגון והקהל.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card className="bg-card/50 backdrop-blur border border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">למה הרצאה מותאמת?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>תוכן מותאם לתחום העיסוק של הארגון והקהל</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>דוגמאות ומקרי בוחן רלוונטיים לעולם התוכן שלכם</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>הצגת השינויים והמגמות שישפיעו על התעשייה שלכם</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>הרצאה אינטראקטיבית המעודדת חשיבה ושאלות</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">נושאי הרצאה לדוגמה</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>עתיד העבודה בעידן ה-AI - איך הבינה המלאכותית משנה את שוק העבודה</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>מהפכת ה-AI הגנרטיבי - השלכות על תעשיות התוכן והיצירה</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>אתיקה ובינה מלאכותית - אתגרים והזדמנויות בעידן החדש</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>AI בתעשייה שלכם - מגמות, שינויים והזדמנויות ספציפיות</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg mb-12 border border-border">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-primary ml-2" />
              <h2 className="text-2xl font-semibold">מתאים לקהלים מגוונים</h2>
            </div>
            <p className="text-lg mb-4">
              ההרצאות שלי מותאמות למגוון קהלים, מארגונים עסקיים ועד מוסדות חינוך:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li className="text-lg">כנסים מקצועיים וימי עיון</li>
              <li className="text-lg">אירועי חברה ומפגשי צוות</li>
              <li className="text-lg">מוסדות אקדמיים וחינוכיים</li>
              <li className="text-lg">פורומים ניהוליים ודירקטוריונים</li>
              <li className="text-lg">כנסי לקוחות ואירועי תעשייה</li>
            </ul>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">מעוניינים בהרצאה מותאמת לארגון או לאירוע שלכם?</h2>
            <Button asChild size="lg" className="text-lg px-8">
              <a href="/contact">צרו קשר לתיאום הרצאה</a>
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default CustomLecture;
