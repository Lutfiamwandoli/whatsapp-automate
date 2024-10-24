const sqlite3 = require('sqlite3').verbose();

// Membuat koneksi ke database SQLite
const db = new sqlite3.Database('./whatsapp-bot.db', (err) => {
    if (err) {
        return console.error('Error connecting to the database:', err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Membuat tabel transaksi jika belum ada
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        job TEXT NOT NULL,
        hunter TEXT NOT NULL,
        worker TEXT NOT NULL,
        fee INTEGER NOT NULL,
        hunterFee INTEGER NOT NULL,
        workerFee INTEGER NOT NULL,
        adminFee INTEGER NOT NULL,
        status TEXT NOT NULL
    )`);

    // Membuat tabel kategori jika belum ada
    db.run(`CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL UNIQUE
    )`);

    // Membuat tabel anggota kategori jika belum ada
    db.run(`CREATE TABLE IF NOT EXISTS category_members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL,
        contactId TEXT NOT NULL,
        FOREIGN KEY (category) REFERENCES categories(name)
    )`);
});

// Export database connection untuk digunakan di file lain
module.exports = db;
