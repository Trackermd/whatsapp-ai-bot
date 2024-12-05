const { Client } = require('whatsapp-web.js');

const client = new Client();

client.on('ready', () => {
    console.log('Bot is online!');
});

client.on('message', (msg) => {
    if (msg.body === 'ping') {
        msg.reply('pong');
    }
});

module.exports = client;￼Enter
