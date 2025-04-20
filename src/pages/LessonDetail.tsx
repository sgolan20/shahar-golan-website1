
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLessonById, getCourseById } from "@/services/courseService";
import { hasUserPurchasedCourse } from "@/services/userCourseService";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { ChevronRight, AlertCircle, Lock, Play } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const LessonDetail = () => {
  const { courseSlug, lessonId } = useParams<{ courseSlug: string; lessonId: string }>();
  const { user, checkingSession } = useAuth();
  const navigate = useNavigate();
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

  const { data: lesson, isLoading: lessonLoading } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => getLessonById(lessonId || ""),
    enabled: !!lessonId
  });

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course", lesson?.course_id],
    queryFn: () => getCourseById(lesson?.course_id || ""),
    enabled: !!lesson?.course_id
  });

  const { data: hasPurchased, isLoading: purchaseLoading } = useQuery({
    queryKey: ["hasPurchased", lesson?.course_id],
    queryFn: () => lesson ? hasUserPurchasedCourse(lesson.course_id) : Promise.resolve(false),
    enabled: !!lesson?.course_id && !!user
  });

  // Check access
  const canViewLesson = lesson?.is_free || hasPurchased;

  useEffect(() => {
    // If not loading and lesson is not free and user is not logged in, show auth dialog
    if (!lessonLoading && !checkingSession && lesson && !lesson.is_free && !user) {
      setShowAuthDialog(true);
    }
    
    // If not loading and lesson is not free and user is logged in but hasn't purchased, show purchase dialog
    if (!lessonLoading && !purchaseLoading && !checkingSession && user && lesson && !lesson.is_free && !hasPurchased) {
      setShowPurchaseDialog(true);
    }
  }, [lesson, user, checkingSession, lessonLoading, purchaseLoading, hasPurchased]);

  if (lessonLoading || courseLoading || purchaseLoading) {
    return (
      <div className="container mx-auto py-16 md:py-24">
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (!lesson || !course) {
    return (
      <div className="container mx-auto py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">השיעור לא נמצא</h2>
          <p className="text-muted-foreground mb-8">
            השיעור המבוקש אינו קיים או שאינו זמין כרגע.
          </p>
          <Button asChild>
            <Link to="/digital-courses">חזרה לרשימת הקורסים</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center mb-6 text-sm text-muted-foreground">
          <Link to="/digital-courses" className="hover:text-foreground">קורסים דיגיטליים</Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <Link to={`/digital-courses/${courseSlug}`} className="hover:text-foreground">
            {course.title}
          </Link>
          <ChevronRight className="mx-2 h-4 w-4" />
          <span className="text-foreground">{lesson.title}</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">{lesson.title}</h1>
        
        {canViewLesson ? (
          <>
            {/* Video Player */}
            <div className="mb-8">
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                <iframe
                  src={lesson.video_url}
                  title={lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full border-0"
                ></iframe>
              </div>
            </div>
            
            <Separator className="my-8" />
            
            {/* Lesson Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">תיאור השיעור</h2>
                <div className="prose max-w-none whitespace-pre-line">
                  {lesson.description}
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8 flex justify-between">
              <Button asChild variant="outline">
                <Link to={`/digital-courses/${courseSlug}`}>
                  <ChevronRight className="ml-2 h-4 w-4" />
                  חזרה לקורס
                </Link>
              </Button>
              
              <Button asChild>
                <Link to="/profile">
                  צפה בכל הקורסים שלך
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-amber-50 p-8 rounded-lg mb-8 max-w-md">
              <Lock className="mx-auto h-16 w-16 text-amber-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">תוכן נעול</h2>
              <p className="mb-6">
                שיעור זה זמין רק לאחר רכישת הקורס.
              </p>
              <Button asChild className="w-full">
                <Link to={`/digital-courses/${courseSlug}`}>
                  רכוש את הקורס לגישה מלאה
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Auth Dialog */}
      <Dialog open={showAuthDialog} onOpenChange={setShowAuthDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>נדרשת התחברות</DialogTitle>
            <DialogDescription>
              עליך להתחבר או להירשם כדי לצפות בשיעור זה.
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
              navigate("/auth", { state: { returnUrl: `/digital-courses/${courseSlug}/lessons/${lessonId}` } });
            }} className="w-full sm:w-auto">
              התחבר או הירשם
            </Button>
            <Button variant="outline" onClick={() => {
              setShowAuthDialog(false);
              navigate(`/digital-courses/${courseSlug}`);
            }} className="w-full sm:w-auto">
              חזרה לדף הקורס
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Purchase Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>נדרשת רכישה</DialogTitle>
            <DialogDescription>
              שיעור זה זמין רק לאחר רכישת הקורס.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center text-amber-600 bg-amber-50 p-3 rounded-md">
              <Play className="ml-2 h-5 w-5" />
              <span>רכוש את הקורס כדי לצפות בכל השיעורים.</span>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button onClick={() => {
              setShowPurchaseDialog(false);
              navigate(`/digital-courses/${courseSlug}`);
            }} className="w-full sm:w-auto">
              לדף הרכישה
            </Button>
            <Button variant="outline" onClick={() => setShowPurchaseDialog(false)} className="w-full sm:w-auto">
              סגור
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LessonDetail;
