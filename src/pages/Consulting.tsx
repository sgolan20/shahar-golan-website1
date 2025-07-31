import { ArrowRight, Calendar, Video, Clock, CheckCircle, Loader2, Coins, Star, Users, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ZCal?: any;
  }
}

const Consulting = () => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Load the Zcal script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://static.zcal.co/embed/v1/embed.js';

    // Add script to head
    document.head.appendChild(script);

    // Simple timer - if widget doesn't load in 5 seconds, show fallback
    const timer = setTimeout(() => {
      const widgetElement = document.querySelector('.zcal-inline-widget');
      if (widgetElement) {
        const hasIframe = widgetElement.querySelector('iframe');
        if (!hasIframe) {
          setShowFallback(true);
        }
      } else {
        setShowFallback(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-brand-gradient rounded-full">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-brandBlue mb-4">
              ייעוץ מקצועי
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              ייעוץ מקצועי מתקדם ומותאם לצרכים העסקיים שלך - שעה מלאה של ייעוץ מרוכז ומעשי
            </p>
          </div>
        </div>
      </section>

      {/* Booking Widget Section - Full Width */}
      <section className="py-12 bg-gradient-to-br from-brandTeal/5 to-brandBlue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-white to-gray-50/50 border-brandTeal/20 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-brandBlue">
                  הזמנת הייעוץ
                </CardTitle>
                <CardDescription className="text-lg">
                  בחר את הזמן המתאים לך ושלם בצורה מאובטחת
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                {/* Zcal Widget - This will be replaced by the script */}
                <div className="zcal-inline-widget mb-6">
                  <a href="https://zcal.co/i/J7opjU2H">פגישת ייעוץ - זום - Schedule a meeting</a>
                </div>

                {/* Fallback button when widget doesn't load */}
                {showFallback && (
                  <div className="mb-6 -mt-12">
                    <div className="text-center bg-white p-6 rounded-lg border-2 border-brandTeal/20">
                      <p className="text-muted-foreground mb-4">לוח הזמנים לא נטען כמו שצריך</p>
                      <Button
                        onClick={() => window.location.reload()}
                        className="bg-brand-gradient hover:bg-brand-gradient-hover text-white px-8 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        📅 רענן להצגת זמינות השעות
                      </Button>
                    </div>
                  </div>
                )}

                <div className="text-sm text-muted-foreground space-y-2">
                  <p>- קישור לפגישת זום יישלח ביום הפגישה במייל</p>
                  <p>- שחר ייצור קשר בוואטסאפ לתיאום התכנים</p>
                  <p>- תקבלו מייל עם זימון ליומן מיד עם ביצוע ההזמנה</p>
                  <p>- נא לעדכן על ביטול עד 24 שעות לפני הפגישה</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Consulting Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl text-brandBlue flex items-center justify-center gap-2">
                  <Calendar className="h-8 w-8" />
                  פרטי הייעוץ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-brandTeal" />
                    <div>
                      <h4 className="font-semibold">משך הייעוץ</h4>
                      <p className="text-muted-foreground">שעה מלאה (60 דקות)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Video className="h-6 w-6 text-brandTeal" />
                    <div>
                      <h4 className="font-semibold">פלטפורמה</h4>
                      <p className="text-muted-foreground">זום - קישור יישלח ביום הפגישה</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Coins className="h-6 w-6 text-brandTeal" />
                    <div>
                      <h4 className="font-semibold">מחיר</h4>
                      <p className="text-muted-foreground">800₪ + מע"מ (סה"כ 944₪)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-brandTeal/5 to-brandBlue/5 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4 text-brandBlue text-xl">מה כולל הייעוץ:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brandTeal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">ייעוץ מקצועי מותאם לצרכים העסקיים שלך</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brandTeal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">פתרון אתגרים טכנולוגיים מורכבים</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brandTeal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">הכוונה אסטרטגית לפיתוח מוצר</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brandTeal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">המלצות על טכנולוגיות וכלים מתקדמים</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brandTeal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">תכנון ארכיטקטורה ומבנה מערכת</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brandTeal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">ביקורת קוד ושיפור ביצועים</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">💼 הכנה לייעוץ</h4>
                  <p className="text-sm text-blue-700">
                    שחר ייצור קשר בוואטסאפ לפני הפגישה כדי להבין את הצרכים הספציפיים ולהכין את הייעוץ בצורה המיטבית
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gradient-to-r from-brandTeal/5 to-brandBlue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-brandBlue mb-8">
              למה ייעוץ מקצועי משתלם?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">ייעוץ מותאם</h3>
                  <p className="text-sm text-muted-foreground">
                    פתרונות מותאמים בדיוק לאתגרים העסקיים שלך
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <Clock className="h-8 w-8 text-brandTeal mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">חיסכון בזמן</h3>
                  <p className="text-sm text-muted-foreground">
                    קבל תשובות מקצועיות במקום לחפש פתרונות לבד
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <Users className="h-8 w-8 text-brandBlue mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">ניסיון מעשי</h3>
                  <p className="text-sm text-muted-foreground">
                    ייעוץ מבוסס על ניסיון רב בפרויקטים מורכבים
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">תוצאות מיידיות</h3>
                  <p className="text-sm text-muted-foreground">
                    קבל כיוון ברור ותכנית פעולה מעשית
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Contact */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link to="/contact">
              <Button variant="outline" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                חזרה לעמוד יצירת קשר
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consulting;