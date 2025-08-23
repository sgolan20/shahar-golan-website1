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
      <div className="relative">
        <div className="w-full h-[300px] md:h-[400px] relative overflow-hidden">
          <img 
            src="/lovable-uploads/0d68aedf-beb7-45ae-a23f-322fa1fa7d84.png" 
            alt="תמונה המדגימה סדנת היכרות" 
            className="w-full h-full object-cover" 
            style={{ objectPosition: "center 20%" }}
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl shadow-lg max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white drop-shadow-lg">
                סדנת מבוא מותאמת לעסק שלכם
              </h1>
              <p className="text-xl mb-8 text-white/90 drop-shadow max-w-2xl">
                סדנה להכרת הפוטנציאל של AI במיוחד לתחום הפעילות שלכם, עם כלים וזיהוי הזדמנויות ספציפיות לארגון
              </p>
            </div>
          </div>
        </div>
      </div>
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">

          <div className="bg-primary/5 p-6 rounded-lg mb-12 border border-primary/10">
            <div className="flex items-center mb-4">
              <Sparkles className="h-6 w-6 text-primary ml-2" />
              <h2 className="text-2xl font-semibold">AI מותאם לתחום שלכם</h2>
            </div>
            <p className="text-lg">
              הסדנה מותאמת במיוחד לתחום הפעילות של הארגון שלכם. במקום הרצאה כללית על AI, 
              אני מתמקד בכלים ובהזדמנויות שרלוונטיות דווקא לכם - בין אם זה ייצור, שיווק, רו"ח, חינוך או כל תחום אחר. 
              זו הזדמנות להבין איך AI יכול לשפר בדיוק את התהליכים שלכם.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 mb-12">
            <Card className="bg-card/50 backdrop-blur border border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">למה סדנה מותאמת?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>זיהוי הזדמנויות AI ספציפיות לתחום הפעילות שלכם</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>דוגמאות מעשיות מארגונים דומים שכבר מיישמים AI</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>התנסות בכלים הכי רלוונטיים לעבודה היומיומית שלכם</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>תכנון צעדי המשך מותאמים לצרכים הייחודיים של הארגון</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur border border-primary/10">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">מה כולל בסדנה?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>ניתוח התהליכים הנוכחיים בארגון וזיהוי נקודות שיפור עם AI</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>הצגת כלי AI מותאמים ספציפית לתחום הפעילות שלכם</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>התנסות מעשית hands-on עם הכלים הרלוונטיים ביותר</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 ml-2 mt-0.5" />
                    <span>תכנית יישום מותאמת לארגון כולל המלצות לצעדים הבאים</span>
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
              הסדנה מותאמת לארגונים ולצוותים המעוניינים בגישה ממוקדת ומותאמת:
            </p>
            <ul className="space-y-2 list-disc list-inside">
              <li className="text-lg">ארגונים המעוניינים לזהות הזדמנויות AI ספציפיות לתחום שלהם</li>
              <li className="text-lg">מנהלים וצוותים שרוצים להבין את הפוטנציאל המעשי של AI לתהליכים שלהם</li>
              <li className="text-lg">חברות בתחומי ייצור, שיווק, רו"ח, חינוך ושירותים מקצועיים</li>
              <li className="text-lg">ארגונים המעוניינים בתכנית יישום מותאמת לצרכים הייחודיים שלהם</li>
              <li className="text-lg">צוותי עבודה המעוניינים בהתנסות מעשית עם כלים רלוונטיים לעבודתם</li>
            </ul>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-6">מעוניינים בסדנה מותאמת לארגון שלכם?</h2>

            <Button asChild size="lg" className="text-lg px-8">
              <a href="/contact">בואו נתאים AI לעסק שלכם</a>
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default IntroWorkshop;
