const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const axios = require('axios');
const ytdl = require('ytdl-core');
const googleIt = require('google-it');

const client = new Client();

// Menu Command
const menu = `
*Available Commands*:
1. /menu - Show this menu
2. /image [search_term] - Fetch an image based on the search term
3. /game - Play a number guessing game
4. /music [song_name] - Get music from YouTube
`;

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Bot is ready!');
});

// Listen for incoming messages
client.on('message', async (message) => {
    const { from, body } = message;

    // /menu command
    if (body === '/menu') {
        client.sendMessage(from, menu);
    }

    // /image [search_term] - Fetch an image from Google
    else if (body.startsWith('/image ')) {
        const searchTerm = body.slice(7);
        try {
            const results = await googleIt({ query: searchTerm, disableConsole: true });
            const firstResult = results[0].link;
            client.sendMessage(from, `Here's an image related to "${searchTerm}": ${firstResult}`);
        } catch (error) {
            client.sendMessage(from, 'Sorry, I couldn\'t find an image for that search.');
        }
    }

    // /game - A simple random number guessing game
    else if (body === '/game') {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        client.sendMessage(from, 'I\'m thinking of a number between 1 and 10. Try to guess it! (Type /guess [your_number])');
        
        // Listen for the user's guess
        client.on('message', (guessMessage) => {
            const guess = parseInt(guessMessage.body.split(' ')[1]);
            if (guess === randomNumber) {
                client.sendMessage(from, 'Congrats! You guessed the correct number!');
            } else {
                client.sendMessage(from, 'Sorry, that\'s not correct. Try again!');
            }
        });
    }

    // /music [song_name] - Fetch music from YouTube
    else if (body.startsWith('/music ')) {
        const songName = body.slice(7);
        try {
            const info = await ytdl.getInfo(`https://www.youtube.com/results?search_query=${songName}`);
            const video = info.videoDetails;
            const videoTitle = video.title;
            const videoURL = `https://www.youtube.com/watch?v=${video.videoId}`;
            client.sendMessage(from, `Here is a song I found: *${videoTitle}* - ${videoURL}`);
        } catch (error) {
            client.sendMessage(from, 'Sorry, I couldn\'t find music for that search.');
        }
    }
});

client.initialize();￼Enter
