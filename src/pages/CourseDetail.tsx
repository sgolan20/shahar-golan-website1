import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourseBySlug, getLessonsForCourse } from "@/services/courseService";
import { hasUserPurchasedCourse, recordCoursePurchase } from "@/services/userCourseService";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import { Check, Lock } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import {
  PayPalScriptProvider,
  PayPalButtons
} from "@paypal/react-paypal-js";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { user, isPaidUser } = useAuth();
  const { toast } = useToast();
  const [hasPurchased, setHasPurchased] = useState<boolean | null>(null);

  // Fetch course data
  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ['course', slug],
    queryFn: () => getCourseBySlug(slug || ''),
    enabled: !!slug,
  });

  // Fetch lessons for this course
  const { data: lessons = [], isLoading: lessonsLoading } = useQuery({
    queryKey: ['course-lessons', course?.id],
    queryFn: () => getLessonsForCourse(course?.id || ''),
    enabled: !!course?.id,
  });

  // Check if user has purchased the course
  useEffect(() => {
    if (user && course?.id) {
      const checkPurchase = async () => {
        const purchased = await hasUserPurchasedCourse(course.id);
        setHasPurchased(purchased);
      };
      checkPurchase();
    } else if (!user) {
      setHasPurchased(false);
    }
  }, [user, course?.id]);

  const handlePurchaseSuccess = async (details: any) => {
    if (user && course?.id) {
      const success = await recordCoursePurchase(
        course.id,
        details.id || details.orderID
      );
      
      if (success) {
        setHasPurchased(true);
        toast({
          title: "רכישה מוצלחת!",
          description: `רכשת גישה לקורס "${course.title}"`,
        });
      } else {
        toast({
          title: "שגיאה ברישום הרכישה",
          description: "הרכישה בוצעה אבל חל שגיאה ברישום. אנא פנה לתמיכה.",
          variant: "destructive"
        });
      }
    }
  };

  const handleLessonClick = (lessonId: string) => {
    if (!user) {
      toast({
        title: "דרושה התחברות",
        description: "אנא התחבר כדי לצפות בשיעורים",
        variant: "destructive"
      });
      navigate("/auth", { state: { returnUrl: `/digital-courses/${slug}` } });
      return;
    }

    if (hasPurchased || (isPaidUser && course?.is_free)) {
      navigate(`/digital-courses/${slug}/lessons/${lessonId}`);
    } else {
      toast({
        title: "גישה מוגבלת",
        description: "עליך לרכוש את הקורס כדי לצפות בשיעורים",
        variant: "destructive"
      });
    }
  };

  if (courseLoading) {
    return (
      <div className="container mx-auto py-10">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-64 w-full mb-6" />
        <Skeleton className="h-8 w-1/2 mb-2" />
        <Skeleton className="h-24 w-full mb-6" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
        <Skeleton className="h-10 w-full mb-2" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="container mx-auto py-10 text-center">
        <h1 className="text-3xl font-bold mb-4">הקורס לא נמצא</h1>
        <p className="mb-6">לא הצלחנו למצוא את הקורס המבוקש.</p>
        <Button asChild>
          <Link to="/digital-courses">חזרה לקורסים דיגיטליים</Link>
        </Button>
      </div>
    );
  }

  const paypalOptions = {
    clientId: "ATX_K7XVX0f6bMlwW8s72Z-Q2eKnZd9-HYGJw1vz4vP8J5SZHFZPbdU8cKdUejk4UXYvvbAYaBGlTKPl",
    currency: "ILS",
    intent: "capture"
  };

  const createOrder = (data: any, actions: any) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: course.price?.toString() || "0",
            currency_code: "ILS"
          },
          description: `רכישת הקורס: ${course.title}`,
          payee: {
            email_address: "sgolan20@gmail.com"
          }
        }
      ]
    });
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">{course.title}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2">
          {course.image_url && (
            <AspectRatio ratio={16 / 9} className="mb-6 overflow-hidden rounded-lg shadow-md">
              <img 
                src={course.image_url} 
                alt={course.title} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          )}
          
          <div className="prose max-w-none mb-8">
            <h2 className="text-2xl font-bold mb-4">תיאור הקורס</h2>
            <div dangerouslySetInnerHTML={{ __html: course.description || '' }} />
          </div>
          
          <div>
            <h2 className="text-2xl font-bold mb-4">תוכן הקורס</h2>
            {lessonsLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : (
              <div className="space-y-2">
                {lessons.length > 0 ? (
                  lessons.map((lesson) => (
                    <Card 
                      key={lesson.id} 
                      className={`transition-all cursor-pointer hover:shadow-md ${
                        hasPurchased || (isPaidUser && course.is_free) ? 'hover:bg-accent/10' : 'opacity-80'
                      }`}
                      onClick={() => handleLessonClick(lesson.id)}
                    >
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {hasPurchased || (isPaidUser && course.is_free) ? (
                            <Check className="h-5 w-5 text-green-500" />
                          ) : (
                            <Lock className="h-5 w-5 text-muted-foreground" />
                          )}
                          <div>
                            <h3 className="font-medium">{lesson.title}</h3>
                            {lesson.duration && (
                              <p className="text-sm text-muted-foreground">
                                משך שיעור: {lesson.duration}
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    אין שיעורים זמינים בקורס זה כרגע.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Purchase Sidebar */}
        <div>
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>מחיר הקורס</CardTitle>
              <CardDescription>
                {course.is_free ? 'קורס חינמי' : `₪${course.price || 0}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!user ? (
                <Button className="w-full mb-4" asChild>
                  <Link to="/auth" state={{ returnUrl: `/digital-courses/${slug}` }}>
                    התחבר כדי לרכוש
                  </Link>
                </Button>
              ) : hasPurchased ? (
                <div className="text-center">
                  <div className="bg-green-100 text-green-800 p-3 rounded-md mb-4">
                    רכשת קורס זה
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => lessons[0] && handleLessonClick(lessons[0].id)}
                  >
                    התחל ללמוד
                  </Button>
                </div>
              ) : course.is_free && isPaidUser ? (
                <div className="text-center">
                  <div className="bg-blue-100 text-blue-800 p-3 rounded-md mb-4">
                    קורס זה זמין בחינם עבורך כחלק מתוכנית החברות
                  </div>
                  <Button 
                    className="w-full"
                    onClick={() => lessons[0] && handleLessonClick(lessons[0].id)}
                  >
                    התחל ללמוד
                  </Button>
                </div>
              ) : (
                <>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>גישה מלאה לכל תוכן הקורס</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>גישה ללא הגבלת זמן</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>תמיכה בדוא"ל</span>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="mb-4">
                    <PayPalScriptProvider options={paypalOptions}>
                      <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={(data, actions) => {
                          return actions.order!.capture().then((details) => {
                            handlePurchaseSuccess(details);
                          });
                        }}
                      />
                    </PayPalScriptProvider>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              <p>
                במקרה של בעיה ברכישה, אנא צרו קשר באמצעות דף 
                <Link to="/contact" className="text-primary underline mx-1">
                  צור קשר
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
