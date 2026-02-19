const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('orders.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');


// routing path
app.get('/', function (req, res) {
    const query = 'SELECT * FROM orders';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        res.render('show', { data: rows });
    });
})

app.get('/changeStatus/:id', function (req, res) {
    const state = req.query.state;
    const id = req.params.id;

    const sql = `UPDATE orders SET status = ? WHERE id = ?;`
    db.run(sql,[state, id], (err) => {
        if (err) {
            console.log(err.message)
        }
        res.redirect('/')
    })
})

app.get('/getData', function (req, res) {
    const status = "กำลังดำเนินการ";
    const {name, product, address, phone } = req.query;
    
    let sql = `INSERT INTO orders (name, product, address, phone, status) VALUES ( ?, ?, ?, ?, ?)`;
    db.run(sql, [name, product, address, phone,status], (err) => {
        if (err) {
            return console.error('Error inserting data:', err.message);
        }
        console.log('Data inserted successful');        
    });
    res.redirect('/');
})

// Starting the server
app.listen(port, () => {
    console.log("Server started.");
});