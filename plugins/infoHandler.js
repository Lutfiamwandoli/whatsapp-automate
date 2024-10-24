const os = require('os');
const { exec } = require('child_process');

// Fungsi untuk menghitung runtime bot
const getRuntime = () => {
    let uptime = os.uptime();
    let days = Math.floor(uptime / (60 * 60 * 24));
    let hours = Math.floor((uptime % (60 * 60 * 24)) / (60 * 60));
    let minutes = Math.floor((uptime % (60 * 60)) / 60);
    let seconds = uptime % 60;

    return `${days} hari, ${hours} jam, ${minutes} menit, ${Math.floor(seconds)} detik`;
};

const handleInfoCommands = async (message, client) => {
    if (message.body === '!tqto') {
        await message.reply('Terima Kasih Untuk: Semua yang sudah mendukung bot ini!');
    } else if (message.body === '!donate') {
        await message.reply('Silakan donasi ke: https://example.com/donate');
    } else if (message.body === '!sewa') {
        await message.reply('Untuk menyewa bot, silakan hubungi owner: https://wa.me/yourownerphonenumber');
    } else if (message.body === '!ping') {
        await message.reply('Pong! Bot sedang online.');
    } else if (message.body === '!speed') {
        const start = Date.now();
        await message.reply('Menghitung kecepatan...');
        const end = Date.now();
        const speed = end - start;
        await message.reply(`Kecepatan respon: ${speed}ms`);
    } else if (message.body === '!owner') {
        await message.reply('Owner bot ini adalah: https://wa.me/6282288471175');
    } else if (message.body === '!rules') {
        await message.reply('Aturan penggunaan bot: \n1. Jangan spam.\n2. Hormati sesama anggota grup.\n3. Gunakan dengan bijak.');
    } else if (message.body === '!runtime') {
        await message.reply(`Bot sudah berjalan selama: ${getRuntime()}`);
    }
};

module.exports = { handleInfoCommands };
