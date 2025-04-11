import { useState, useRef } from "react";
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
  FormDescription,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Trash2, Plus, RefreshCw, Upload, Image, Database, Check, AlertCircle } from "lucide-react";
import { getAllCourses, createCourse, updateCourse, deleteCourse } from "@/services/courseService";
import { uploadImage, checkStorageAccess } from "@/services/storageService";
import { Course } from "@/lib/models/Course";
import LessonManager from "@/components/courses/LessonManager";

const formSchema = z.object({
  title: z.string().min(2, { message: "כותרת חייבת להכיל לפחות 2 תווים" }),
  description: z.string().min(10, { message: "תיאור חייב להכיל לפחות 10 תווים" }),
  image_url: z.string().optional(),
  is_published: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const CourseAdmin = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [editImagePreview, setEditImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isCheckingStorage, setIsCheckingStorage] = useState(false);
  const [storageAccessStatus, setStorageAccessStatus] = useState<boolean | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: courses, isLoading, refetch } = useQuery({
    queryKey: ["adminCourses"],
    queryFn: getAllCourses
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      is_published: false
    }
  });

  const editForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image_url: "",
      is_published: false
    }
  });

  const createCourseMutation = useMutation({
    mutationFn: async (data: FormValues) => {
      const uniqueSlug = generateSlug(data.title);
      let finalImageUrl = data.image_url || null;
      
      // אם יש קובץ תמונה, העלה אותו לסופהבייס
      if (imageFile) {
        setIsUploading(true);
        try {
          finalImageUrl = await uploadImage(imageFile);
        } catch (error) {
          console.error("שגיאה בהעלאת התמונה:", error);
          throw new Error("נכשלה העלאת התמונה");
        } finally {
          setIsUploading(false);
        }
      }
      
      return createCourse({
        title: data.title,
        description: data.description,
        slug: uniqueSlug,
        image_url: finalImageUrl,
        is_published: data.is_published || false
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      setIsAddDialogOpen(false);
      form.reset();
      setImageFile(null);
      setImagePreview("");
      toast({
        title: "הקורס נוצר בהצלחה",
        description: "הקורס החדש נוסף בהצלחה למערכת."
      });
    },
    onError: (error: any) => {
      toast({
        title: "שגיאה ביצירת הקורס",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const updateCourseMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: Partial<Course> }) => {
      let updatedData = { ...data };
      
      // אם יש קובץ תמונה חדש, העלה אותו לסופהבייס
      if (editImageFile) {
        setIsUploading(true);
        try {
          const imageUrl = await uploadImage(editImageFile);
          updatedData.image_url = imageUrl;
        } catch (error) {
          console.error("שגיאה בהעלאת התמונה:", error);
          throw new Error("נכשלה העלאת התמונה");
        } finally {
          setIsUploading(false);
        }
      }
      
      return updateCourse(id, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["adminCourses"] });
      setIsEditDialogOpen(false);
      setSelectedCourse(null);
      setEditImageFile(null);
      setEditImagePreview("");
      toast({
        title: "הקורס עודכן בהצלחה",
        description: "פרטי הקורס עודכנו בהצלחה."
      });
    },
    onError: (error: any) => {
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
    onError: (error: any) => {
      toast({
        title: "שגיאה במחיקת הקורס",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: FormValues) => {
    createCourseMutation.mutate(data);
  };

  const onEditSubmit = (data: FormValues) => {
    if (selectedCourse) {
      updateCourseMutation.mutate({ id: selectedCourse.id, data });
    }
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    editForm.reset({
      title: course.title,
      description: course.description,
      image_url: course.image_url || "",
      is_published: course.is_published
    });
    setEditImagePreview(course.image_url || "");
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

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/\s+/g, '-').slice(0, 50);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, isEdit: boolean = false) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // בדיקה שהקובץ הוא תמונה
    if (!file.type.startsWith('image/')) {
      toast({
        title: "סוג קובץ לא נתמך",
        description: "אנא בחר קובץ תמונה (JPG, PNG, GIF, וכו')",
        variant: "destructive"
      });
      return;
    }

    // הגבלת גודל קובץ (5MB)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast({
        title: "קובץ גדול מדי",
        description: "גודל הקובץ לא יכול לעלות על 5MB",
        variant: "destructive"
      });
      return;
    }

    // יצירת תצוגה מקדימה של התמונה
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (isEdit) {
        setEditImagePreview(result);
        setEditImageFile(file);
      } else {
        setImagePreview(result);
        setImageFile(file);
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerFileInput = (isEdit: boolean = false) => {
    if (isEdit) {
      editFileInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">ניהול קורסים</h1>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={async () => {
                  setIsCheckingStorage(true);
                  try {
                    const result = await checkStorageAccess();
                    const hasAccess = result.success;
                    setStorageAccessStatus(hasAccess);
                    
                    // הצגת הבאקטים הקיימים
                    const bucketInfo = result.buckets.length > 0 
                      ? `נמצאו הבאקטים הבאים: ${result.buckets.join(', ')}` 
                      : 'לא נמצאו באקטים';
                    
                    toast({
                      title: hasAccess ? "גישה לאחסון תקינה" : "בעיה בגישה לאחסון",
                      description: hasAccess 
                        ? `יש לך גישה תקינה לאחסון בסופהבייס. ${bucketInfo}` 
                        : "אין גישה לאחסון בסופהבייס. בדוק את ההרשאות וההגדרות.",
                      variant: hasAccess ? "default" : "destructive"
                    });
                  } catch (error) {
                    setStorageAccessStatus(false);
                    toast({
                      title: "שגיאה בבדיקת האחסון",
                      description: "אירעה שגיאה בבדיקת הגישה לאחסון בסופהבייס.",
                      variant: "destructive"
                    });
                  } finally {
                    setIsCheckingStorage(false);
                  }
                }}
                disabled={isCheckingStorage}
              >
                {isCheckingStorage ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-b-2 border-primary"></div>
                    בודק...
                  </>
                ) : (
                  <>
                    <Database className="ml-2 h-4 w-4" />
                    בדוק גישה לאחסון
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={() => refetch()}>
                <RefreshCw className="ml-2 h-4 w-4" />
                רענן רשימה
              </Button>
            </div>
          </div>
          
          {storageAccessStatus !== null && (
            <div className={`p-3 rounded-md flex items-center ${storageAccessStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {storageAccessStatus ? (
                <>
                  <Check className="h-5 w-5 ml-2" />
                  <span>יש גישה תקינה לאחסון בסופהבייס. ניתן להעלות תמונות.</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 ml-2" />
                  <span>אין גישה לאחסון בסופהבייס. בדוק את ההרשאות וההגדרות.</span>
                </>
              )}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 gap-12">
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>כותרת</TableHead>
                    <TableHead>תיאור</TableHead>
                    <TableHead>סטטוס</TableHead>
                    <TableHead className="text-left">פעולות</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.description}</TableCell>
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
                      <TableCell className="space-x-1 space-x-reverse">
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

            {selectedCourse && (
              <LessonManager course={selectedCourse} onLessonsChange={() => refetch()}/>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-muted rounded-lg">
            <h3 className="text-xl font-medium mb-2">אין קורסים במערכת</h3>
            <p className="text-muted-foreground">לחץ על "הוסף קורס חדש" כדי להתחיל.</p>
          </div>
        )}

        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="ml-2 h-4 w-4" />
          הוסף קורס חדש
        </Button>

        {/* Add Course Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">הוספת קורס חדש</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
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
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תיאור הקורס</FormLabel>
                      <FormControl>
                        <Textarea placeholder="הכנס תיאור של הקורס" {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תמונת הקורס</FormLabel>
                      <div className="space-y-4">
                        <input
                          type="file"
                          accept="image/*"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={(e) => handleFileChange(e)}
                        />
                        <div className="flex flex-col gap-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => triggerFileInput()}
                            className="w-full h-32 flex flex-col items-center justify-center border-dashed"
                          >
                            {imagePreview ? (
                              <div className="relative w-full h-full">
                                <img 
                                  src={imagePreview} 
                                  alt="תצוגה מקדימה" 
                                  className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                                  <span className="text-white">החלף תמונה</span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <Upload className="h-8 w-8 mb-2" />
                                <span>לחץ להעלאת תמונה</span>
                              </>
                            )}
                          </Button>
                          {imagePreview && (
                            <div className="flex justify-end">
                              <Button 
                                type="button" 
                                variant="ghost" 
                                onClick={() => {
                                  setImageFile(null);
                                  setImagePreview("");
                                }}
                                size="sm"
                              >
                                הסר תמונה
                              </Button>
                            </div>
                          )}
                        </div>
                        <FormControl>
                          <Input 
                            placeholder="או הזן כתובת URL של תמונה" 
                            {...field} 
                            value={imageFile ? '' : field.value}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              if (e.target.value) {
                                setImageFile(null);
                                setImagePreview("");
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          העלה תמונה מהמחשב או הזן כתובת URL לתמונה מהאינטרנט
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
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
                        פרסם קורס
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button type="submit" disabled={createCourseMutation.isPending || isUploading}>
                    {createCourseMutation.isPending || isUploading ? "מוסיף..." : "הוסף קורס"}
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
            <Form {...editForm}>
              <form onSubmit={editForm.handleSubmit(onEditSubmit)} className="space-y-6">
                <FormField
                  control={editForm.control}
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
                  control={editForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תיאור הקורס</FormLabel>
                      <FormControl>
                        <Textarea placeholder="הכנס תיאור של הקורס" {...field} rows={4} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>תמונת הקורס</FormLabel>
                      <div className="space-y-4">
                        <input
                          type="file"
                          accept="image/*"
                          ref={editFileInputRef}
                          style={{ display: 'none' }}
                          onChange={(e) => handleFileChange(e, true)}
                        />
                        <div className="flex flex-col gap-4">
                          <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => triggerFileInput(true)}
                            className="w-full h-32 flex flex-col items-center justify-center border-dashed"
                          >
                            {editImagePreview ? (
                              <div className="relative w-full h-full">
                                <img 
                                  src={editImagePreview} 
                                  alt="תצוגה מקדימה" 
                                  className="w-full h-full object-contain"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                                  <span className="text-white">החלף תמונה</span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <Upload className="h-8 w-8 mb-2" />
                                <span>לחץ להעלאת תמונה</span>
                              </>
                            )}
                          </Button>
                          {editImagePreview && (
                            <div className="flex justify-end">
                              <Button 
                                type="button" 
                                variant="ghost" 
                                onClick={() => {
                                  setEditImageFile(null);
                                  setEditImagePreview("");
                                  field.onChange("");
                                }}
                                size="sm"
                              >
                                הסר תמונה
                              </Button>
                            </div>
                          )}
                        </div>
                        <FormControl>
                          <Input 
                            placeholder="או הזן כתובת URL של תמונה" 
                            {...field} 
                            value={editImageFile ? '' : field.value}
                            onChange={(e) => {
                              field.onChange(e.target.value);
                              if (e.target.value) {
                                setEditImageFile(null);
                                setEditImagePreview(e.target.value);
                              }
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          העלה תמונה מהמחשב או הזן כתובת URL לתמונה מהאינטרנט
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
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
                        פרסם קורס
                      </FormLabel>
                    </FormItem>
                  )}
                />
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button type="submit" disabled={updateCourseMutation.isPending || isUploading}>
                    {updateCourseMutation.isPending || isUploading ? "מעדכן..." : "עדכן קורס"}
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
              <p className="mt-4 text-destructive">שים לב: פעולה זו אינה ניתנת לשחזור.</p>
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
