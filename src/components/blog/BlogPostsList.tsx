
import { BlogPost } from "@/lib/models/BlogPost";
import BlogPostCard from "./BlogPostCard";

interface BlogPostsListProps {
  posts: BlogPost[];
  isLoading: boolean;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  formatDate: (date: string | Date) => string;
}

const BlogPostsList = ({ posts, isLoading, onEdit, onDelete, formatDate }: BlogPostsListProps) => {
  if (posts.length === 0 && !isLoading) {
    return (
      <div className="col-span-full text-center py-12">
        <p className="text-muted-foreground">אין פוסטים להצגה</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogPostCard 
          key={post.id} 
          post={post} 
          onEdit={onEdit} 
          onDelete={onDelete}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
};

export default BlogPostsList;
