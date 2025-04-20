
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
  if (process.env.NODE_ENV === 'development') {
    // בסביבת פיתוח של lovable, נשתמש במידע מוקלט/דמה
    return '/api/mocks';
  }
  // בסביבת פיתוח מקומית של netlify
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
    
    // בסביבת פיתוח של lovable, נחזיר נתונים מוקלטים
    if (process.env.NODE_ENV === 'development') {
      return getMockVideos();
    }
    
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
    return getMockVideos(); // בכל מקרה של שגיאה, ננסה להחזיר מידע מוקלט
  }
};

// נתוני דמה של סרטונים למקרה שאין חיבור לשרת או שיש שגיאה
const getMockVideos = (): YouTubeVideo[] => {
  return [
    {
      id: 'video1',
      title: 'הכירו את הבינה המלאכותית של גוגל - Gemini',
      description: 'סקירה מעמיקה על Gemini, כלי הבינה המלאכותית החדש של גוגל והיכולות המתקדמות שלו',
      publishedAt: '2024-04-01T10:00:00Z',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/dummy1/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/dummy1/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/dummy1/hqdefault.jpg', width: 480, height: 360 }
      },
      channelTitle: 'שחר גולן',
      channelId: CHANNEL_ID
    },
    {
      id: 'video2',
      title: 'איך להשתמש ב-AI לכתיבת תוכן שיווקי',
      description: 'מדריך מעשי לשימוש בכלי בינה מלאכותית ליצירת תוכן שיווקי אפקטיבי לעסקים',
      publishedAt: '2024-03-15T14:30:00Z',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/dummy2/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/dummy2/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/dummy2/hqdefault.jpg', width: 480, height: 360 }
      },
      channelTitle: 'שחר גולן',
      channelId: CHANNEL_ID
    },
    {
      id: 'video3',
      title: '5 כלי AI חינמיים שכל עסק צריך להכיר',
      description: 'סקירה של חמישה כלי בינה מלאכותית חינמיים שיכולים לעזור לעסקים קטנים ובינוניים',
      publishedAt: '2024-02-20T11:45:00Z',
      thumbnails: {
        default: { url: 'https://i.ytimg.com/vi/dummy3/default.jpg', width: 120, height: 90 },
        medium: { url: 'https://i.ytimg.com/vi/dummy3/mqdefault.jpg', width: 320, height: 180 },
        high: { url: 'https://i.ytimg.com/vi/dummy3/hqdefault.jpg', width: 480, height: 360 }
      },
      channelTitle: 'שחר גולן',
      channelId: CHANNEL_ID
    }
  ];
};
