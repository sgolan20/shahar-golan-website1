const axios = require('axios');

// מפתח ה-API של YouTube (יהיה מוסתר בסביבת Netlify)
const API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = 'UCWpncdvMbjNwtljABXcAbHA';
const CHANNEL_USERNAME = 'sgolan20';

exports.handler = async function(event, context) {
  // הוספת CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  // טיפול בבקשות preflight OPTIONS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'Preflight call successful' })
    };
  }

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
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`
      );
      
      if (response.data.items && response.data.items.length > 0) {
        console.log('Found videos in channel:', response.data.items.length);
        const videos = response.data.items.map(item => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          thumbnails: item.snippet.thumbnails,
          channelTitle: item.snippet.channelTitle
        }));
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(videos)
        };
      }
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
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&key=${API_KEY}`
      );
      
      if (response.data.items && response.data.items.length > 0) {
        console.log('Found videos with username:', response.data.items.length);
        const videos = response.data.items.map(item => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          publishedAt: item.snippet.publishedAt,
          thumbnails: item.snippet.thumbnails,
          channelTitle: item.snippet.channelTitle
        }));
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(videos)
        };
      }
    }
    
    // אם עדיין לא נמצא, ננסה לחפש ישירות את הסרטונים לפי מילת מפתח של שם הערוץ
    console.log('Trying to search for videos by channel name');
    const searchResponse = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${CHANNEL_USERNAME}&type=video&maxResults=50&key=${API_KEY}`
    );
    
    if (searchResponse.data.items && searchResponse.data.items.length > 0) {
      console.log('Found videos through search:', searchResponse.data.items.length);
      const videos = searchResponse.data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails,
        channelTitle: item.snippet.channelTitle
      }));
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(videos)
      };
    }
    
    console.log('No videos found with any method');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify([])
    };
  } catch (error) {
    console.error('Error fetching channel videos:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error fetching channel videos' })
    };
  }
};
