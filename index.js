const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = 'AIzaSyBfsNcJJHd-O0ftUzH2KqIRc_KhXgPXne0'; // Replace with your actual YouTube API key

app.get('/', async (req, res) => {
    if (req.query.name && req.query.name.trim() !== '') {
        const query = encodeURIComponent(req.query.name.trim());
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${apiKey}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                const songs = data.items.map(item => {
                    const videoId = item.id.videoId;
                    const title = item.snippet.title;
                    const artist = item.snippet.channelTitle;
                    const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
                    const downloadUrl = `https://vivekfy.fanclub.rocks?url=https://www.youtube.com/watch?v=${videoId}`;
                    const developerName = "Vivek❤️Masona";

                    return {
                        title,
                        artist,
                        thumbnailUrl,
                        downloadUrl,
                        developerName
                    };
                });

                res.json(songs);
            } else {
                res.json({ error: 'Songs not found.' });
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
