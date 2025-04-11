
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BlogPost } from "@/lib/models/BlogPost";

interface BlogFiltersProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  onCreatePost: () => void;
  posts: BlogPost[];
}

const BlogFilters = ({ activeTab, onTabChange, onCreatePost, posts }: BlogFiltersProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <Tabs defaultValue="all" value={activeTab} onValueChange={onTabChange}>
        <TabsList>
          <TabsTrigger value="all">הכל ({posts.length})</TabsTrigger>
          <TabsTrigger value="published">
            פורסמו ({posts.filter(post => post.is_published).length})
          </TabsTrigger>
          <TabsTrigger value="draft">
            טיוטות ({posts.filter(post => !post.is_published).length})
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <Button 
        onClick={onCreatePost} 
        className="flex items-center gap-2"
      >
        <Plus size={16} />
        פוסט חדש
      </Button>
    </div>
  );
};

export default BlogFilters;
