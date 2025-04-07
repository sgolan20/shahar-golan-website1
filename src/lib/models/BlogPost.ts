export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  publishDate: Date | string;
  imageUrl?: string;
  tags: string[];
  isPublished: boolean;
}
