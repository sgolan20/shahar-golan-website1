
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Trash2, Plus, FileVideo } from "lucide-react";
import { getAllCourses, createCourse, updateCourse, deleteCourse } from "@/services/courseService";
import { Course } from "@/lib/models/Course";
import { LessonManager } from "@/components/courses/LessonManager";

const courseSchema = z.object({
  title: z.string().min(2, { message: "כותרת חייבת להכיל לפחות 2 תווים" }),
  description: z.string().min(10, { message: "תיאור חייב להכיל לפחות 10 תווים" }),
  slug: z.string().min(2, { message: "Slug חייב להכיל לפחות 2 תווים" }).regex(/^[a-z0-9-]+$/, {
    message: "Slug יכול להכיל רק אותיות קטנות באנגלית, מספרים ומקפים",
  }),
  image_url: z.string().optional(),
  is_published: z.boolean().default(false),
});

type CourseFormValues = z.infer<typeof courseSchema>;

const CourseAdmin = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("courses");
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: courses, isLoading } = useQuery({
    queryKey: ["adminCourses"],
    queryFn: getAllCourses
  });

  const addCourseForm = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      image_url: "",
      is_published: false
    }
  });

  const editCourseForm = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: "",
      description: "",
      slug: "",
      image_url: "",
      is_published: false
    }
  });

  const createCourseMutation = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      setIsAddDialogOpen(false);
      addCourseForm.reset();
      toast({
        title: "הקורס נוצר בהצלחה",
        description: "הקורס החדש נוסף בהצלחה למערכת."
      });
    },
    onError: (error) => {
      toast({
        title: "שגיאה ביצירת הקורס",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateCourseMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Omit<Course, "id" | "created_at" | "updated_at">> }) => 
      updateCourse(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      setIsEditDialogOpen(false);
      setSelectedCourse(null);
      toast({
        title: "הקורס עודכן בהצלחה",
        description: "פרטי הקורס עודכנו בהצלחה."
      });
    },
    onError: (error) => {
      toast({
        title: "שגיאה בעדכון הקורס",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const deleteCourseMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      setIsDeleteDialogOpen(false);
      setSelectedCourse(null);
      toast({
        title: "הקורס נמחק בהצלחה",
        description: "הקורס הוסר בהצלחה מהמערכת."
      });
    },
    onError: (error) => {
      toast({
        title: "שגיאה במחיקת הקורס",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const onAddSubmit = (data: CourseFormValues) => {
    createCourseMutation.mutate(data);
  };

  const onEditSubmit = (data: CourseFormValues) => {
    if (selectedCourse) {
      updateCourseMutation.mutate({ id: selectedCourse.id, data });
    }
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    editCourseForm.reset({
      title: course.title,
      description: course.description,
      slug: course.slug,
      image_url: course.image_url || "",
      is_published: course.is_published
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteCourse = () => {
    if (selectedCourse) {
      deleteCourseMutation.mutate(selectedCourse.id);
    }
  };

  const handleManageLessons = (course: Course) => {
    setSelectedCourse(course);
    setActiveTab("lessons");
  };

  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">ניהול קורסים דיגיטליים</h1>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="ml-2 h-4 w-4" />
            הוסף קורס חדש
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="courses">קורסים</TabsTrigger>
            {selectedCourse && (
              <TabsTrigger value="lessons">
                שיעורים בקורס: {selectedCourse.title}
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="courses">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : courses && courses.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>כותרת</TableHead>
                      <TableHead>Slug</TableHead>
                      <TableHead>סטטוס</TableHead>
                      <TableHead className="text-left">פעולות</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.slug}</TableCell>
                        <TableCell>
                          {course.is_published ? (
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-sm text-green-800">
                              פורסם
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-sm text-yellow-800">
                              טיוטה
                            </span>
                          )}
                        </TableCell>
                        <TableCell className="space-x-2 space-x-reverse flex items-center">
                          <Button variant="outline" size="sm" onClick={() => handleManageLessons(course)}>
                            <FileVideo className="ml-2 h-4 w-4" />
                            שיעורים
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditCourse(course)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteCourse(course)}>
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
                <h3 className="text-xl font-medium mb-2">אין קורסים במערכת</h3>
                <p className="text-muted-foreground mb-6">לחץ על "הוסף קורס חדש" כדי להתחיל.</p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="ml-2 h-4 w-4" />
                  הוסף קורס חדש
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="lessons">
            {selectedCourse && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">ניהול שיעורים - {selectedCourse.title}</h2>
                  <Button variant="outline" onClick={() => setActiveTab("courses")}>
                    חזרה לרשימת הקורסים
                  </Button>
                </div>
                <LessonManager courseId={selectedCourse.id} />
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Add Course Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">הוספת קורס חדש</DialogTitle>
            </DialogHeader>
            <Form {...addCourseForm}>
              <form onSubmit={addCourseForm.handleSubmit(onAddSubmit)} className="space-y-6">
                <FormField
                  control={addCourseForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>כותרת הקורס</FormLabel>
                      <FormControl>
                        <Input placeholder="הכנס את כותרת הקורס" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addCourseForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תיאור הקורס</FormLabel>
                      <FormControl>
                        <Textarea placeholder="הכנס תיאור מפורט של הקורס" {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addCourseForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug (לשימוש ב-URL)</FormLabel>
                      <FormControl>
                        <Input placeholder="קורס-דוגמה" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addCourseForm.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>כתובת URL של תמונה</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={addCourseForm.control}
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
                        פרסם קורס (יוצג לכולם)
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button type="submit" disabled={createCourseMutation.isPending}>
                    {createCourseMutation.isPending ? "מוסיף..." : "הוסף קורס"}
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">ביטול</Button>
                  </DialogClose>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Edit Course Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">עריכת קורס</DialogTitle>
            </DialogHeader>
            <Form {...editCourseForm}>
              <form onSubmit={editCourseForm.handleSubmit(onEditSubmit)} className="space-y-6">
                <FormField
                  control={editCourseForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>כותרת הקורס</FormLabel>
                      <FormControl>
                        <Input placeholder="הכנס את כותרת הקורס" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editCourseForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תיאור הקורס</FormLabel>
                      <FormControl>
                        <Textarea placeholder="הכנס תיאור מפורט של הקורס" {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editCourseForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug (לשימוש ב-URL)</FormLabel>
                      <FormControl>
                        <Input placeholder="קורס-דוגמה" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editCourseForm.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>כתובת URL של תמונה</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/image.jpg" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editCourseForm.control}
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
                        פרסם קורס (יוצג לכולם)
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button type="submit" disabled={updateCourseMutation.isPending}>
                    {updateCourseMutation.isPending ? "מעדכן..." : "עדכן קורס"}
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="outline">ביטול</Button>
                  </DialogClose>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Delete Course Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">מחיקת קורס</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <p className="mb-2">האם אתה בטוח שברצונך למחוק את הקורס:</p>
              <p className="font-semibold">{selectedCourse?.title}</p>
              <p className="mt-4 text-destructive">שים לב: פעולה זו תמחק גם את כל השיעורים בקורס ולא ניתן לשחזר אותה.</p>
            </div>
            <div className="flex justify-end space-x-2 space-x-reverse">
              <Button 
                variant="destructive" 
                onClick={confirmDeleteCourse}
                disabled={deleteCourseMutation.isPending}
              >
                {deleteCourseMutation.isPending ? "מוחק..." : "כן, מחק קורס"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">ביטול</Button>
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CourseAdmin;
