import { 
  collection, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  where, 
  Timestamp,
  serverTimestamp
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BlogPost } from "@/lib/models/BlogPost";

const COLLECTION_NAME = "blogPosts";
const blogCollection = collection(db, COLLECTION_NAME);

// קבלת כל הפוסטים
export const getAllBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(blogCollection, orderBy("publishDate", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<BlogPost, 'id'>
    }));
  } catch (error) {
    console.error("שגיאה בטעינת פוסטים:", error);
    throw error;
  }
};

// קבלת פוסטים מפורסמים בלבד
export const getPublishedBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(
      blogCollection, 
      where("isPublished", "==", true),
      orderBy("publishDate", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<BlogPost, 'id'>
    }));
  } catch (error) {
    console.error("שגיאה בטעינת פוסטים מפורסמים:", error);
    throw error;
  }
};

// קבלת פוסט לפי מזהה
export const getBlogPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data() as Omit<BlogPost, 'id'>
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("שגיאה בטעינת פוסט:", error);
    throw error;
  }
};

// הוספת פוסט חדש
export const addBlogPost = async (blogPost: Omit<BlogPost, 'id'>): Promise<string> => {
  try {
    // וידוא שיש תאריך פרסום, אחרת שימוש בתאריך הנוכחי
    const postWithTimestamp = {
      ...blogPost,
      publishDate: blogPost.publishDate || serverTimestamp()
    };
    
    const docRef = await addDoc(blogCollection, postWithTimestamp);
    return docRef.id;
  } catch (error) {
    console.error("שגיאה בהוספת פוסט:", error);
    throw error;
  }
};

// עדכון פוסט קיים
export const updateBlogPost = async (id: string, blogPost: Partial<BlogPost>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await updateDoc(docRef, blogPost);
  } catch (error) {
    console.error("שגיאה בעדכון פוסט:", error);
    throw error;
  }
};

// מחיקת פוסט
export const deleteBlogPost = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("שגיאה במחיקת פוסט:", error);
    throw error;
  }
};

// חיפוש פוסטים לפי תגיות
export const getBlogPostsByTag = async (tag: string): Promise<BlogPost[]> => {
  try {
    const q = query(
      blogCollection, 
      where("tags", "array-contains", tag),
      where("isPublished", "==", true),
      orderBy("publishDate", "desc")
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data() as Omit<BlogPost, 'id'>
    }));
  } catch (error) {
    console.error("שגיאה בחיפוש פוסטים לפי תגית:", error);
    throw error;
  }
};
