const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = 'AIzaSyBfsNcJJHd-O0ftUzH2KqIRc_KhXgPXne0'; // Replace with your actual YouTube API key

app.get('/', async (req, res) => {
    if (req.query.name && req.query.name.trim() !== '') {
        const query = encodeURIComponent(req.query.name.trim());
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                const videoId = data.items[0].id.videoId;
                const title = data.items[0].snippet.title;
                const artist = data.items[0].snippet.channelTitle;
                const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                const downloadUrl = `https://vivekfy.vercel.app/download/audio?url=https://www.youtube.com/watch?v=${videoId}`;
                const developerName = "Vivek Masona";

                // Create JSON response
                const responseJson = {
                    title,
                    artist,
                    thumbnailUrl,
                    downloadUrl,
                    developerName
                };

                res.json(responseJson);
            } else {
                res.json({ error: 'Song not found.' });
            }
        } catch (error) {
            res.json({ error: 'An error occurred.' });
        }
    } else {
        res.json({ error: 'Please enter a song name in the URL query parameter.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
