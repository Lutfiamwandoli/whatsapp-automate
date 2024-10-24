const db = require('../database'); // Import database

const onClientReady = async (client) => {
    console.log('Client sudah siap!');
    await loadCategories(); // Load categories dari database
};

const onClientAuthFailure = (msg) => {
    console.error('Autentikasi gagal:', msg);
};

// Fungsi untuk memuat kategori dari database
function loadCategories() {
    // Logika untuk memuat kategori dari database
    db.all(`SELECT name FROM categories`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return;
        }

        rows.forEach(row => {
            categories[row.name] = [];
        });

        db.all(`SELECT * FROM category_members`, [], (err, rows) => {
            if (err) {
                console.error(err);
                return;
            }

            rows.forEach(row => {
                if (categories[row.category]) {
                    categories[row.category].push(row.contactId);
                }
            });
        });
    });
}

module.exports = { onClientReady, onClientAuthFailure };
