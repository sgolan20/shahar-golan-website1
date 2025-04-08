
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  imageUrl?: string;
  tags?: string[];
  isPublished: boolean;
  publishDate: Date | string;
  created_at?: Date | string;
  updated_at?: Date | string;
}
