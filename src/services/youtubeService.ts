import axios from 'axios';

// יש להחליף את ה-API_KEY בערך אמיתי לאחר יצירת מפתח ב-Google Cloud Console
const API_KEY = 'AIzaSyAMetJRvJVnWFUCghborI4k1KZ-Psr10h0';
const CHANNEL_ID = 'UCWpncdvMbjNwtljABXcAbHA';
const CHANNEL_USERNAME = 'sgolan20';

// טיפוסים עבור נתוני YouTube
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
    standard?: { url: string; width: number; height: number };
    maxres?: { url: string; width: number; height: number };
  };
  channelTitle: string;
  playlistId?: string;
}

export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnails: {
    default: { url: string; width: number; height: number };
    medium: { url: string; width: number; height: number };
    high: { url: string; width: number; height: number };
    standard?: { url: string; width: number; height: number };
    maxres?: { url: string; width: number; height: number };
  };
  itemCount: number;
}

// פונקציה לקבלת כל הפלייליסטים בערוץ
export const getChannelPlaylists = async (): Promise<YouTubePlaylist[]> => {
  try {
    console.log('Fetching playlists for channel:', CHANNEL_ID);
    // נסה לקבל את הפלייליסטים לפי מזהה הערוץ
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=50&key=${API_KEY}`
    );

    if (response.data.items && response.data.items.length > 0) {
      console.log('Found playlists:', response.data.items.length);
      return response.data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
        itemCount: item.contentDetails.itemCount
      }));
    }
    
    // אם לא נמצאו פלייליסטים, נסה לפי שם המשתמש
    console.log('No playlists found with channelId, trying with forUsername:', CHANNEL_USERNAME);
    const usernameResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${CHANNEL_USERNAME}&key=${API_KEY}`
    );
    
    if (usernameResponse.data.items && usernameResponse.data.items.length > 0) {
      const channelId = usernameResponse.data.items[0].id;
      console.log('Found channel ID from username:', channelId);
      
      const playlistsResponse = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=50&key=${API_KEY}`
      );
      
      if (playlistsResponse.data.items) {
        console.log('Found playlists with username:', playlistsResponse.data.items.length);
        return playlistsResponse.data.items.map((item: any) => ({
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnails: item.snippet.thumbnails,
          itemCount: item.contentDetails.itemCount
        }));
      }
    }
    
    console.log('No playlists found with either method');
    return [];
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
};

// פונקציה לקבלת כל הסרטונים בפלייליסט מסוים
export const getPlaylistVideos = async (playlistId: string): Promise<YouTubeVideo[]> => {
  try {
    console.log('Fetching videos for playlist:', playlistId);
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`
    );

    if (response.data.items && response.data.items.length > 0) {
      console.log('Found videos in playlist:', response.data.items.length);
      return response.data.items.map((item: any) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails,
        channelTitle: item.snippet.channelTitle,
        playlistId: playlistId
      }));
    }
    console.log('No videos found in playlist');
    return [];
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    return [];
  }
};

// פונקציה לקבלת כל הסרטונים בערוץ
export const getChannelVideos = async (): Promise<YouTubeVideo[]> => {
  try {
    console.log('Fetching videos for channel:', CHANNEL_ID);
    // קודם נקבל את מזהה הפלייליסט של ההעלאות בערוץ
    const channelResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
    );

    if (channelResponse.data.items && channelResponse.data.items.length > 0) {
      // מזהה הפלייליסט של ההעלאות
      const uploadsPlaylistId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
      console.log('Found uploads playlist ID:', uploadsPlaylistId);
      
      // כעת נקבל את כל הסרטונים מפלייליסט ההעלאות
      return await getPlaylistVideos(uploadsPlaylistId);
    }
    
    // אם לא נמצא ערוץ לפי מזהה, ננסה לפי שם משתמש
    console.log('No channel found with ID, trying with forUsername:', CHANNEL_USERNAME);
    const usernameResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=${CHANNEL_USERNAME}&key=${API_KEY}`
    );
    
    if (usernameResponse.data.items && usernameResponse.data.items.length > 0) {
      const uploadsPlaylistId = usernameResponse.data.items[0].contentDetails.relatedPlaylists.uploads;
      console.log('Found uploads playlist ID from username:', uploadsPlaylistId);
      
      // כעת נקבל את כל הסרטונים מפלייליסט ההעלאות
      return await getPlaylistVideos(uploadsPlaylistId);
    }
    
    // אם עדיין לא נמצא, ננסה לחפש ישירות את הסרטונים לפי מילת מפתח של שם הערוץ
    console.log('Trying to search for videos by channel name');
    const searchResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${CHANNEL_USERNAME}&type=video&maxResults=50&key=${API_KEY}`
    );
    
    if (searchResponse.data.items && searchResponse.data.items.length > 0) {
      console.log('Found videos through search:', searchResponse.data.items.length);
      return searchResponse.data.items.map((item: any) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails,
        channelTitle: item.snippet.channelTitle
      }));
    }
    
    console.log('No videos found with any method');
    return [];
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    return [];
  }
};
