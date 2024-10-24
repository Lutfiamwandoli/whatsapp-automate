const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'lists.json');

// Memastikan file lists.json ada
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({ lists: [], members: [] }, null, 2));
}

const handleListCommands = async (message, client) => {
    const chat = await message.getChat();
    const command = message.body.split(' ')[0];

    switch (command) {
        case '!list':
            const lists = JSON.parse(fs.readFileSync(filePath)).lists;
            let listMessage = 'Daftar:\n';
            lists.forEach((item, index) => {
                listMessage += `${index + 1}. ${item}\n`;
            });
            message.reply(listMessage || 'Daftar kosong.');
            break;

        case '!addlist':
            const newItem = message.body.slice(9).trim(); // Mengambil item setelah '!addlist '
            if (newItem) {
                const data = JSON.parse(fs.readFileSync(filePath));
                data.lists.push(newItem);
                fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
                message.reply(`Item "${newItem}" telah ditambahkan ke daftar.`);
            } else {
                message.reply('Silakan berikan item yang ingin ditambahkan.');
            }
            break;

        case '!update':
            const updateIndex = parseInt(message.body.split(' ')[1]) - 1;
            const updateValue = message.body.slice(message.body.indexOf(' ', 7) + 1).trim(); // Mengambil nilai update
            const updateData = JSON.parse(fs.readFileSync(filePath));

            if (updateIndex >= 0 && updateIndex < updateData.lists.length && updateValue) {
                updateData.lists[updateIndex] = updateValue;
                fs.writeFileSync(filePath, JSON.stringify(updateData, null, 2));
                message.reply(`Item pada index ${updateIndex + 1} telah diperbarui menjadi "${updateValue}".`);
            } else {
                message.reply('Index tidak valid atau nilai tidak diberikan.');
            }
            break;

        case '!deletelist':
            const deleteIndex = parseInt(message.body.split(' ')[1]) - 1;
            const deleteData = JSON.parse(fs.readFileSync(filePath));

            if (deleteIndex >= 0 && deleteIndex < deleteData.lists.length) {
                const deletedItem = deleteData.lists.splice(deleteIndex, 1);
                fs.writeFileSync(filePath, JSON.stringify(deleteData, null, 2));
                message.reply(`Item "${deletedItem}" telah dihapus dari daftar.`);
            } else {
                message.reply('Index tidak valid. Silakan berikan index yang valid.');
            }
            break;

        case '!sider':
            const members = chat.participants.map(participant => participant.id._serialized);
            const memberMessage = `Anggota grup:\n${members.join('\n')}`;
            message.reply(memberMessage);
            break;

        case '!add':
            const numberToAdd = message.body.split(' ')[1];
            if (numberToAdd) {
                const data = JSON.parse(fs.readFileSync(filePath));
                if (!data.members.includes(numberToAdd)) {
                    data.members.push(numberToAdd);
                    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
                    message.reply(`Nomor ${numberToAdd} telah ditambahkan ke daftar anggota.`);
                } else {
                    message.reply(`Nomor ${numberToAdd} sudah ada dalam daftar anggota.`);
                }
            } else {
                message.reply('Silakan berikan nomor yang ingin ditambahkan.');
            }
            break;

        case '!kick':
            const tagToKick = message.body.split(' ')[1];
            const kickIndex = chat.participants.findIndex(participant => participant.id.user === tagToKick);

            if (kickIndex !== -1) {
                await chat.kick(chat.participants[kickIndex].id);
                message.reply(`Anggota dengan tag ${tagToKick} telah dikeluarkan dari grup.`);
            } else {
                message.reply('Anggota dengan tag tersebut tidak ditemukan.');
            }
            break;

        default:
            message.reply('Perintah tidak dikenali.');
    }
};

module.exports = { handleListCommands };
