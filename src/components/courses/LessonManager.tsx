
import { useState, useEffect } from "react";
import { Plus, Trash2, Save, Pencil, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { toast } from "sonner";
import { getLessonsForCourse, createLesson, updateLesson, deleteLesson } from "@/services/courseService";
import { Course } from "@/lib/models/Course";
import { Lesson } from "@/lib/models/Lesson";

interface LessonManagerProps {
  course: Course;
  onLessonsChange?: () => void;
}

const LessonManager = ({ course, onLessonsChange }: LessonManagerProps) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingLesson, setIsAddingLesson] = useState(false);
  const [isEditingLesson, setIsEditingLesson] = useState(false);
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    video_url: "",
    duration: 0,
    position: 1,
    is_free: false,
    is_published: false
  });
  
  useEffect(() => {
    fetchLessons();
  }, [course.id]);
  
  const fetchLessons = async () => {
    try {
      setIsLoading(true);
      const lessonsData = await getLessonsForCourse(course.id);
      
      // Sort by position
      const sortedLessons = lessonsData.sort((a, b) => a.position - b.position);
      setLessons(sortedLessons);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      toast.error("שגיאה בטעינת השיעורים");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    const processedValue = name === 'duration' ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };
  
  const handleSwitchChange = (name: string) => (checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };
  
  const handleAddLesson = async () => {
    try {
      // Make sure required fields are filled
      if (!formData.title || !formData.description || !formData.video_url) {
        toast.error("אנא מלא את כל השדות הנדרשים");
        return;
      }
      
      const newLesson = await createLesson({
        course_id: course.id,
        title: formData.title,
        description: formData.description,
        video_url: formData.video_url,
        duration: formData.duration,
        position: formData.position,
        is_free: formData.is_free,
        is_published: formData.is_published
      });
      
      setLessons(prev => [...prev, newLesson].sort((a, b) => a.position - b.position));
      resetForm();
      setIsAddingLesson(false);
      if (onLessonsChange) onLessonsChange();
      toast.success("השיעור נוצר בהצלחה");
    } catch (error) {
      console.error("Error creating lesson:", error);
      toast.error("שגיאה ביצירת השיעור");
    }
  };
  
  const handleUpdateLesson = async () => {
    if (!editingLessonId) return;
    
    try {
      // Make sure required fields are filled
      if (!formData.title || !formData.description || !formData.video_url) {
        toast.error("אנא מלא את כל השדות הנדרשים");
        return;
      }
      
      const updatedLesson = await updateLesson(editingLessonId, {
        title: formData.title,
        description: formData.description,
        video_url: formData.video_url,
        duration: formData.duration,
        position: formData.position,
        is_free: formData.is_free,
        is_published: formData.is_published
      });
      
      setLessons(prev => 
        prev.map(lesson => 
          lesson.id === editingLessonId ? updatedLesson : lesson
        ).sort((a, b) => a.position - b.position)
      );
      
      resetForm();
      setIsEditingLesson(false);
      setEditingLessonId(null);
      if (onLessonsChange) onLessonsChange();
      toast.success("השיעור עודכן בהצלחה");
    } catch (error) {
      console.error("Error updating lesson:", error);
      toast.error("שגיאה בעדכון השיעור");
    }
  };
  
  const handleDeleteLesson = async (id: string) => {
    if (!confirm("האם אתה בטוח שברצונך למחוק את השיעור הזה?")) return;
    
    try {
      await deleteLesson(id);
      setLessons(prev => prev.filter(lesson => lesson.id !== id));
      if (onLessonsChange) onLessonsChange();
      toast.success("השיעור נמחק בהצלחה");
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast.error("שגיאה במחיקת השיעור");
    }
  };
  
  const startEditingLesson = (lesson: Lesson) => {
    setFormData({
      title: lesson.title,
      description: lesson.description,
      video_url: lesson.video_url,
      duration: lesson.duration || 0,
      position: lesson.position,
      is_free: lesson.is_free,
      is_published: lesson.is_published
    });
    setIsEditingLesson(true);
    setEditingLessonId(lesson.id);
  };
  
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      video_url: "",
      duration: 0,
      position: lessons.length > 0 ? Math.max(...lessons.map(l => l.position)) + 1 : 1,
      is_free: false,
      is_published: false
    });
    setIsEditingLesson(false);
    setEditingLessonId(null);
  };
  
  const moveLesson = async (lessonId: string, direction: 'up' | 'down') => {
    const lessonIndex = lessons.findIndex(l => l.id === lessonId);
    if (lessonIndex === -1) return;
    
    const currentLesson = lessons[lessonIndex];
    
    // Cannot move up if already at the top
    if (direction === 'up' && lessonIndex === 0) return;
    
    // Cannot move down if already at the bottom
    if (direction === 'down' && lessonIndex === lessons.length - 1) return;
    
    const targetIndex = direction === 'up' ? lessonIndex - 1 : lessonIndex + 1;
    const targetLesson = lessons[targetIndex];
    
    try {
      // Swap positions
      await updateLesson(currentLesson.id, { position: targetLesson.position });
      await updateLesson(targetLesson.id, { position: currentLesson.position });
      
      // Update local state
      const updatedLessons = [...lessons];
      updatedLessons[lessonIndex] = { ...currentLesson, position: targetLesson.position };
      updatedLessons[targetIndex] = { ...targetLesson, position: currentLesson.position };
      
      setLessons(updatedLessons.sort((a, b) => a.position - b.position));
      if (onLessonsChange) onLessonsChange();
    } catch (error) {
      console.error("Error moving lesson:", error);
      toast.error("שגיאה בשינוי סדר השיעורים");
    }
  };
  
  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">ניהול שיעורים</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="flex items-center gap-2"
              onClick={() => {
                setIsAddingLesson(true);
                setIsEditingLesson(false);
                resetForm();
              }}
            >
              <Plus size={16} />
              הוסף שיעור
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {isEditingLesson ? "ערוך שיעור" : "הוסף שיעור חדש"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">כותרת השיעור</label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="הכנס כותרת לשיעור..."
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">תיאור השיעור</label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="תיאור קצר של תוכן השיעור..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="video_url" className="text-sm font-medium">קישור לוידאו</label>
                <Input
                  id="video_url"
                  name="video_url"
                  value={formData.video_url}
                  onChange={handleChange}
                  placeholder="הכנס קישור YouTube או Vimeo..."
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="duration" className="text-sm font-medium">משך זמן הוידאו (בשניות)</label>
                <Input
                  id="duration"
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="משך זמן הוידאו בשניות..."
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="position" className="text-sm font-medium">מיקום בקורס</label>
                <Input
                  id="position"
                  name="position"
                  type="number"
                  value={formData.position}
                  onChange={handleChange}
                  min={1}
                />
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="is_free"
                  checked={formData.is_free}
                  onCheckedChange={handleSwitchChange('is_free')}
                />
                <label htmlFor="is_free" className="text-sm font-medium">שיעור חינמי (זמין לכל המשתמשים)</label>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={handleSwitchChange('is_published')}
                />
                <label htmlFor="is_published" className="text-sm font-medium">פרסם שיעור</label>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">
                  ביטול
                </Button>
              </DialogClose>
              <Button
                onClick={isEditingLesson ? handleUpdateLesson : handleAddLesson}
                className="flex items-center gap-2"
              >
                <Save size={16} />
                {isEditingLesson ? "עדכן שיעור" : "הוסף שיעור"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-muted-foreground">טוען שיעורים...</p>
          </div>
        ) : lessons.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <p className="text-muted-foreground mb-4">אין שיעורים בקורס זה</p>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAddingLesson(true);
                resetForm();
              }}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              הוסף שיעור חדש
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <Card key={lesson.id} className={!lesson.is_published ? "opacity-70" : ""}>
                <CardHeader className="py-3">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <span className="flex justify-center items-center bg-primary/10 text-primary w-8 h-8 rounded-full">
                      {index + 1}
                    </span>
                    {lesson.title}
                    {lesson.is_free && (
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                        חינמי
                      </span>
                    )}
                    {!lesson.is_published && (
                      <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        טיוטה
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-sm text-muted-foreground">{lesson.description}</p>
                  {lesson.duration && (
                    <p className="text-xs text-muted-foreground mt-2">
                      משך: {Math.floor(lesson.duration / 60)} דקות {lesson.duration % 60} שניות
                    </p>
                  )}
                </CardContent>
                <CardFooter className="py-3 flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteLesson(lesson.id)}
                    className="text-destructive border-destructive hover:bg-destructive/10"
                  >
                    <Trash2 size={16} />
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => moveLesson(lesson.id, 'up')}
                      disabled={index === 0}
                    >
                      <ArrowUp size={16} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => moveLesson(lesson.id, 'down')}
                      disabled={index === lessons.length - 1}
                    >
                      <ArrowDown size={16} />
                    </Button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => startEditingLesson(lesson)}
                        >
                          <Pencil size={16} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>
                            ערוך שיעור
                          </DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <label htmlFor="title" className="text-sm font-medium">כותרת השיעור</label>
                            <Input
                              id="title"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                              placeholder="הכנס כותרת לשיעור..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium">תיאור השיעור</label>
                            <Textarea
                              id="description"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              placeholder="תיאור קצר של תוכן השיעור..."
                              rows={3}
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="video_url" className="text-sm font-medium">קישור לוידאו</label>
                            <Input
                              id="video_url"
                              name="video_url"
                              value={formData.video_url}
                              onChange={handleChange}
                              placeholder="הכנס קישור YouTube או Vimeo..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="duration" className="text-sm font-medium">משך זמן הוידאו (בשניות)</label>
                            <Input
                              id="duration"
                              name="duration"
                              type="number"
                              value={formData.duration}
                              onChange={handleChange}
                              placeholder="משך זמן הוידאו בשניות..."
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="position" className="text-sm font-medium">מיקום בקורס</label>
                            <Input
                              id="position"
                              name="position"
                              type="number"
                              value={formData.position}
                              onChange={handleChange}
                              min={1}
                            />
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Switch
                              id="is_free"
                              checked={formData.is_free}
                              onCheckedChange={handleSwitchChange('is_free')}
                            />
                            <label htmlFor="is_free" className="text-sm font-medium">שיעור חינמי (זמין לכל המשתמשים)</label>
                          </div>
                          <div className="flex items-center space-x-2 space-x-reverse">
                            <Switch
                              id="is_published"
                              checked={formData.is_published}
                              onCheckedChange={handleSwitchChange('is_published')}
                            />
                            <label htmlFor="is_published" className="text-sm font-medium">פרסם שיעור</label>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">
                              ביטול
                            </Button>
                          </DialogClose>
                          <Button
                            onClick={handleUpdateLesson}
                            className="flex items-center gap-2"
                          >
                            <Save size={16} />
                            עדכן שיעור
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonManager;
