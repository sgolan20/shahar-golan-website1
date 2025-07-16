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
  const [isWidgetLoaded, setIsWidgetLoaded] = useState(false);

  useEffect(() => {
    // Load the Zcal script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://static.zcal.co/embed/v1/embed.js';
    
    // Add script to head
    document.head.appendChild(script);

    // Check for widget loading
    const checkWidget = () => {
      const widgetElement = document.querySelector('.zcal-inline-widget');
      if (widgetElement) {
        // Check if the widget has been transformed (has more than just the link)
        const hasCalendar = widgetElement.querySelector('iframe') || 
                           widgetElement.querySelector('.zcal-calendar') ||
                           widgetElement.children.length > 1;
        
        if (hasCalendar) {
          setIsWidgetLoaded(true);
        } else {
          // Keep checking
          setTimeout(checkWidget, 500);
        }
      } else {
        setTimeout(checkWidget, 500);
      }
    };

    // Start checking after script loads
    script.onload = () => {
      setTimeout(checkWidget, 1000);
    };

    // Also start checking immediately in case script is already loaded
    setTimeout(checkWidget, 1000);

    // Fallback - show widget after 5 seconds regardless
    const fallbackTimeout = setTimeout(() => {
      setIsWidgetLoaded(true);
    }, 5000);

    return () => {
      // Cleanup on unmount
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      clearTimeout(fallbackTimeout);
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
                      <p className="text-muted-foreground">זום - קישור יישלח לאחר הקביעה</p>
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
                  {/* Loading State */}
                  {!isWidgetLoaded && (
                    <div className="mb-6 py-12">
                      <div className="flex flex-col items-center justify-center space-y-4">
                        <Loader2 className="h-8 w-8 animate-spin text-brandBlue" />
                        <p className="text-muted-foreground">טוען לוח זמנים...</p>
                        <div className="text-xs text-muted-foreground">
                          זה יקח רק כמה שניות
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Zcal Widget - This will be replaced by the script */}
                  <div 
                    className={`zcal-inline-widget mb-6 ${!isWidgetLoaded ? 'opacity-0 absolute -z-10' : 'opacity-100'}`}
                  >
                    <a href="https://zcal.co/i/voc_RSSx">קביעת פגישת זום - Schedule a meeting</a>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>✅ זמינות גמישה לפי הצורך</p>
                    <p>✅ אישור מיידי במייל</p>
                    <p>✅ קישור זום יישלח אוטומטית</p>
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