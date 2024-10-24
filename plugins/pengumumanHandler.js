const handlePengumuman = async (message, client) => {
    const chat = await message.getChat();
    
    if (chat.isGroup) {
        const announcement = message.body.slice(12); // Mengambil pesan setelah '!pengumuman '
        let mentions = chat.participants.map(participant => participant.id._serialized);

        // Membuat pesan pengumuman dengan notifikasi mention yang disembunyikan
        let hiddenTagMessage = `📢 Pengumuman: ${announcement}\n`;

        // Mengirim pesan pengumuman dengan mentions tetapi disembunyikan dari teks
        await chat.sendMessage(hiddenTagMessage, { 
            mentions,
            quotedMessageId: message.id._serialized // Mereply pesan pengumuman
        });

       
        message.reply('Command ini cuma bisa digunakan di grup bro.');
    }
};

module.exports = { handlePengumuman };
