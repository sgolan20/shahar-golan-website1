const axios = require('axios');

// מפתח ה-API של YouTube (יהיה מוסתר בסביבת Netlify)
const API_KEY = process.env.YOUTUBE_API_KEY;

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

  // קבלת מזהה הפלייליסט מפרמטרים של ה-URL
  const params = event.queryStringParameters;
  const playlistId = params && params.playlistId;

  if (!playlistId) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'Playlist ID is required' })
    };
  }

  try {
    console.log('Fetching videos for playlist:', playlistId);
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`
    );

    if (response.data.items && response.data.items.length > 0) {
      console.log('Found videos in playlist:', response.data.items.length);
      const videos = response.data.items.map(item => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnails: item.snippet.thumbnails,
        channelTitle: item.snippet.channelTitle,
        playlistId: playlistId
      }));
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(videos)
      };
    }
    
    console.log('No videos found in playlist');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify([])
    };
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error fetching playlist videos' })
    };
  }
};
