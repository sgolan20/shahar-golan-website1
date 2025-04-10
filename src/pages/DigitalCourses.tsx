
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPublishedCourses } from "@/services/courseService";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlayCircle, Book, Clock, Settings } from "lucide-react";
import { Course } from "@/lib/models/Course";
import { useAuth } from "@/contexts/AuthContext";

const DigitalCourses = () => {
  const { isAdmin } = useAuth();
  const { data: courses, isLoading, error } = useQuery({
    queryKey: ["publishedCourses"],
    queryFn: getPublishedCourses
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-16 md:py-24">
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">אירעה שגיאה בטעינת הקורסים</h2>
          <p className="text-muted-foreground">אנא נסה שוב מאוחר יותר.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">הקורסים הדיגיטליים שלי</h1>
          {isAdmin && (
            <Button asChild variant="outline" className="gap-2">
              <Link to="/course-admin">
                <Settings className="h-4 w-4" />
                ניהול קורסים
              </Link>
            </Button>
          )}
        </div>
        <p className="text-xl text-muted-foreground mb-8">
          קורסים מקיפים בנושאי בינה מלאכותית, ממשק משתמש AI וכלי AI מתקדמים
        </p>

        <Separator className="my-8" />

        {courses && courses.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">אין קורסים זמינים כרגע</h3>
            <p className="text-muted-foreground">
              קורסים חדשים יתווספו בקרוב. חזור מאוחר יותר.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      {course.image_url && (
        <div className="h-48 overflow-hidden">
          <img 
            src={course.image_url} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle className="text-xl">{course.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Book className="ml-2 h-4 w-4" />
          <span>קורס דיגיטלי</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={`/digital-courses/${course.slug}`}>
            <PlayCircle className="ml-2 h-5 w-5" />
            לפרטים והרשמה
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DigitalCourses;
