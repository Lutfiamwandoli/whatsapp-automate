const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');

// Fungsi untuk mengirim sticker
const sendSticker = async (message, url) => {
    const media = await MessageMedia.fromUrl(url);
    await message.reply(media, { sendMediaAsSticker: true });
};

// Fungsi untuk handle sticker
const handleStickerCommands = async (message, client) => {
    const command = message.body.split(' ')[0]; // Ambil command

    if (command === '!sticker') {
        // Ganti dengan URL sticker yang diinginkan
        const stickerUrl = 'https://example.com/sticker.webp';
        await sendSticker(message, stickerUrl);
    } else if (command === '!qc') {
        const text = message.body.slice(4); // Mengambil teks setelah !qc
        const stickerUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}&size=150x150`;
        await sendSticker(message, stickerUrl);
    } else if (command === '!ttp') {
        const text = message.body.slice(5); // Mengambil teks setelah !ttp
        const stickerUrl = `https://api.text-to-image.com/convert?text=${encodeURIComponent(text)}&size=150x150`;
        await sendSticker(message, stickerUrl);
    } else if (command === '!attp') {
        const text = message.body.slice(6); // Mengambil teks setelah !attp
        const stickerUrl = `https://api.attp.com/convert?text=${encodeURIComponent(text)}`;
        await sendSticker(message, stickerUrl);
    } 
};

module.exports = { handleStickerCommands };
