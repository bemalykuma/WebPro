const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// เพิ่มใช้งานไฟล์
const conn = require('./database');
const e = require('express');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/login.html"));
    
});

// FORM -----------------------------------------------------------------------
app.get('/formget', (req, res) => {
    // read data from query string 
    const { username, password, email, firstname, lastname, age, address, phone } = req.query;
    const sql = "SELECT * FROM Users WHERE username = ? or email = ?";
    conn.query(sql, [username, email], function (err, results) {
        if (err) {
            throw err;
        }
        if (results.length === 0) {
            return res.redirect('/notfound');
        }if (results[0].password !== password) {
            return res.redirect('/incorrectPasswd');}
        console.log("Login successful");
        res.render('show', { data: results });
    });
});

app.get('/notfound', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notfound.html"));
});
app.get('/incorrectPasswd', (req, res) => {
    res.sendFile(path.join(__dirname, "/public/incorrectPasswd.html"));
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 