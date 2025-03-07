import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock } from "lucide-react";

const FocusedWorkshop = () => {
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
            סדנה ממוקדת
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            סדנה מעשית וממוקדת של מספר שעות המותאמת לצרכים הספציפיים של הארגון שלך
          </p>

          <div className="bg-primary/5 p-6 rounded-lg mb-12 border border-primary/10">
            <div className="flex items-center mb-4">
              <Clock className="h-6 w-6 text-primary ml-2" />
              <h2 className="text-2xl font-semibold">מפגש אחד, תוצאות מיידיות</h2>
            </div>
            <p className="text-lg">
              בניגוד לקורס המתפרס על מספר מפגשים, הסדנה הממוקדת מרכזת את כל הידע והכלים הפרקטיים למפגש אחד אינטנסיבי. 
              המטרה היא להעניק למשתתפים כלים מעשיים שיוכלו ליישם מיד למחרת במקום העבודה.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card className="bg-card/50 backdrop-blur border border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">למה סדנה ממוקדת?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>חיסכון בזמן - מפגש אחד במקום סדרת מפגשים</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>התמקדות בכלים פרקטיים שניתן ליישם מיד</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>התאמה מדויקת לצרכים ולאתגרים של הארגון</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>חוויה אינטנסיבית ומעשירה לכל המשתתפים</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">דוגמאות לסדנאות</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>יצירת תוכן שיווקי באמצעות AI - כלים מעשיים לשיווק</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>עיצוב גרפי מהיר עם AI - כלים לעיצוב ללא רקע קודם</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>ייעול תהליכי עבודה באמצעות AI - אוטומציה פשוטה</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>כתיבה מקצועית עם AI - שיפור תקשורת פנים וחוץ ארגונית</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg mb-12 border border-border">
            <h2 className="text-2xl font-semibold mb-4">מבנה הסדנה</h2>
            <ol className="space-y-4 list-decimal list-inside">
              <li className="text-lg">
                <span className="font-medium">פתיחה והיכרות</span> - הצגת מטרות הסדנה והבנת הצרכים של המשתתפים
              </li>
              <li className="text-lg">
                <span className="font-medium">הצגת הכלים</span> - סקירה של הכלים הרלוונטיים והדגמה חיה של השימוש בהם
              </li>
              <li className="text-lg">
                <span className="font-medium">תרגול מעשי</span> - המשתתפים מתנסים בכלים על אתגרים אמיתיים מהארגון
              </li>
              <li className="text-lg">
                <span className="font-medium">דיון ושאלות</span> - מענה לשאלות ודיון על אופן הטמעת הכלים בעבודה השוטפת
              </li>
              <li className="text-lg">
                <span className="font-medium">סיכום וחומרים</span> - סיכום הנלמד ומתן חומרים להמשך למידה עצמאית
              </li>
            </ol>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">מעוניינים בסדנה ממוקדת לארגון שלכם?</h2>
            <Button asChild size="lg" className="text-lg px-8">
              <a href="/contact">צרו קשר לתיאום סדנה</a>
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FocusedWorkshop;
