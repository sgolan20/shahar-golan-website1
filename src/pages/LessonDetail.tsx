import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLessonById, getCourseBySlug } from "@/services/courseService";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Clock, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Lesson } from "@/lib/models/Lesson";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { extractYouTubeId } from "@/components/youtube/YouTubeVideo";

const LessonDetail = () => {
  const { courseSlug, lessonId } = useParams<{ courseSlug: string, lessonId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isPaidUser, isAdmin } = useAuth();

  const { data: lesson, isLoading: lessonLoading } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => getLessonById(lessonId!),
    enabled: !!lessonId
  });

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course", courseSlug],
    queryFn: () => getCourseBySlug(courseSlug!),
    enabled: !!courseSlug
  });

  const isLoading = lessonLoading || courseLoading;

  useEffect(() => {
    // Check if user has permission to view this lesson
    if (!isLoading && lesson && course) {
      const hasAccess = checkUserAccess(lesson);
      if (!hasAccess) {
        redirectToCoursePage();
      }
    }
  }, [isLoading, lesson, course, isPaidUser, user]);

  const checkUserAccess = (lesson: Lesson) => {
    // Users can access free lessons
    if (lesson.is_free) {
      return true;
    }

    // Paid users can access any lesson
    if (isPaidUser) {
      return true;
    }

    // Otherwise, user doesn't have access
    return false;
  };

  const redirectToCoursePage = () => {
    toast({
      title: "אין לך גישה לשיעור זה",
      description: "על מנת לצפות בשיעור זה עליך לשדרג למנוי משלם",
      variant: "destructive",
    });
    if (courseSlug) {
      navigate(`/digital-courses/${courseSlug}`);
    } else {
      navigate("/digital-courses");
    }
  };

  const getVideoEmbedUrl = (url: string): string => {
    // Handle YouTube URLs
    const youtubeId = extractYouTubeId(url);
    if (youtubeId) {
      return `https://www.youtube.com/embed/${youtubeId}`;
    }
    
    // Handle Vimeo URLs
    const vimeoRegex = /(?:vimeo)\.com\/(?:.*\/)?(?:videos\/)?([0-9]+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch && vimeoMatch[1]) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    // If no match, return original URL
    return url;
  };

  if (isLoading) {
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
          <p className="text-muted-foreground mb-8">לא הצלחנו למצוא את השיעור המבוקש.</p>
          <Button asChild>
            <Link to={`/digital-courses${courseSlug ? `/${courseSlug}` : ''}`}>
              חזרה לקורס
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Instead of using the ProtectedRoute component with custom props,
  // we'll implement the access control logic directly
  if (!checkUserAccess(lesson)) {
    redirectToCoursePage();
    return null;
  }

  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Button
            variant="ghost"
            asChild
            className="mb-4"
          >
            <Link to={`/digital-courses/${courseSlug}`} className="flex items-center">
              <ChevronRight className="ml-2 h-5 w-5" />
              חזרה ל{course.title}
            </Link>
          </Button>
          
          {isAdmin && (
            <Button 
              asChild 
              variant="outline" 
              size="sm"
              className="gap-2"
            >
              <Link to="/course-admin" state={{ selectedCourseId: course.id, editingLessonId: lesson.id }}>
                <Settings className="h-4 w-4" />
                ערוך שיעור
              </Link>
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="w-full aspect-video mb-6 bg-black rounded-lg overflow-hidden">
              <iframe
                src={getVideoEmbedUrl(lesson.video_url)}
                title={lesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                style={{ position: 'relative', width: '100%', height: '100%' }}
              ></iframe>
            </div>

            <div>
              <h1 className="text-3xl font-bold mb-4">{lesson.title}</h1>
              <p className="text-muted-foreground mb-6">{lesson.description}</p>
              
              <Separator className="my-6" />
              
              <div className="prose prose-lg max-w-none">
                {lesson.content && (
                  <div>
                    {lesson.content.split('\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">פרטי השיעור</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">קורס</p>
                    <p className="font-medium">{course.title}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">סוג גישה</p>
                    {lesson.is_free ? (
                      <Badge className="bg-green-50 text-green-700 hover:bg-green-50">שיעור חינמי</Badge>
                    ) : (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/10">מנוי משלם</Badge>
                    )}
                  </div>
                  
                  {lesson.duration && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">משך השיעור</p>
                      <div className="flex items-center">
                        <Clock className="ml-2 h-4 w-4 text-muted-foreground" />
                        <span>
                          {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')} דקות
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
