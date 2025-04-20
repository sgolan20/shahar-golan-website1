
export interface UserCourse {
  id: string;
  user_id: string;
  course_id: string;
  course?: {
    title: string;
    slug: string;
    image_url: string | null;
    description: string;
  };
  granted_at: string;
  expires_at: string | null;
}
