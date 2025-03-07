import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const FocusedCourse = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gradient">
            קורס ממוקד בהתאמה אישית
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            קורס בינה מלאכותית בהתאמה מיוחדת לצרכים הספציפיים של הארגון שלך
          </p>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card className="bg-card/50 backdrop-blur border border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">למה קורס מותאם אישית?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>תכנים מותאמים במיוחד לצרכי הארגון והתפקידים הספציפיים</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>התמקדות בכלי AI רלוונטיים לתחום העיסוק שלכם</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>למידה מעשית עם תרגול על אתגרים אמיתיים מהארגון</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>גמישות בקביעת מועדים ומיקום המפגשים</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">דוגמאות לקורסים</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>AI לצוותי שיווק ועיצוב - שימוש בכלי AI ליצירת תוכן ועיצוב</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>AI למנהלים - קבלת החלטות מבוססות נתונים וייעול תהליכים</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>AI למפתחים - שילוב כלי בינה מלאכותית בתהליכי פיתוח</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>AI לצוותי שירות לקוחות - שיפור חווית לקוח באמצעות AI</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg mb-12 border border-border">
            <h2 className="text-2xl font-semibold mb-4">איך זה עובד?</h2>
            <ol className="space-y-4 list-decimal list-inside">
              <li className="text-lg">
                <span className="font-medium">פגישת אפיון ראשונית</span> - נפגש להבין את הצרכים והאתגרים הספציפיים של הארגון שלך
              </li>
              <li className="text-lg">
                <span className="font-medium">בניית תכנית מותאמת</span> - אבנה תכנית לימודים ייחודית המותאמת לצרכים שזיהינו
              </li>
              <li className="text-lg">
                <span className="font-medium">סדרת מפגשים</span> - נקיים סדרת מפגשים (פרונטליים או מקוונים) שיכללו תיאוריה, הדגמות ותרגול מעשי
              </li>
              <li className="text-lg">
                <span className="font-medium">ליווי והטמעה</span> - אמשיך ללוות את המשתתפים גם לאחר סיום הקורס לתקופה מוגדרת
              </li>
            </ol>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">מעוניינים בקורס מותאם אישית לארגון שלכם?</h2>
            <Button asChild size="lg" className="text-lg px-8">
              <a href="/contact">צרו קשר לתיאום פגישת ייעוץ</a>
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FocusedCourse;
