
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getCourseBySlug, getLessonsForCourse } from "@/services/courseService";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PlayCircle, Lock, Calendar, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isPaidUser } = useAuth();

  const { data: course, isLoading: courseLoading, error: courseError } = useQuery({
    queryKey: ["course", slug],
    queryFn: () => getCourseBySlug(slug!),
    enabled: !!slug
  });

  const { data: lessons, isLoading: lessonsLoading, error: lessonsError } = useQuery({
    queryKey: ["lessons", course?.id],
    queryFn: () => getLessonsForCourse(course!.id),
    enabled: !!course?.id
  });

  const isLoading = courseLoading || lessonsLoading;
  const error = courseError || lessonsError;

  const handleLessonClick = (lessonId: string, isFree: boolean) => {
    if (isFree || isPaidUser) {
      navigate(`/digital-courses/${slug}/lessons/${lessonId}`);
    } else {
      toast({
        title: "דרוש מנוי משלם",
        description: "על מנת לצפות בתוכן זה עליך להתחבר ולשדרג למנוי משלם.",
        variant: "destructive"
      });
      if (!user) {
        navigate("/auth");
      }
    }
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

  if (error || !course) {
    return (
      <div className="container mx-auto py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">הקורס לא נמצא</h2>
          <p className="text-muted-foreground mb-8">לא הצלחנו למצוא את הקורס המבוקש.</p>
          <Button asChild>
            <Link to="/digital-courses">לרשימת הקורסים</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
            <div className="prose prose-lg max-w-none mb-8">
              <p>{course.description}</p>
            </div>

            <Separator className="my-8" />

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">תוכן הקורס</h2>
              {lessons && lessons.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {lessons.map((lesson, index) => (
                    <AccordionItem key={lesson.id} value={lesson.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center text-right">
                          <span className="font-medium">{index + 1}. {lesson.title}</span>
                          {!lesson.is_free && !isPaidUser && (
                            <Lock className="mr-2 h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>{lesson.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center text-sm text-muted-foreground">
                              {lesson.duration && (
                                <span className="flex items-center ml-4">
                                  <Clock className="ml-1 h-4 w-4" />
                                  {Math.floor(lesson.duration / 60)}:{(lesson.duration % 60).toString().padStart(2, '0')} דקות
                                </span>
                              )}
                              {lesson.is_free ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50">שיעור חינמי</Badge>
                              ) : (
                                <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/10">למנויים משלמים</Badge>
                              )}
                            </div>
                            <Button 
                              variant={lesson.is_free || isPaidUser ? "default" : "outline"}
                              onClick={() => handleLessonClick(lesson.id, lesson.is_free)}
                            >
                              {lesson.is_free || isPaidUser ? (
                                <>
                                  <PlayCircle className="ml-2 h-4 w-4" />
                                  לצפייה בשיעור
                                </>
                              ) : (
                                <>
                                  <Lock className="ml-2 h-4 w-4" />
                                  דרוש מנוי משלם
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-8 bg-muted rounded-lg">
                  <h3 className="text-xl font-medium mb-2">אין שיעורים זמינים כרגע</h3>
                  <p className="text-muted-foreground">שיעורים חדשים יתווספו בקרוב.</p>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-1">
            <Card>
              {course.image_url && (
                <div className="w-full aspect-video overflow-hidden">
                  <img 
                    src={course.image_url} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">סוג גישה:</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary hover:bg-primary/10">מנוי משלם</Badge>
                  </div>

                  {!user && (
                    <Button asChild className="w-full">
                      <Link to="/auth">התחבר לצפייה בקורס</Link>
                    </Button>
                  )}
                  
                  {user && !isPaidUser && (
                    <div className="space-y-4">
                      <div className="p-4 bg-yellow-50 text-yellow-800 rounded-lg">
                        <div className="flex">
                          <AlertCircle className="ml-2 h-5 w-5" />
                          <div>
                            <h4 className="font-semibold">דרוש מנוי משלם</h4>
                            <p className="text-sm">לצפייה בכל השיעורים בקורס יש לשדרג למנוי משלם.</p>
                          </div>
                        </div>
                      </div>
                      <Button className="w-full">שדרג למנוי משלם</Button>
                    </div>
                  )}
                  
                  {user && isPaidUser && (
                    <div className="p-4 bg-green-50 text-green-800 rounded-lg">
                      <div className="flex">
                        <CheckCircle className="ml-2 h-5 w-5" />
                        <div>
                          <h4 className="font-semibold">יש לך גישה מלאה</h4>
                          <p className="text-sm">אתה יכול לצפות בכל השיעורים בקורס זה.</p>
                        </div>
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

export default CourseDetail;
