const helpMenu = `
╭──────────✦ Fitur Bot WhatsApp ✦──────────╮
│
│ 🔹 *!ping* - Test the bot
│ 🔸 *!job* 
│ 🔹 *!download* 
│ 🔸 *!saldo* 
│ 🔹 *!tambahSaldo* 
│ 🔸 *!resetSaldo* 
│ 🔹 *!tag [kategori]* 
│ 🔸 *!daftar [kategori]* 
│ 🔹 *!hapusKategori [kategori]* 
│ 🔸 *!tambahKategori [kategori]* 
│ 🔹 *!keluarKategori [kategori]* 
│ 🔸 *!listKategori* 
│ 🔹 *!pengumuman* 
│ 🔸 *!sticker* 
│ 🔹 *!gc* 
│ 🔸 *!hidetag* 
│ 🔹 *!banchat* 
│ 🔸 *!unbanchat* 
│ 🔹 *!opentime* 
│ 🔸 *!closetime* 
│ 🔹 *!totalpesan* 
│ 🔸 *!kick* 
│ 🔹 *!list* 
│ 🔸 *!addlist* 
│ 🔹 *!update* 
│ 🔸 *!deletelist* 
│ 
╰──────────────────────────────────────────╯
`;

const handleHelpCommand = async (message) => {
    await message.reply(helpMenu);
};

module.exports = { handleHelpCommand };