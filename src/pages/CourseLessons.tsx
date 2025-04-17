import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogClose 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, Plus, Pencil, Trash2, Video, Clock, Eye, EyeOff, Lock, Unlock } from "lucide-react";
import { getCourseById, getLessonsForCourse } from "@/services/courseService";
import { Course } from "@/lib/models/Course";
import { Lesson } from "@/lib/models/Lesson";
import LessonForm from "@/components/courses/LessonForm";

const CourseLessons = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  
  // פונקציה לחזרה לדף ניהול הקורסים
  const handleBackToCourses = () => {
    navigate("/admin/courses");
  };
  
  // שליפת פרטי הקורס
  const { 
    data: course, 
    isLoading: isLoadingCourse,
    error: courseError
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId as string),
    enabled: !!courseId
  });
  
  // שליפת השיעורים של הקורס
  const { 
    data: lessons, 
    isLoading: isLoadingLessons,
    error: lessonsError
  } = useQuery({
    queryKey: ["lessons", courseId],
    queryFn: () => getLessonsForCourse(courseId as string),
    enabled: !!courseId
  });
  
  // רענון הנתונים לאחר שינויים
  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
  };
  
  // פתיחת דיאלוג הוספת שיעור חדש
  const handleAddLesson = () => {
    setSelectedLesson(null);
    setIsAddDialogOpen(true);
  };
  
  // פתיחת דיאלוג עריכת שיעור
  const handleEditLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsEditDialogOpen(true);
  };
  
  // טיפול בסגירת דיאלוגים לאחר פעולה מוצלחת
  const handleSuccess = () => {
    setIsAddDialogOpen(false);
    setIsEditDialogOpen(false);
    setSelectedLesson(null);
    refreshData();
  };
  
  if (isLoadingCourse) {
    return <div className="container py-8 text-center">טוען פרטי קורס...</div>;
  }
  
  if (courseError) {
    return (
      <div className="container py-8 text-center">
        <p className="text-red-500 mb-4">שגיאה בטעינת פרטי הקורס</p>
        <Button onClick={handleBackToCourses} variant="outline">
          <ArrowLeft className="ml-2 h-4 w-4" />
          חזרה לרשימת הקורסים
        </Button>
      </div>
    );
  }
  
  if (!course) {
    return (
      <div className="container py-8 text-center">
        <p className="mb-4">הקורס לא נמצא</p>
        <Button onClick={handleBackToCourses} variant="outline">
          <ArrowLeft className="ml-2 h-4 w-4" />
          חזרה לרשימת הקורסים
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="text-muted-foreground mt-1">ניהול שיעורים</p>
        </div>
        <Button onClick={handleBackToCourses} variant="outline">
          <ArrowLeft className="ml-2 h-4 w-4" />
          חזרה לרשימת הקורסים
        </Button>
      </div>
      
      <Separator className="my-6" />
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">שיעורים בקורס</h2>
        <Button onClick={handleAddLesson}>
          <Plus className="ml-2 h-4 w-4" />
          הוסף שיעור חדש
        </Button>
      </div>
      
      {isLoadingLessons ? (
        <div className="text-center py-8">טוען שיעורים...</div>
      ) : lessonsError ? (
        <div className="text-center py-8 text-red-500">שגיאה בטעינת השיעורים</div>
      ) : lessons && lessons.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">מס'</TableHead>
              <TableHead>כותרת</TableHead>
              <TableHead className="w-24 text-center">משך</TableHead>
              <TableHead className="w-24 text-center">חינמי</TableHead>
              <TableHead className="w-24 text-center">מפורסם</TableHead>
              <TableHead className="w-32 text-center">פעולות</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lessons.map((lesson) => (
              <TableRow key={lesson.id}>
                <TableCell className="text-center font-medium">{lesson.position}</TableCell>
                <TableCell>
                  <div className="font-medium">{lesson.title}</div>
                  <div className="text-sm text-muted-foreground truncate max-w-md">
                    {lesson.description.length > 100 
                      ? `${lesson.description.substring(0, 100)}...` 
                      : lesson.description}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {lesson.duration ? (
                    <div className="flex items-center justify-center">
                      <Clock className="h-4 w-4 ml-1" />
                      {lesson.duration} דק'
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {lesson.is_free ? (
                    <Unlock className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <Lock className="h-5 w-5 text-amber-500 mx-auto" />
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {lesson.is_published ? (
                    <Eye className="h-5 w-5 text-green-500 mx-auto" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-gray-400 mx-auto" />
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center gap-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEditLesson(lesson)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => window.open(lesson.video_url, '_blank')}
                    >
                      <Video className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-12 border rounded-md bg-muted/20">
          <p className="text-muted-foreground mb-4">אין עדיין שיעורים בקורס זה</p>
          <Button onClick={handleAddLesson}>
            <Plus className="ml-2 h-4 w-4" />
            הוסף שיעור חדש
          </Button>
        </div>
      )}
      
      {/* דיאלוג הוספת שיעור חדש */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>הוספת שיעור חדש</DialogTitle>
          </DialogHeader>
          <LessonForm 
            courseId={courseId as string}
            onSuccess={handleSuccess}
            onCancel={() => setIsAddDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
      
      {/* דיאלוג עריכת שיעור */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>עריכת שיעור</DialogTitle>
          </DialogHeader>
          {selectedLesson && (
            <LessonForm 
              courseId={courseId as string}
              lesson={selectedLesson}
              onSuccess={handleSuccess}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseLessons;
