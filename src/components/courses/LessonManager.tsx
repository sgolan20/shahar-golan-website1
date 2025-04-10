
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Trash2, Plus, MoveUp, MoveDown } from "lucide-react";
import { getLessonsForCourse, createLesson, updateLesson, deleteLesson } from "@/services/courseService";
import { Lesson } from "@/lib/models/Lesson";

const lessonSchema = z.object({
  title: z.string().min(2, { message: "כותרת חייבת להכיל לפחות 2 תווים" }),
  description: z.string().min(10, { message: "תיאור חייב להכיל לפחות 10 תווים" }),
  video_url: z.string().min(5, { message: "כתובת URL של הוידאו נדרשת" }),
  duration: z.coerce.number().min(0, { message: "משך הזמן לא יכול להיות שלילי" }).optional(),
  is_free: z.boolean().default(false),
  is_published: z.boolean().default(false),
});

type LessonFormValues = z.infer<typeof lessonSchema>;

interface LessonManagerProps {
  courseId: string;
}

export const LessonManager = ({ courseId }: LessonManagerProps) => {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: lessons, isLoading } = useQuery({
    queryKey: ["lessons", courseId],
    queryFn: () => getLessonsForCourse(courseId)
  });

  const addLessonForm = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      video_url: "",
      duration: 0,
      is_free: false,
      is_published: false
    }
  });

  const editLessonForm = useForm<LessonFormValues>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      video_url: "",
      duration: 0,
      is_free: false,
      is_published: false
    }
  });

  const createLessonMutation = useMutation({
    mutationFn: (data: LessonFormValues) => {
      // Calculate the next position
      const nextPosition = lessons && lessons.length > 0 
        ? Math.max(...lessons.map(l => l.position)) + 1 
        : 1;
      
      return createLesson({
        ...data,
        course_id: courseId,
        position: nextPosition
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
      setIsAddDialogOpen(false);
      addLessonForm.reset();
      toast({
        title: "השיעור נוצר בהצלחה",
        description: "השיעור החדש נוסף בהצלחה לקורס."
      });
    },
    onError: (error) => {
      toast({
        title: "שגיאה ביצירת השיעור",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateLessonMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Lesson> }) => 
      updateLesson(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
      setIsEditDialogOpen(false);
      setSelectedLesson(null);
      toast({
        title: "השיעור עודכן בהצלחה",
        description: "פרטי השיעור עודכנו בהצלחה."
      });
    },
    onError: (error) => {
      toast({
        title: "שגיאה בעדכון השיעור",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deleteLessonMutation = useMutation({
    mutationFn: deleteLesson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
      setIsDeleteDialogOpen(false);
      setSelectedLesson(null);
      toast({
        title: "השיעור נמחק בהצלחה",
        description: "השיעור הוסר בהצלחה מהקורס."
      });
    },
    onError: (error) => {
      toast({
        title: "שגיאה במחיקת השיעור",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const moveLessonMutation = useMutation({
    mutationFn: ({ id, position }: { id: string; position: number }) => 
      updateLesson(id, { position }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons", courseId] });
    },
    onError: (error) => {
      toast({
        title: "שגיאה בשינוי סדר השיעורים",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const onAddSubmit = (data: LessonFormValues) => {
    createLessonMutation.mutate(data);
  };

  const onEditSubmit = (data: LessonFormValues) => {
    if (selectedLesson) {
      updateLessonMutation.mutate({ 
        id: selectedLesson.id, 
        data: {
          ...data,
          course_id: courseId,
          position: selectedLesson.position
        }
      });
    }
  };

  const handleEditLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    editLessonForm.reset({
      title: lesson.title,
      description: lesson.description,
      video_url: lesson.video_url,
      duration: lesson.duration || 0,
      is_free: lesson.is_free,
      is_published: lesson.is_published
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteLesson = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteLesson = () => {
    if (selectedLesson) {
      deleteLessonMutation.mutate(selectedLesson.id);
    }
  };

  const moveLesson = (lesson: Lesson, direction: "up" | "down") => {
    if (!lessons) return;
    
    const sortedLessons = [...lessons].sort((a, b) => a.position - b.position);
    const currentIndex = sortedLessons.findIndex(l => l.id === lesson.id);
    
    if (direction === "up" && currentIndex > 0) {
      const targetLesson = sortedLessons[currentIndex - 1];
      moveLessonMutation.mutate({ id: lesson.id, position: targetLesson.position });
      moveLessonMutation.mutate({ id: targetLesson.id, position: lesson.position });
    } else if (direction === "down" && currentIndex < sortedLessons.length - 1) {
      const targetLesson = sortedLessons[currentIndex + 1];
      moveLessonMutation.mutate({ id: lesson.id, position: targetLesson.position });
      moveLessonMutation.mutate({ id: targetLesson.id, position: lesson.position });
    }
  };

  const formatDuration = (seconds: number | null) => {
    if (!seconds) return "לא צוין";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">שיעורים בקורס</h3>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          הוסף שיעור חדש
        </Button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : lessons && lessons.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>מס'</TableHead>
                <TableHead>כותרת</TableHead>
                <TableHead>משך זמן</TableHead>
                <TableHead>גישה</TableHead>
                <TableHead>סטטוס</TableHead>
                <TableHead className="text-left">פעולות</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lessons
                .sort((a, b) => a.position - b.position)
                .map((lesson, index) => (
                  <TableRow key={lesson.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className="font-medium">{lesson.title}</TableCell>
                    <TableCell>{formatDuration(lesson.duration)}</TableCell>
                    <TableCell>
                      {lesson.is_free ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-green-800">
                          חינמי
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-sm text-blue-800">
                          למנויים
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      {lesson.is_published ? (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-green-800">
                          פורסם
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-sm text-yellow-800">
                          טיוטה
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="space-x-1 space-x-reverse flex items-center">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => moveLesson(lesson, "up")}
                        disabled={index === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => moveLesson(lesson, "down")}
                        disabled={index === lessons.length - 1}
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditLesson(lesson)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDeleteLesson(lesson)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h3 className="text-xl font-medium mb-2">אין שיעורים בקורס זה</h3>
          <p className="text-muted-foreground mb-6">לחץ על "הוסף שיעור חדש" כדי להתחיל.</p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="ml-2 h-4 w-4" />
            הוסף שיעור חדש
          </Button>
        </div>
      )}

      {/* Add Lesson Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">הוספת שיעור חדש</DialogTitle>
          </DialogHeader>
          <Form {...addLessonForm}>
            <form onSubmit={addLessonForm.handleSubmit(onAddSubmit)} className="space-y-6">
              <FormField
                control={addLessonForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>כותרת השיעור</FormLabel>
                    <FormControl>
                      <Input placeholder="הכנס את כותרת השיעור" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addLessonForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>תיאור השיעור</FormLabel>
                    <FormControl>
                      <Textarea placeholder="הכנס תיאור של השיעור" {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addLessonForm.control}
                name="video_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>כתובת URL של הוידאו</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.youtube.com/embed/xxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addLessonForm.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>משך השיעור (בשניות)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={addLessonForm.control}
                  name="is_free"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-x-reverse space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        גישה חופשית (לכולם)
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={addLessonForm.control}
                  name="is_published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-x-reverse space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        פרסם שיעור
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end space-x-2 space-x-reverse">
                <Button type="submit" disabled={createLessonMutation.isPending}>
                  {createLessonMutation.isPending ? "מוסיף..." : "הוסף שיעור"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">ביטול</Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Lesson Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">עריכת שיעור</DialogTitle>
          </DialogHeader>
          <Form {...editLessonForm}>
            <form onSubmit={editLessonForm.handleSubmit(onEditSubmit)} className="space-y-6">
              <FormField
                control={editLessonForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>כותרת השיעור</FormLabel>
                    <FormControl>
                      <Input placeholder="הכנס את כותרת השיעור" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editLessonForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>תיאור השיעור</FormLabel>
                    <FormControl>
                      <Textarea placeholder="הכנס תיאור של השיעור" {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editLessonForm.control}
                name="video_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>כתובת URL של הוידאו</FormLabel>
                    <FormControl>
                      <Input placeholder="https://www.youtube.com/embed/xxxxx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={editLessonForm.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>משך השיעור (בשניות)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editLessonForm.control}
                  name="is_free"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-x-reverse space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        גישה חופשית (לכולם)
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={editLessonForm.control}
                  name="is_published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-x-reverse space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        פרסם שיעור
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-end space-x-2 space-x-reverse">
                <Button type="submit" disabled={updateLessonMutation.isPending}>
                  {updateLessonMutation.isPending ? "מעדכן..." : "עדכן שיעור"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="outline">ביטול</Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Lesson Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">מחיקת שיעור</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-2">האם אתה בטוח שברצונך למחוק את השיעור:</p>
            <p className="font-semibold">{selectedLesson?.title}</p>
            <p className="mt-4 text-destructive">שים לב: פעולה זו אינה ניתנת לשחזור.</p>
          </div>
          <div className="flex justify-end space-x-2 space-x-reverse">
            <Button 
              variant="destructive" 
              onClick={confirmDeleteLesson}
              disabled={deleteLessonMutation.isPending}
            >
              {deleteLessonMutation.isPending ? "מוחק..." : "כן, מחק שיעור"}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">ביטול</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
