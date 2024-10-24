const db = require('../database');
const xlsx = require('xlsx');
const fs = require('fs');
const { MessageMedia } = require('whatsapp-web.js');

let saldoAdmin = 0;

const handleJob = async (message) => {
    const jobRegex = /Job:\s*(.*)\nHunter:\s*(.*)\nWorker:\s*(.*)\nFee:\s*(\d+)\nstatus:\s*selesai/i;
    const matches = message.body.match(jobRegex);
    const job = matches[1].trim();
    const hunter = matches[2].trim();
    const worker = matches[3].trim();
    const fee = parseInt(matches[4].trim());

    const hunterFee = fee * 0.20;
    const workerFee = fee * 0.75;
    const adminFee = fee * 0.05;

    saldoAdmin += adminFee;

    db.run(`INSERT INTO transactions (job, hunter, worker, fee, hunterFee, workerFee, adminFee, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [job, hunter, worker, fee, hunterFee, workerFee, adminFee, 'Selesai'], (err) => {
        if (err) {
            console.error(err);
            message.reply('Gagal menyimpan transaksi ke database.');
            return;
        }
        message.reply(`Otw proses ya. Total fee: ${fee}\nHunter: ${hunterFee}\nWorker: ${workerFee}\nAdmin: ${adminFee}`);
        saveToExcel();
    });
};

const handleDownload = async (message, client) => {
    if (fs.existsSync('rekap_transaksi.xlsx')) {
        const media = MessageMedia.fromFilePath('rekap_transaksi.xlsx');
        await client.sendMessage(message.from, media, { caption: 'Nih file yang kamu minta bro!' });
    } else {
        message.reply('Belum ada file rekap transaksi bro.');
    }
};

// Fungsi untuk menyimpan data transaksi ke Excel
function saveToExcel() {
    db.all(`SELECT * FROM transactions`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(rows);
        xlsx.utils.book_append_sheet(wb, ws, 'Rekap Transaksi');

        xlsx.writeFile(wb, 'rekap_transaksi.xlsx');
    });
}

module.exports = { handleJob, handleDownload };
