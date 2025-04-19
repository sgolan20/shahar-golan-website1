
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  PayPalScriptProvider, 
  PayPalButtons,
  FUNDING 
} from "@paypal/react-paypal-js";
import { getCourseBySlug, getLessonsForCourseWithAccess } from "@/services/courseService";
import { recordCoursePurchase } from "@/services/userCourseService";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { PlayCircle, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user, checkingSession } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourseBySlug(slug || ""),
    enabled: !!slug
  });

  const { data: lessonsData, isLoading: lessonsLoading } = useQuery({
    queryKey: ["courseLessons", course?.id],
    queryFn: () => getLessonsForCourseWithAccess(course?.id || ""),
    enabled: !!course?.id
  });

  const lessons = lessonsData?.lessons || [];
  const hasPurchased = lessonsData?.hasPurchased || false;

  const recordPurchaseMutation = useMutation({
    mutationFn: ({ courseId, transactionId }: { courseId: string, transactionId: string }) => 
      recordCoursePurchase(courseId, transactionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courseLessons", course?.id] });
      queryClient.invalidateQueries({ queryKey: ["userCourses"] });
      setShowPaymentDialog(false);
      toast({
        title: "הרכישה הושלמה בהצלחה!",
        description: "כעת יש לך גישה מלאה לכל תוכן הקורס.",
      });
    }
  });

  const handlePaymentSuccess = (details: any) => {
    if (course) {
      recordPurchaseMutation.mutate({ 
        courseId: course.id,
        transactionId: details.id
      });
    }
  };

  const handlePurchaseClick = () => {
    if (!user) {
      setShowAuthDialog(true);
    } else {
      setShowPaymentDialog(true);
    }
  };

  const paypalOptions = {
    "client-id": "test", // Replace with your PayPal client ID for production
    currency: "ILS",
    intent: "capture"
  };

  if (courseLoading || lessonsLoading) {
    return (
      <div className="container mx-auto py-16 md:py-24">
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">הקורס לא נמצא</h2>
          <p className="text-muted-foreground mb-8">
            הקורס המבוקש אינו קיים או שאינו זמין כרגע.
          </p>
          <Button asChild>
            <Link to="/digital-courses">חזרה לרשימת הקורסים</Link>
          </Button>
        </div>
      </div>
    );
  }

  const freeLessons = lessons.filter(lesson => lesson.is_free);
  const paidLessons = lessons.filter(lesson => !lesson.is_free);

  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Course Info */}
          <div className="md:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            
            {course.image_url && (
              <div className="relative w-full h-64 md:h-80 mb-6 overflow-hidden rounded-lg">
                <img 
                  src={course.image_url} 
                  alt={course.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-bold mb-2">תיאור הקורס</h2>
              <p className="text-lg whitespace-pre-line">{course.description}</p>
            </div>
            
            <Separator className="my-8" />
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6">תוכן הקורס</h2>
              
              {lessons.length === 0 ? (
                <div className="text-center py-8 bg-muted/50 rounded-lg">
                  <p className="text-muted-foreground">עדיין אין שיעורים בקורס זה</p>
                </div>
              ) : (
                <Accordion type="multiple" defaultValue={["free-lessons"]}>
                  {freeLessons.length > 0 && (
                    <AccordionItem value="free-lessons">
                      <AccordionTrigger className="text-lg">
                        שיעורים בחינם ({freeLessons.length})
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        {freeLessons.map((lesson, index) => (
                          <div key={lesson.id} className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
                            <div className="flex items-center">
                              <Badge className="mr-2 bg-green-100 text-green-800 hover:bg-green-100">חינם</Badge>
                              <span>{index + 1}. {lesson.title}</span>
                            </div>
                            <Button asChild size="sm" variant="outline">
                              <Link to={`/digital-courses/${slug}/lessons/${lesson.id}`}>
                                <PlayCircle className="ml-2 h-4 w-4" />
                                צפה בשיעור
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                  
                  {paidLessons.length > 0 && (
                    <AccordionItem value="paid-lessons">
                      <AccordionTrigger className="text-lg">
                        שיעורים בתשלום ({paidLessons.length})
                      </AccordionTrigger>
                      <AccordionContent className="space-y-2">
                        {paidLessons.map((lesson, index) => (
                          <div key={lesson.id} className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors">
                            <div className="flex items-center">
                              <span>{freeLessons.length + index + 1}. {lesson.title}</span>
                            </div>
                            {hasPurchased ? (
                              <Button asChild size="sm" variant="outline">
                                <Link to={`/digital-courses/${slug}/lessons/${lesson.id}`}>
                                  <PlayCircle className="ml-2 h-4 w-4" />
                                  צפה בשיעור
                                </Link>
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" disabled>
                                <Lock className="ml-2 h-4 w-4" />
                                נעול
                              </Button>
                            )}
                          </div>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  )}
                </Accordion>
              )}
            </div>
          </div>
          
          {/* Course Purchase Card */}
          <div className="md:w-1/3">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>פרטי הקורס</CardTitle>
                <CardDescription>גישה מלאה לכל תוכן הקורס</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold">₪299</div>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
                    <span>גישה לכל השיעורים</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
                    <span>גישה ללא הגבלת זמן</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="ml-2 h-5 w-5 text-green-500" />
                    <span>עדכונים לתוכן הקורס</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                {hasPurchased ? (
                  <div className="w-full space-y-4">
                    <div className="flex items-center text-green-600 bg-green-50 p-3 rounded-md">
                      <CheckCircle className="ml-2 h-5 w-5" />
                      <span>יש לך גישה מלאה לקורס זה</span>
                    </div>
                    <Button asChild className="w-full">
                      <Link to={`/digital-courses/${slug}/lessons/${lessons[0]?.id}`}>
                        <PlayCircle className="ml-2 h-5 w-5" />
                        התחל בצפייה
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handlePurchaseClick} className="w-full">
                    רכוש עכשיו דרך PayPal
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>נדרשת התחברות</DialogTitle>
            <DialogDescription>
              עליך להתחבר או להירשם כדי לרכוש את הקורס.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center text-amber-600 bg-amber-50 p-3 rounded-md">
              <AlertCircle className="ml-2 h-5 w-5" />
              <span>יש לך חשבון? התחבר כדי להמשיך.</span>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button onClick={() => {
              setShowAuthDialog(false);
              navigate("/auth", { state: { returnUrl: `/digital-courses/${slug}` } });
            }} className="w-full sm:w-auto">
              התחבר או הירשם
            </Button>
            <Button variant="outline" onClick={() => setShowAuthDialog(false)} className="w-full sm:w-auto">
              ביטול
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>רכישת הקורס</DialogTitle>
            <DialogDescription>
              השתמש ב-PayPal לרכישה מאובטחת של הקורס "{course.title}"
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="text-center mb-4">
              <div className="text-xl font-bold">₪299</div>
              <p className="text-sm text-muted-foreground">תשלום חד פעמי, גישה ללא הגבלה</p>
            </div>
            
            <PayPalScriptProvider options={paypalOptions}>
              <PayPalButtons 
                style={{ layout: "vertical" }}
                fundingSource={FUNDING.PAYPAL}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: "299.00",
                          currency_code: "ILS"
                        },
                        description: `קורס: ${course.title}`,
                        payee: {
                          email_address: "sgolan20@gmail.com"
                        }
                      }
                    ]
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order!.capture().then((details) => {
                    handlePaymentSuccess(details);
                  });
                }}
                onError={(err) => {
                  console.error("PayPal error:", err);
                  toast({
                    title: "שגיאה בתהליך התשלום",
                    description: "אירעה שגיאה בעת עיבוד התשלום. אנא נסה שוב מאוחר יותר.",
                    variant: "destructive"
                  });
                }}
              />
            </PayPalScriptProvider>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPaymentDialog(false)} className="w-full">
              ביטול
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseDetail;
