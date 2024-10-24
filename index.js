const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { onClientReady, onClientAuthFailure } = require('./events/onClient');
const { onMessageReceived } = require('./events/onMessage');

// Menggunakan LocalAuth untuk menyimpan sesi secara otomatis
const client = new Client({
    authStrategy: new LocalAuth({
        clientId: "whatsapp-bot"
    })
});

// Event handler untuk client
client.on('ready', () => onClientReady(client));
client.on('qr', qr => qrcode.generate(qr, { small: true }));
client.on('authenticated', () => console.log('Autentikasi berhasil!'));
client.on('auth_failure', (msg) => onClientAuthFailure(msg));

// Event handler untuk pesan yang diterima
client.on('message_create', (message) => onMessageReceived(message, client));

// Mulai client
client.initialize();
