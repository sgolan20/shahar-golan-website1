
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  image_url?: string;
  tags?: string[];
  is_published: boolean;
  publish_date: string | Date;
  created_at?: string | Date;
  updated_at?: string | Date;
}
