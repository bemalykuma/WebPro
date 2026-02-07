// database.js
const mysql = require('mysql2');
const conn = mysql.createConnection({
    host: "webdev.it.kmitl.ac.th",
    user: "s67070148",
    password: "YCM31QRC52O", 
    database: "s67070148"
});

// open the MySQL connection
conn.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");
});

module.exports = conn;