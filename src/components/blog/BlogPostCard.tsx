
import { Calendar, User, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { BlogPost } from "@/lib/models/BlogPost";

interface BlogPostCardProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  formatDate: (date: string | Date) => string;
}

const BlogPostCard = ({ post, onEdit, onDelete, formatDate }: BlogPostCardProps) => {
  return (
    <Card className="h-full flex flex-col relative">
      {post.image_url && (
        <div className="h-40 overflow-hidden">
          <img 
            src={post.image_url} 
            alt={post.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://placehold.co/600x400/e2e8f0/64748b?text=תמונה+לא+נמצאה";
            }}
          />
        </div>
      )}
      <Badge 
        variant={post.is_published ? "default" : "outline"}
        className="absolute top-2 right-2"
      >
        {post.is_published ? "פורסם" : "טיוטה"}
      </Badge>
      <CardHeader>
        <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-3 text-muted-foreground mb-4">{post.summary}</p>
        <Collapsible className="space-y-2">
          <div className="flex flex-wrap gap-2 mb-2">
            {post.tags && post.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar size={14} />
            <span>{formatDate(post.publish_date)}</span>
          </div>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full mt-2">
              פרטים נוספים
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 pt-2 border-t">
            <div className="prose prose-sm max-w-none line-clamp-3 mb-2">
              {post.content}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User size={14} />
              <span>{post.author}</span>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="flex justify-between pt-2 border-t">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onDelete(post.id)}
          className="text-destructive border-destructive hover:bg-destructive/10"
        >
          <Trash2 size={16} />
        </Button>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onEdit(post)}
          >
            <Pencil size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <a href={`/blog/${post.id}`} target="_blank" rel="noopener noreferrer">
              {post.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogPostCard;
