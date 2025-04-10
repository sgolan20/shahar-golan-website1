import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourseBySlug, getLessonById, getLessonsForCourse } from "@/services/courseService";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Lock, List } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Lesson } from "@/lib/models/Lesson";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { extractYouTubeId } from "@/components/youtube/YouTubeVideo";

const LessonDetail = () => {
  const { courseSlug, lessonId } = useParams<{ courseSlug: string, lessonId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isPaidUser } = useAuth();

  const { data: course, isLoading: courseLoading } = useQuery({
    queryKey: ["course", courseSlug],
    queryFn: () => getCourseBySlug(courseSlug!),
    enabled: !!courseSlug
  });

  const { data: lessons, isLoading: lessonsLoading } = useQuery({
    queryKey: ["lessons", course?.id],
    queryFn: () => getLessonsForCourse(course!.id),
    enabled: !!course?.id
  });

  const { data: lesson, isLoading: lessonLoading } = useQuery({
    queryKey: ["lesson", lessonId],
    queryFn: () => getLessonById(lessonId!),
    enabled: !!lessonId
  });

  const isLoading = courseLoading || lessonsLoading || lessonLoading;

  useEffect(() => {
    if (!isLoading && lesson && !lesson.is_free && !isPaidUser) {
      toast({
        title: "גישה אסורה",
        description: "לצפייה בתוכן זה נדרש מנוי משלם.",
        variant: "destructive"
      });
      navigate(`/digital-courses/${courseSlug}`);
    }
  }, [isLoading, lesson, isPaidUser, courseSlug, navigate, toast]);

  const getCurrentLessonIndex = () => {
    if (!lessons || !lesson) return -1;
    return lessons.findIndex(l => l.id === lesson.id);
  };

  const getNextLesson = () => {
    if (!lessons) return null;
    const currentIndex = getCurrentLessonIndex();
    if (currentIndex < 0 || currentIndex >= lessons.length - 1) return null;
    return lessons[currentIndex + 1];
  };

  const getPreviousLesson = () => {
    if (!lessons) return null;
    const currentIndex = getCurrentLessonIndex();
    if (currentIndex <= 0) return null;
    return lessons[currentIndex - 1];
  };

  const navigateToPreviousLesson = () => {
    const prevLesson = getPreviousLesson();
    if (prevLesson) {
      navigate(`/digital-courses/${courseSlug}/lessons/${prevLesson.id}`);
    }
  };

  const navigateToNextLesson = () => {
    const nextLesson = getNextLesson();
    if (nextLesson) {
      if (nextLesson.is_free || isPaidUser) {
        navigate(`/digital-courses/${courseSlug}/lessons/${nextLesson.id}`);
      } else {
        toast({
          title: "דרוש מנוי משלם",
          description: "לצפייה בשיעור הבא נדרש מנוי משלם.",
          variant: "destructive"
        });
      }
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

  if (!course || !lesson) {
    return (
      <div className="container mx-auto py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">השיעור לא נמצא</h2>
          <p className="text-muted-foreground mb-8">לא הצלחנו למצוא את השיעור המבוקש.</p>
          <Button asChild>
            <Link to={`/digital-courses/${courseSlug}`}>בחזרה לקורס</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Check for secured content
  if (!lesson.is_free && !isPaidUser) {
    return (
      <ProtectedRoute requiredRole="paid">
        <div>זהו תוכן מוגן</div>
      </ProtectedRoute>
    );
  }

  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Button variant="ghost" asChild className="p-0 h-auto hover:bg-transparent">
              <Link to={`/digital-courses/${courseSlug}`} className="flex items-center text-muted-foreground hover:text-primary">
                <ChevronRight className="mr-1 h-4 w-4" />
                בחזרה לקורס: {course.title}
              </Link>
            </Button>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">{lesson.title}</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
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

            <div className="prose prose-lg max-w-none mb-8">
              <p>{lesson.description}</p>
            </div>

            <div className="flex items-center justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={navigateToPreviousLesson}
                disabled={!getPreviousLesson()}
              >
                שיעור קודם
              </Button>
              <Button 
                onClick={navigateToNextLesson}
                disabled={!getNextLesson()}
              >
                {getNextLesson() && !getNextLesson()?.is_free && !isPaidUser ? (
                  <>
                    <Lock className="ml-2 h-4 w-4" />
                    שיעור הבא (מנויים בלבד)
                  </>
                ) : (
                  "שיעור הבא"
                )}
              </Button>
            </div>
          </div>

          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">שיעורים בקורס</h3>
                  <Separator className="my-2" />
                </div>
                
                {lessons && lessons.length > 0 ? (
                  <div className="space-y-3">
                    {lessons.map((lessonItem, index) => (
                      <div 
                        key={lessonItem.id}
                        className={`p-2 rounded-md transition-colors ${
                          lessonItem.id === lesson.id ? 'bg-primary/10' : 'hover:bg-muted'
                        }`}
                      >
                        <Button 
                          variant="ghost" 
                          className={`w-full justify-start h-auto p-2 ${
                            lessonItem.id === lesson.id ? 'font-semibold' : ''
                          }`}
                          onClick={() => {
                            if (lessonItem.is_free || isPaidUser) {
                              navigate(`/digital-courses/${courseSlug}/lessons/${lessonItem.id}`);
                            } else {
                              toast({
                                title: "דרוש מנוי משלם",
                                description: "לצפייה בשיעור זה נדרש מנוי משלם.",
                                variant: "destructive"
                              });
                            }
                          }}
                        >
                          <div className="flex items-center text-right">
                            <span className="ml-2">{index + 1}.</span>
                            <span className="flex-1">{lessonItem.title}</span>
                            {!lessonItem.is_free && !isPaidUser && (
                              <Lock className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">אין שיעורים נוספים.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonDetail;
