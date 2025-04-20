import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { createLesson, updateLesson, getLessonsForCourse } from "@/services/courseService";
import { Lesson } from "@/lib/models/Lesson";

// סכמת ולידציה לטופס
const formSchema = z.object({
  title: z.string().min(2, { message: "כותרת חייבת להכיל לפחות 2 תווים" }),
  description: z.string().min(10, { message: "תיאור חייב להכיל לפחות 10 תווים" }),
  video_url: z.string().url({ message: "נא להזין כתובת URL תקינה" }),
  duration: z.coerce.number().min(0, { message: "משך השיעור לא יכול להיות שלילי" }).optional(),
  position: z.coerce.number().min(1, { message: "מיקום חייב להיות מספר חיובי" }),
  is_free: z.boolean().default(false),
  is_published: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

interface LessonFormProps {
  courseId: string;
  lesson?: Lesson;
  onSuccess: () => void;
  onCancel: () => void;
}

const LessonForm = ({ courseId, lesson, onSuccess, onCancel }: LessonFormProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [maxPosition, setMaxPosition] = useState(1);
  
  const isEditMode = !!lesson;
  
  // יצירת הטופס עם ערכי ברירת מחדל
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: lesson?.title || "",
      description: lesson?.description || "",
      video_url: lesson?.video_url || "",
      duration: lesson?.duration || 0,
      position: lesson?.position || 1,
      is_free: lesson?.is_free || false,
      is_published: lesson?.is_published || false,
    }
  });
  
  // שליפת המיקום המקסימלי הנוכחי של השיעורים בקורס
  useEffect(() => {
    const fetchMaxPosition = async () => {
      try {
        const lessons = await getLessonsForCourse(courseId);
        if (lessons.length > 0) {
          const max = Math.max(...lessons.map(l => l.position));
          setMaxPosition(max);
          
          // אם זה שיעור חדש, הגדר את המיקום כמיקום הבא בתור
          if (!isEditMode) {
            form.setValue("position", max + 1);
          }
        }
      } catch (error) {
        console.error("Error fetching lessons for position:", error);
      }
    };
    
    fetchMaxPosition();
  }, [courseId, isEditMode]);
  
  // שליחת הטופס
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      if (isEditMode && lesson) {
        // עדכון שיעור קיים
        await updateLesson(lesson.id, {
          title: data.title,
          description: data.description,
          video_url: data.video_url,
          duration: data.duration || 0,
          position: data.position,
          is_free: data.is_free,
          is_published: data.is_published
        });
        
        toast({
          title: "השיעור עודכן בהצלחה",
          description: "פרטי השיעור עודכנו בהצלחה."
        });
      } else {
        // יצירת שיעור חדש
        await createLesson({
          course_id: courseId,
          title: data.title,
          description: data.description,
          video_url: data.video_url,
          duration: data.duration || 0,
          position: data.position,
          is_free: data.is_free,
          is_published: data.is_published
        });
        
        toast({
          title: "השיעור נוצר בהצלחה",
          description: "השיעור החדש נוסף בהצלחה לקורס."
        });
      }
      
      // קריאה לפונקציית ההצלחה
      onSuccess();
    } catch (error) {
      console.error("Error submitting lesson:", error);
      toast({
        title: "שגיאה בשמירת השיעור",
        description: "אירעה שגיאה בעת שמירת השיעור. נא לנסות שוב.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>כותרת השיעור</FormLabel>
              <FormControl>
                <Input {...field} placeholder="הזן כותרת לשיעור" />
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
              <FormLabel>תיאור השיעור</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="הזן תיאור מפורט של השיעור" 
                  rows={4}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="video_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>קישור לוידאו</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="הזן קישור לוידאו השיעור" />
                </FormControl>
                <FormDescription>
                  קישור ישיר לוידאו ביוטיוב או פלטפורמה אחרת
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>משך השיעור (בדקות)</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number" 
                    min="0"
                    placeholder="הזן את משך השיעור בדקות" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem>
                <FormLabel>מיקום בקורס</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="number" 
                    min="1"
                    placeholder="מיקום" 
                  />
                </FormControl>
                <FormDescription>
                  מספר סידורי של השיעור בקורס
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="is_free"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>שיעור חינמי</FormLabel>
                  <FormDescription>
                    האם השיעור יהיה זמין לצפייה ללא תשלום
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="is_published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>פרסום השיעור</FormLabel>
                  <FormDescription>
                    האם השיעור יהיה גלוי לתלמידים
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <Separator />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            ביטול
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "שומר..." : isEditMode ? "עדכן שיעור" : "צור שיעור"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LessonForm;
