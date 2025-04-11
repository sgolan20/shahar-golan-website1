
import { useState, useRef } from "react";
import { X, Image, Loader2 } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { uploadImage } from "@/services/storageService";
import { BlogPost } from "@/lib/models/BlogPost";

interface BlogPostFormProps {
  isEditing: boolean;
  initialData: {
    title: string;
    content: string;
    summary: string;
    author: string;
    image_url?: string;
    is_published: boolean;
    publish_date: string;
    tags: string[];
    newTag: string;
  };
  onSubmit: (formData: Omit<BlogPost, "id" | "created_at" | "updated_at"> & { newTag: string }) => void;
  onCancel: () => void;
}

const BlogPostForm = ({ isEditing, initialData, onSubmit, onCancel }: BlogPostFormProps) => {
  const [formData, setFormData] = useState(initialData);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, is_published: checked }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    try {
      setIsUploading(true);
      const imageUrl = await uploadImage(file, 'course_images');
      setFormData(prev => ({ ...prev, image_url: imageUrl }));
      toast.success("התמונה הועלתה בהצלחה");
    } catch (error) {
      console.error("שגיאה בהעלאת התמונה:", error);
      toast.error("שגיאה בהעלאת התמונה");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const triggerImageUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ""
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>{isEditing ? "עריכת פוסט" : "יצירת פוסט חדש"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">כותרת</label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="הכנס כותרת..."
                required
              />
            </div>
            
            <div>
              <label htmlFor="summary" className="block text-sm font-medium mb-1">תקציר</label>
              <Textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="הכנס תקציר קצר..."
                rows={2}
                required
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">תוכן</label>
              <div className="rtl quill-container" dir="rtl">
                <style dangerouslySetInnerHTML={{ __html: `
                  .quill-container .ql-editor {
                    direction: rtl;
                    text-align: right;
                  }
                  .quill-container .ql-snow.ql-toolbar {
                    direction: rtl;
                  }
                  .quill-container .ql-snow .ql-picker:not(.ql-color-picker):not(.ql-icon-picker) .ql-picker-label {
                    padding-right: 8px;
                  }
                `}} />
                <ReactQuill
                  theme="snow"
                  value={formData.content}
                  onChange={(content) => {
                    setFormData(prev => ({
                      ...prev,
                      content: content
                    }));
                  }}
                  placeholder="הכנס את תוכן הפוסט..."
                  modules={{
                    toolbar: [
                      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                      ['bold', 'italic', 'underline', 'strike'],
                      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                      [{ 'align': [] }],
                      [{ 'direction': 'rtl' }],
                      [{ 'color': [] }, { 'background': [] }],
                      ['link', 'image'],
                      ['clean']
                    ],
                  }}
                  formats={[
                    'header',
                    'bold', 'italic', 'underline', 'strike',
                    'list', 'bullet',
                    'align',
                    'direction',
                    'color', 'background',
                    'link', 'image'
                  ]}
                  style={{ height: '300px', marginBottom: '50px' }}
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="image_url" className="block text-sm font-medium mb-1">תמונה למאמר</label>
              <div className="flex flex-col space-y-3">
                <div className="flex gap-3">
                  <Input
                    id="image_url"
                    name="image_url"
                    value={formData.image_url || ""}
                    onChange={handleChange}
                    placeholder="הכנס קישור לתמונה..."
                    className="flex-grow"
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={triggerImageUpload}
                    disabled={isUploading}
                    className="flex items-center gap-2"
                  >
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Image className="h-4 w-4" />
                    )}
                    העלאת תמונה
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                
                {formData.image_url && (
                  <div className="mt-2 w-40 h-40 rounded-md overflow-hidden">
                    <img 
                      src={formData.image_url} 
                      alt="תצוגה מקדימה" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e2e8f0/64748b?text=תמונה+לא+נמצאה";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-1">תגיות</label>
              <div className="flex items-center gap-2">
                <Input
                  id="newTag"
                  name="newTag"
                  value={formData.newTag}
                  onChange={handleChange}
                  onKeyDown={handleTagKeyDown}
                  placeholder="הוסף תגית..."
                  className="flex-grow"
                />
                <Button type="button" onClick={addTag} variant="outline">הוסף</Button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map(tag => (
                    <Badge key={tag} className="flex items-center gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 hover:text-destructive"
                      >
                        <X size={14} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div>
              <label htmlFor="publish_date" className="block text-sm font-medium mb-1">תאריך פרסום</label>
              <Input
                id="publish_date"
                name="publish_date"
                type="date"
                value={formData.publish_date}
                onChange={handleChange}
              />
            </div>
            
            <div className="flex items-center space-x-2 space-x-reverse">
              <Switch
                id="is_published"
                checked={formData.is_published}
                onCheckedChange={handleSwitchChange}
              />
              <label 
                htmlFor="is_published" 
                className="text-sm font-medium cursor-pointer"
              >
                {formData.is_published ? "פורסם" : "טיוטה"}
              </label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end gap-3">
        <Button variant="outline" onClick={onCancel}>
          ביטול
        </Button>
        <Button onClick={handleSubmit}>
          {isEditing ? "עדכן פוסט" : "צור פוסט"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogPostForm;
