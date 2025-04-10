
export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  content?: string;
  video_url: string;
  duration: number | null;
  position: number;
  is_free: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}
