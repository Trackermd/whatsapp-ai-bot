require('dotenv').config(); // Load environment variables
const { Client } = require('whatsapp-web.js'); // WhatsApp API
const client = new Client();

client.on('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', (message) => {
    console.log(message.body); // Log incoming messages
});

client.initialize();￼Enter
