const handleGroupCommands = async (message, client) => {
    const chat = await message.getChat();

    try {
        // Command to open and close the group
        if (message.body.startsWith('!gc ')) {
            const command = message.body.split(' ')[1];

            if (command === 'open') {
                // Open the group for all participants
                const participants = chat.participants.map(participant => participant.id._serialized);
                await chat.addParticipants(participants);
                message.reply('Grup dibuka untuk semua orang.');

            } else if (command === 'close') {
                // Close the group to only admins
                const nonAdminParticipants = chat.participants
                    .filter(participant => !participant.isAdmin)
                    .map(participant => participant.id._serialized);
                await chat.removeParticipants(nonAdminParticipants);
                message.reply('Grup ditutup untuk semua orang kecuali admin.');

            } else {
                message.reply('Perintah tidak dikenali. Gunakan !gc <open/close>.');
            }

        // Reminder command
        } else if (message.body === '!reminder') {
            setTimeout(() => {
                message.reply('Ingat: Ini adalah pengingat!');
            }, 60000); // 1 minute reminder
            message.reply('Pengingat telah diatur selama 1 menit.');

        // Revoke invite command
        } else if (message.body === '!revoke') {
            await chat.revokeInvite();
            const newInviteLink = await chat.getInviteLink();
            message.reply(`Undangan grup telah dibatalkan. Link undangan yang baru: ${newInviteLink}`);

        // Get invite link command
        } else if (message.body === '!linkgc') {
            const inviteLink = await chat.getInviteLink();
            message.reply(`Ini adalah link undangan grup: ${inviteLink}`);

        // Anti-link feature
        } else if (message.body === '!antilink') {
            chat.on('message', async (msg) => {
                const linkRegex = /(https?:\/\/[^\s]+)/g;
                if (linkRegex.test(msg.body)) {
                    await msg.reply('Link tidak diizinkan di grup ini.');
                    await msg.delete();
                }
            });
            message.reply('Fitur anti-link telah diaktifkan.');

        // Hide tag feature
        } else if (message.body.startsWith('!hidetag ')) {
            const messageText = message.body.slice(10); // Get the message after '!hidetag '
            const participants = chat.participants.map(participant => participant.id._serialized);
            await chat.sendMessage(messageText, { mentions: participants });

        // Ban chat command
        } else if (message.body === '!banchat') {
            await chat.lock();
            message.reply('Chat telah dibanned, hanya admin yang bisa berbicara.');

        // Unban chat command
        } else if (message.body === '!unbanchat') {
            await chat.unlock();
            message.reply('Chat telah dibuka, semua anggota dapat berbicara.');

        // Open time command
        } else if (message.body === '!opentime') {
            const openTime = new Date().toLocaleString();
            message.reply(`Chat dibuka pada: ${openTime}`);

        // Close time command
        } else if (message.body === '!closetime') {
            const closeTime = new Date().toLocaleString();
            message.reply(`Chat ditutup pada: ${closeTime}`);

        // Total messages command
        } else if (message.body === '!totalpesan') {
            const totalMessages = chat.messages.length; // Get total messages in chat
            message.reply(`Total pesan di grup ini: ${totalMessages}`);

        // Kick participant command
        } else if (message.body.startsWith('!kick ')) {
            const mentionedParticipants = message.mentionedIds; // Get mentioned participants

            // Check if a participant was mentioned
            if (mentionedParticipants.length === 0) {
                return message.reply('Silakan sebutkan pengguna yang ingin dikeluarkan dengan @username.');
            }

            // Check if the user is an admin
            const isAdmin = chat.participants.find(participant => participant.id._serialized === message.from && participant.isAdmin);
            if (!isAdmin) {
                return message.reply('Hanya admin yang dapat mengeluarkan anggota dari grup.');
            }

            // Remove the mentioned participants
            await chat.removeParticipants(mentionedParticipants);
            message.reply(`Pengguna telah dikeluarkan dari grup.`);

        } else {
            message.reply('Perintah tidak dikenali. Ketik !help untuk daftar perintah.');
 }

    } catch (error) {
        console.error('Error handling group command:', error);
        message.reply('Terjadi kesalahan saat memproses perintah. Silakan coba lagi.');
    }
};