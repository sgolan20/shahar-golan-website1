
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  image_url?: string;
  tags?: string[];
  is_published: boolean;
  publish_date: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
