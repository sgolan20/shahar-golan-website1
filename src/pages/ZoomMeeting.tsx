import { ArrowRight, Calendar, Video, Clock, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ZCal?: any;
  }
}

const ZoomMeeting = () => {
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
                <Video className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-brandBlue mb-4">
              קביעת פגישת זום
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              שיחה קצרה ומקצועית להבהרת צרכים והצעת מחיר מותאמת אישית
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Meeting Details */}
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-brandBlue flex items-center gap-2">
                    <Calendar className="h-6 w-6" />
                    פרטי הפגישה
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-brandTeal" />
                    <div>
                      <h4 className="font-semibold">משך השיחה</h4>
                      <p className="text-muted-foreground">15-30 דקות</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Video className="h-5 w-5 text-brandTeal" />
                    <div>
                      <h4 className="font-semibold">פלטפורמה</h4>
                      <p className="text-muted-foreground">זום - קישור יישלח ביום הפגישה</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-brandBlue/5 to-brandTeal/5 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3 text-brandBlue">במהלך השיחה נדבר על:</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-brandTeal mt-0.5 flex-shrink-0" />
                        <span className="text-sm">מטרות ההרצאה או הסדנה</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-brandTeal mt-0.5 flex-shrink-0" />
                        <span className="text-sm">קהל היעד והצרכים הספציפיים</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-brandTeal mt-0.5 flex-shrink-0" />
                        <span className="text-sm">מיקוד התכנים והנושאים</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-brandTeal mt-0.5 flex-shrink-0" />
                        <span className="text-sm">הצעת מחיר מותאמת אישית</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Booking Widget */}
              <Card className="bg-gradient-to-br from-brandBlue/5 to-brandTeal/5 border-brandBlue/20 shadow-lg">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-brandBlue">
                    קביעת הפגישה
                  </CardTitle>
                  <CardDescription className="text-lg">
                    בחר את הזמן המתאים לך
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  {/* Zcal Widget - This will be replaced by the script */}
                  <div className="zcal-inline-widget mb-6">
                    <a href="https://zcal.co/i/voc_RSSx">קביעת פגישת זום - Schedule a meeting</a>
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
                    <p>✅ זמינות גמישה לפי הצורך</p>
                    <p>✅ אישור מיידי במייל</p>
                    <p>✅ קישור זום יישלח ביום הפגישה</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Back to Contact */}
            <div className="text-center mt-12">
              <Link to="/contact">
                <Button variant="outline" className="gap-2">
                  <ArrowRight className="h-4 w-4" />
                  חזרה לעמוד יצירת קשר
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ZoomMeeting;