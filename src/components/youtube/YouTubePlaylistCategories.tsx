import { Button } from "@/components/ui/button";
import { YouTubePlaylist } from "@/services/youtubeService";

interface YouTubePlaylistCategoriesProps {
  playlists: YouTubePlaylist[];
  selectedPlaylistId: string | null;
  onSelectPlaylist: (playlistId: string | null) => void;
  isLoading: boolean;
}

const YouTubePlaylistCategories = ({
  playlists,
  selectedPlaylistId,
  onSelectPlaylist,
  isLoading,
}: YouTubePlaylistCategoriesProps) => {
  if (isLoading) {
    return (
      <div className="flex flex-wrap gap-2 animate-pulse">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="h-9 w-24 bg-gray-200 rounded-md"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={selectedPlaylistId === null ? "default" : "outline"}
        size="sm"
        onClick={() => onSelectPlaylist(null)}
        className="min-w-16"
      >
        הכל
      </Button>
      
      {playlists.map((playlist) => (
        <Button
          key={playlist.id}
          variant={selectedPlaylistId === playlist.id ? "default" : "outline"}
          size="sm"
          onClick={() => onSelectPlaylist(playlist.id)}
          className="min-w-16"
        >
          {playlist.title}
        </Button>
      ))}
    </div>
  );
};

export default YouTubePlaylistCategories;
