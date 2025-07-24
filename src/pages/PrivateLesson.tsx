import { ArrowRight, Calendar, Video, Clock, CheckCircle, Loader2, DollarSign, Star, Users, BookOpen } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ZCal?: any;
  }
}

const PrivateLesson = () => {
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
                <BookOpen className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-brandBlue mb-4">
              שיעור פרטי / ייעוץ מקצועי
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              למידה אישית ומותאמת בדיוק לצרכים שלך - שעה מלאה של ידע מרוכז ומעשי
            </p>
          </div>
        </div>
      </section>

      {/* Booking Widget Section - Full Width */}
      <section className="py-12 bg-gradient-to-br from-brandBlue/5 to-brandTeal/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Card className="bg-gradient-to-br from-white to-gray-50/50 border-brandBlue/20 shadow-lg">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-brandBlue">
                  הזמנת השיעור
                </CardTitle>
                <CardDescription className="text-lg">
                  בחר את הזמן המתאים לך ושלם בצורה מאובטחת
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                {/* Zcal Widget - This will be replaced by the script */}
                <div className="zcal-inline-widget mb-6">
                  <a href="https://zcal.co/i/Vf8VWinM">שיעור/ייעוץ - שעה - Schedule a meeting</a>
                </div>
                
                {/* Fallback button when widget doesn't load */}
                {showFallback && (
                  <div className="mb-6 -mt-12">
                    <div className="text-center bg-white p-6 rounded-lg border-2 border-brandBlue/20">
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
                  <p>✅ תשלום מאובטח דרך המערכת</p>
                  <p>✅ אישור מיידי במייל</p>
                  <p>✅ קישור זום יישלח אוטומטית</p>
                  <p>✅ אפשרות לביטול עד 24 שעות מראש</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Lesson Details Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl text-brandBlue flex items-center justify-center gap-2">
                  <Calendar className="h-8 w-8" />
                  פרטי השיעור
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-6 w-6 text-brandTeal" />
                    <div>
                      <h4 className="font-semibold">משך השיעור</h4>
                      <p className="text-muted-foreground">שעה מלאה (60 דקות)</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Video className="h-6 w-6 text-brandTeal" />
                    <div>
                      <h4 className="font-semibold">פלטפורמה</h4>
                      <p className="text-muted-foreground">זום - קישור יישלח לאחר התשלום</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <DollarSign className="h-6 w-6 text-brandTeal" />
                    <div>
                      <h4 className="font-semibold">מחיר</h4>
                      <p className="text-muted-foreground">350₪ + מע"מ (סה"כ 420₪)</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-brandBlue/5 to-brandTeal/5 p-6 rounded-lg">
                  <h4 className="font-semibold mb-4 text-brandBlue text-xl">מה נלמד בשיעור:</h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brandTeal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">נושאים מותאמים לרמה ולצרכים שלך</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brandTeal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">פתרון בעיות ספציפיות שאתה מתמודד איתן</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brandTeal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">טיפים וטכניקות מתקדמות</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brandTeal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">הכוונה לצעדים הבאים בלמידה</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-brandTeal mt-0.5 flex-shrink-0" />
                      <span className="text-sm">חומרי עזר ומשאבים רלוונטיים</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">💡 טיפ חשוב</h4>
                  <p className="text-sm text-yellow-700">
                    כדי למקסם את התועלת, מומלץ לשלוח מראש את הנושאים או השאלות הספציפיות שתרצה לעסוק בהן
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 bg-gradient-to-r from-brandBlue/5 to-brandTeal/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-brandBlue mb-8">
              למה שיעור פרטי משתלם?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">למידה מותאמת</h3>
                  <p className="text-sm text-muted-foreground">
                    התכנים מותאמים בדיוק לרמה ולצרכים שלך
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <Clock className="h-8 w-8 text-brandTeal mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">יעילות מקסימלית</h3>
                  <p className="text-sm text-muted-foreground">
                    בשעה אחת תלמד יותר מאשר בכמה שיעורים רגילים
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <Users className="h-8 w-8 text-brandBlue mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">תשומת לב מלאה</h3>
                  <p className="text-sm text-muted-foreground">
                    כל תשומת הלב מוקדשת רק לך ולשאלות שלך
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center bg-white/80 backdrop-blur-sm">
                <CardContent className="pt-6">
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                  <h3 className="font-semibold mb-2">תוצאות מיידיות</h3>
                  <p className="text-sm text-muted-foreground">
                    תצא מהשיעור עם ידע מעשי שתוכל ליישם מיד
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

export default PrivateLesson;