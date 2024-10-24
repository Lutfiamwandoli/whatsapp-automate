const db = require('../database');

let categories = {};

const handleTagAll = async (message, client) => {
    const chat = await message.getChat();
    if (chat.isGroup) {
        let mentions = chat.participants.map(participant => participant.id._serialized);
        let tagMessage = mentions.map(id => `@${id.split('@')[0]}`).join(' ');

        if (message.hasQuotedMsg) {
            const quotedMessage = await message.getQuotedMessage();
            await quotedMessage.reply(tagMessage, null, { mentions });
        } else {
            await chat.sendMessage(tagMessage, { mentions });
        }
    } else {
        message.reply('Command ini cuma bisa dipake di grup bro.');
    }
};

const handleCategoryCommands = async (message, client) => {
    if (message.body.startsWith('!tag ')) {
        // Implementasi untuk !tag [kategori]
    } else if (message.body.startsWith('!daftar ')) {
        // Implementasi untuk !daftar [kategori]
    } else if (message.body.startsWith('!hapusKategori ')) {
        // Implementasi untuk menghapus kategori
    } else if (message.body === '!listKategori') {
        // Implementasi untuk menampilkan list kategori
    }
};

module.exports = { handleTagAll, handleCategoryCommands };
