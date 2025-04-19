
export interface Course {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  slug: string;
  is_published: boolean;
  is_free: boolean;
  price: number | null;
  created_at: string;
  updated_at: string;
}
