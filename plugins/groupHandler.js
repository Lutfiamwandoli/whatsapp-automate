const handleGroupCommands = async (message, client) => {
    const chat = await message.getChat();

    // Perintah untuk membuka dan menutup grup
    if (message.body.startsWith('!gc ')) {
        const command = message.body.split(' ')[1];
        if (command === 'open') {
            await chat.setParticipants(chat.participants.map(participant => participant.id._serialized)); // membuka grup untuk semua
            message.reply('Grup dibuka untuk semua orang.');
        } else if (command === 'close') {
            const adminIds = chat.participants.filter(participant => participant.isAdmin).map(admin => admin.id._serialized);
            await chat.setParticipants(adminIds); // hanya mengizinkan admin
            message.reply('Grup ditutup untuk semua orang kecuali admin.');
        } else {
            message.reply('Perintah tidak dikenali. Gunakan !gc <open/close>.');
        }
    } 
    // Perintah pengingat
    else if (message.body === '!reminder') {
        const reminderTime = new Date(Date.now() + 60000); // contoh 1 menit dari sekarang
        setTimeout(() => {
            message.reply('Ingat: Ini adalah pengingat!');
        }, 60000);
        message.reply('Pengingat telah diatur selama 1 menit.');
    } 
    // Perintah untuk membatalkan undangan
    else if (message.body === '!revoke') {
        const inviteLink = await chat.getInviteLink();
        await chat.revokeInvite();
        message.reply('Undangan grup telah dibatalkan. Link undangan yang baru: ' + await chat.getInviteLink());
    } 
    // Perintah untuk mendapatkan link undangan grup
    else if (message.body === '!linkgc') {
        const inviteLink = await chat.getInviteLink();
        message.reply(`Ini adalah link undangan grup: ${inviteLink}`);
    } 
    // Perintah anti-link
    else if (message.body === '!antilink') {
        chat.on('message', async (message) => {
            const linkRegex = /(https?:\/\/[^\s]+)/g;
            if (linkRegex.test(message.body)) {
                await message.reply('Link tidak diizinkan di grup ini.');
                await message.delete();
            }
        });
        message.reply('Fitur anti-link telah diaktifkan.');
    }
    // Fitur baru
    else if (message.body.startsWith('!hidetag ')) {
        const participants = chat.participants.map(participant => participant.id._serialized);
        const messageText = message.body.slice(10); // Mengambil pesan setelah '.hidetag '
        
        await chat.sendMessage(messageText, {
            mentions: participants
        });
        message.reply('Pesan telah dikirim tanpa tag!');
    } else if (message.body === '!banchat') {
        await chat.lock();
        message.reply('Chat telah dibanned, hanya admin yang bisa berbicara.');
    } else if (message.body === '!unbanchat') {
        await chat.unlock();
        message.reply('Chat telah dibuka, semua anggota dapat berbicara.');
    } else if (message.body === '!opentime') {
        const openTime = new Date().toLocaleString(); // Atur format waktu sesuai kebutuhan
        message.reply(`Chat dibuka pada: ${openTime}`);
    } else if (message.body === '!closetime') {
        const closeTime = new Date().toLocaleString(); // Atur format waktu sesuai kebutuhan
        message.reply(`Chat ditutup pada: ${closeTime}`);
    } else if (message.body === '!totalpesan') {
        const totalMessages = chat.messages.length; // Ambil jumlah pesan di chat
        message.reply(`Total pesan di grup ini: ${totalMessages}`);
    }
};

module.exports = { handleGroupCommands };
