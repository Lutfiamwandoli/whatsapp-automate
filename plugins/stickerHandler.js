const { MessageMedia } = require('whatsapp-web.js');
const fs = require('fs');
const path = require('path');

// Fungsi untuk mengirim stiker
async function sendSticker(client, chatId, stickerPath) {
    if (!fs.existsSync(stickerPath)) {
        console.error('Stiker tidak ditemukan:', stickerPath);
        return;
    }

    const media = MessageMedia.fromFilePath(stickerPath);
    await client.sendMessage(chatId, media, { sendMediaAsSticker: true });
}

// Fungsi untuk mengirim stiker acak dari folder
async function sendRandomSticker(client, chatId, folderPath) {
    const files = fs.readdirSync(folderPath).filter(file => file.endsWith('.webp'));
    
    if (files.length === 0) {
        console.error('Tidak ada stiker ditemukan di folder:', folderPath);
        return;
    }

    const randomFile = files[Math.floor(Math.random() * files.length)];
    const stickerPath = path.join(folderPath, randomFile);
    
    await sendSticker(client, chatId, stickerPath);
}

// Fungsi untuk mengirim pesan teks
async function sendText(client, chatId, text) {
    await client.sendMessage(chatId, text);
}



module.exports = { sendSticker, sendRandomSticker, sendText };