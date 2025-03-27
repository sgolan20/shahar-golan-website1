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
    console.log('Fetching playlists for channel:', CHANNEL_ID);
    // נסה לקבל את הפלייליסטים לפי מזהה הערוץ
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&channelId=${CHANNEL_ID}&maxResults=50&key=${API_KEY}`
    );

    if (response.data.items && response.data.items.length > 0) {
      console.log('Found playlists:', response.data.items.length);
      const playlists = response.data.items.map(item => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnails: item.snippet.thumbnails,
        itemCount: item.contentDetails.itemCount
      }));
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(playlists)
      };
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
        const playlists = playlistsResponse.data.items.map(item => ({
          id: item.id,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnails: item.snippet.thumbnails,
          itemCount: item.contentDetails.itemCount
        }));
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(playlists)
        };
      }
    }
    
    console.log('No playlists found with either method');
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify([])
    };
  } catch (error) {
    console.error('Error fetching playlists:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Error fetching playlists' })
    };
  }
};
