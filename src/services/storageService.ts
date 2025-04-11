
import { supabase } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

// העלאת תמונה לסופהבייס
export const uploadImage = async (file: File, customBucket?: string): Promise<string> => {
  try {
    // שימוש בבאקט המוגדר או בברירת מחדל
    const bucket = customBucket || 'course_images';
    
    // יצירת שם קובץ ייחודי עם סיומת מקורית
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    console.log(`מנסה להעלות קובץ ${fileName} לבאקט ${bucket}`);

    // העלאת הקובץ לסופהבייס
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (uploadError) {
      console.error("שגיאה בהעלאת התמונה:", JSON.stringify(uploadError));
      throw new Error(`נכשלה העלאת התמונה: ${uploadError.message}`);
    }

    console.log("הקובץ הועלה בהצלחה:", uploadData);

    // קבלת URL ציבורי לתמונה
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    if (!data || !data.publicUrl) {
      throw new Error("לא ניתן לקבל URL ציבורי לתמונה");
    }

    console.log("התקבל URL ציבורי:", data.publicUrl);
    return data.publicUrl;
  } catch (error: any) {
    console.error("שגיאה בהעלאת התמונה:", error);
    throw new Error(`נכשלה העלאת התמונה: ${error.message || 'שגיאה לא ידועה'}`);
  }
};

// מחיקת תמונה מסופהבייס
export const deleteImage = async (url: string, customBucket?: string): Promise<void> => {
  // שימוש בבאקט המוגדר או בברירת מחדל
  const bucket = customBucket || 'course_images';
  try {
    // חילוץ שם הקובץ מה-URL
    const fileName = url.split('/').pop();
    
    if (!fileName) {
      throw new Error("לא ניתן לחלץ את שם הקובץ מה-URL");
    }

    console.log(`מנסה למחוק קובץ ${fileName} מבאקט ${bucket}`);

    const { error } = await supabase.storage
      .from(bucket)
      .remove([fileName]);

    if (error) {
      console.error("שגיאה במחיקת התמונה:", JSON.stringify(error));
      throw new Error(`נכשלה מחיקת התמונה: ${error.message}`);
    }

    console.log(`הקובץ ${fileName} נמחק בהצלחה`);
  } catch (error: any) {
    console.error("שגיאה במחיקת התמונה:", error);
    throw new Error(`נכשלה מחיקת התמונה: ${error.message || 'שגיאה לא ידועה'}`);
  }
};

// בדיקה אם יש גישה לאחסון בסופהבייס
export const checkStorageAccess = async (): Promise<{success: boolean, buckets: string[]}> => {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error("שגיאה בבדיקת גישה לאחסון:", JSON.stringify(error));
      return { success: false, buckets: [] };
    }
    
    const bucketNames = data.map(bucket => bucket.name);
    console.log("באקטים קיימים:", bucketNames);
    return { success: true, buckets: bucketNames };
  } catch (error) {
    console.error("שגיאה בבדיקת גישה לאחסון:", error);
    return { success: false, buckets: [] };
  }
};

// קבלת באקט ברירת מחדל לאחסון תמונות
export const getDefaultBucket = async (): Promise<string> => {
  const { success, buckets } = await checkStorageAccess();
  
  if (!success || buckets.length === 0) {
    return 'course_images'; // אם אין באקטים, השתמש בבאקט ברירת המחדל
  }
  
  // בדוק אם הבאקט הרצוי קיים ברשימה
  if (buckets.includes('course_images')) {
    return 'course_images';
  }
  
  // אחרת השתמש בבאקט הראשון ברשימה
  return buckets[0];
};
