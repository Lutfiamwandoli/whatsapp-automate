const helpMenu = `
╭──────────✦ Fitur Bot WhatsApp ✦──────────╮
│
│ 🔹 *!ping*
│ 🔸 *!job*
│ 🔹 *!download*
│ 🔸 *!saldo*
│ 🔹 *!tambahSaldo*
│ 🔸 *!resetSaldo*
│ 🔹 *!tag [kategori]*
│ 🔸 *!daftar [kategori]*
│ 🔹 *!hapusKategori [kategori]*
│ 🔹 *!tambahKategori [kategori]*
│ 🔹 *!keluarKategori [kategori]*
│ 🔸 *!listKategori*
│ 🔹 *!pengumuman*
│ 🔸 *!sticker*
│ 🔸 *!gc*
│ 🔹 *!hidetag*
│ 🔹 *!list*
│ 🔸 *!addlist*
│ 🔹 *!update*
│ 🔹 *!deletelist*
│ 🔹 *!kickSean*
│ 
╰──────────────────────────────────────────╯
    > list orang yg sering galau
    1. sean
    2. dira
    3. dira
    4. sean
    5. jekay
`;

const handleHelpCommand = async (message) => {
    await message.reply(helpMenu);
};

module.exports = { handleHelpCommand };
