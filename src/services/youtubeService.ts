
import axios from 'axios';
import { YouTubeVideo, YouTubeThumbnails } from '@/lib/models/YouTubeVideo';

// Export the interface for playlists - this isn't defined in our models yet
export interface YouTubePlaylist {
  id: string;
  title: string;
  description: string;
  thumbnails: YouTubeThumbnails;
  itemCount: number;
}

// פונקציה להחזרת ה-base URL של הפונקציות, בהתאם לסביבה
const getFunctionsBaseUrl = (): string => {
  // בסביבת פיתוח מקומית
  if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // השתמש בפורט של האתר הנוכחי, כי netlify dev מפנה את הפונקציות לאותו פורט
    return `${window.location.origin}/.netlify/functions`;
  }
  // בסביבת ייצור
  return '/.netlify/functions';
};

// פונקציה לקבלת כל הפלייליסטים בערוץ
export const getChannelPlaylists = async (): Promise<YouTubePlaylist[]> => {
  try {
    console.log('Fetching playlists from Netlify function');
    const response = await axios.get(`${getFunctionsBaseUrl()}/get-playlists`);
    
    // וידוא שהתגובה היא מערך
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      console.error('Response is not an array:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return [];
  }
};

// פונקציה לקבלת כל הסרטונים בפלייליסט מסוים
export const getPlaylistVideos = async (playlistId: string): Promise<YouTubeVideo[]> => {
  try {
    console.log('Fetching videos for playlist from Netlify function:', playlistId);
    const response = await axios.get(`${getFunctionsBaseUrl()}/get-playlist-videos`, {
      params: { playlistId }
    });
    
    // וידוא שהתגובה היא מערך
    if (Array.isArray(response.data)) {
      // Add the channelId property to each video to conform to our interface
      const videos = response.data.map(video => ({
        ...video,
        channelId: video.channelId || CHANNEL_ID // Use existing channelId or default
      }));
      return videos;
    } else {
      console.error('Response is not an array:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    return [];
  }
};

// Define a default channel ID to use when one isn't provided by the API
const CHANNEL_ID = 'UCWpncdvMbjNwtljABXcAbHA';

// פונקציה לקבלת כל הסרטונים בערוץ
export const getChannelVideos = async (): Promise<YouTubeVideo[]> => {
  try {
    console.log('Fetching videos for channel from Netlify function');
    const response = await axios.get(`${getFunctionsBaseUrl()}/get-channel-videos`);
    
    // וידוא שהתגובה היא מערך
    if (Array.isArray(response.data)) {
      // Add the channelId property to each video to conform to our interface
      const videos = response.data.map(video => ({
        ...video,
        channelId: video.channelId || CHANNEL_ID // Use existing channelId or default
      }));
      return videos;
    } else {
      console.error('Response is not an array:', response.data);
      return [];
    }
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    return [];
  }
};
