const { 
    handleJob, 
    handleDownload, 
    handleSaldo 
} = require('../plugins/jobHandler');

const { 
    handleTagAll, 
    handleCategoryCommands 
} = require('../plugins/categoryHandler');

const { handleSaldoCommands } = require('../plugins/saldoHandler');
const { handlePengumuman } = require('../plugins/pengumumanHandler');
const { handleInfoCommands } = require('../plugins/infoHandler');
const { handleListCommands } = require('../plugins/listHandler');
const { handleGroupCommands } = require('../plugins/groupHandler'); 
const { handleStickerCommands } = require('../plugins/stickerHandler');
const { handleHelpCommand } = require('../plugins/helpHandler');

// Command handlers mapping
const commandHandlers = {
    '!ping': async (message) => await message.reply('Tes Bot aja bro!'),
    '!download': handleDownload,
    '!tag': handleTagAll,
    '!tagall': handleTagAll,
    '!saldo': handleSaldoCommands,
    '!tambahSaldo': handleSaldoCommands,
    '!resetSaldo': handleSaldoCommands,
    '!daftar': handleCategoryCommands,
    '!hapusKategori': handleCategoryCommands,
    '!keluarKategori': handleCategoryCommands,
    '!tambahKategori': handleCategoryCommands,
    '!listKategori': handleCategoryCommands,
    '!pengumuman': handlePengumuman,
    '!gc': handleGroupCommands,
    '!reminder': handleGroupCommands,
    '!revoke': handleGroupCommands,
    '!linkgc': handleGroupCommands,
    '!antilink': handleGroupCommands,
    '!hidetag': handleGroupCommands,
    '!banchat': handleGroupCommands,
    '!unbanchat': handleGroupCommands,
    '!opentime': handleGroupCommands,
    '!closetime': handleGroupCommands,
    '!totalpesan': handleGroupCommands,
    '!help': handleHelpCommand,
};

// List of commands for specific categories
const listCommands = [
    '!list', 
    '!addlist', 
    '!update',
    '!deletelist', 
    '!sider', 
    '!add', 
    '!kick'
];

const stickerCommands = [
    '!sticker', 
    '!qc', 
    '!ttp', 
    '!attp', 
    '!anticolong', 
    '!take'
];

// Function to handle messages
const onMessageReceived = async (message, client) => {
    try {
        // Handle job message format
        if (/^Job:\s*(.*)\nHunter:\s*(.*)\nWorker:\s*(.*)\nFee:\s*(\d+)\nstatus:\s*selesai/i.test(message.body)) {
            await handleJob(message);
            return;
        }

        // Check if the message starts with any command and handle it
        for (const [command, handler] of Object.entries(commandHandlers)) {
            if (message.body.startsWith(command)) {
                await handler(message, client);
                return;
            }
        }

        // Handle sticker commands
        if (stickerCommands.some(cmd => message.body.startsWith(cmd))) {
            await handleStickerCommands(message, client);
            return;
        }

        // Handle list commands
        if (listCommands.some(cmd => message.body.startsWith(cmd))) {
            await handleListCommands(message, client);
            return;
        }

        // Optionally, you can handle unrecognized commands here
        await message.reply('Perintah tidak dikenali. Ketik !help untuk daftar perintah.');

    } catch (error) {
        console.error('Error handling message:', error);
        await message.reply('Terjadi kesalahan saat memproses perintah. Silakan coba lagi.');
    }
};

module.exports = { onMessageReceived };