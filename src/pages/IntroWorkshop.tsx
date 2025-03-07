import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Users, Sparkles } from "lucide-react";

const IntroWorkshop = () => {
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
            סדנת היכרות עם עולם ה-AI
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            סדנה מקוונת להיכרות ראשונית עם עולם הבינה המלאכותית והכלים שמשנים את חיינו
          </p>

          <div className="bg-primary/5 p-6 rounded-lg mb-12 border border-primary/10">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-primary ml-2" />
              <h2 className="text-2xl font-semibold">הצעד הראשון לעולם חדש</h2>
            </div>
            <p className="text-lg">
              סדנת ההיכרות נועדה לאפשר לכם להכיר את עולם הבינה המלאכותית בצורה נגישה ומעשית. 
              הסדנה מיועדת למתחילים ולא דורשת ידע מוקדם. זו הזדמנות מצוינת להתחיל את המסע שלכם בעולם ה-AI 
              ולהבין את הפוטנציאל העצום שהוא מציע.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card className="bg-card/50 backdrop-blur border border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">למה סדנת היכרות?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>היכרות ראשונית עם עולם הבינה המלאכותית ללא מחויבות</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>הבנת הפוטנציאל של AI לשיפור העבודה והחיים האישיים</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>התנסות ראשונית בכלים פשוטים ונגישים</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>הזדמנות לשאול שאלות ולהבין מה רלוונטי עבורכם</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">מה נלמד בסדנה?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>מבוא לבינה מלאכותית - מושגי יסוד והיסטוריה קצרה</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>הכרת כלי AI בסיסיים ושימושיים לחיי היומיום</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>התנסות מעשית בשימוש בכלים נבחרים</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>טיפים להמשך למידה עצמאית ופיתוח מיומנויות</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="bg-muted/50 p-6 rounded-lg mb-12 border border-border">
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-primary ml-2" />
              <h2 className="text-2xl font-semibold">למי מיועדת הסדנה?</h2>
            </div>
            <p className="text-lg mb-4">
              סדנת ההיכרות מיועדת למגוון רחב של משתתפים:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li className="text-lg">אנשים שרוצים להכיר את עולם ה-AI ללא מחויבות</li>
              <li className="text-lg">עובדים וארגונים השוקלים להטמיע כלי AI בעבודתם</li>
              <li className="text-lg">מנהלים המעוניינים להבין את הפוטנציאל של AI לארגון</li>
              <li className="text-lg">אנשים פרטיים המעוניינים לשפר את היעילות האישית</li>
              <li className="text-lg">סטודנטים ואנשי אקדמיה המעוניינים בהיכרות ראשונית</li>
            </ul>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">מעוניינים להשתתף בסדנת היכרות?</h2>
            <p className="text-lg mb-6">הסדנאות מתקיימות באופן מקוון, בתשלום סמלי או ללא עלות</p>
            <Button asChild size="lg" className="text-lg px-8">
              <a href="/contact">צרו קשר למידע על הסדנה הקרובה</a>
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default IntroWorkshop;
