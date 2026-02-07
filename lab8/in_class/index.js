// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// เพิ่มใช้งานไฟล์
const conn = require('./database'); 


// static resourse & template engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');
// For parsing form data
app.use(express.urlencoded({ extended: true })); 


// routing 
app.get('/',  (req, res) => {
    res.send(`
        <a href="/create">Create Table</a>    
        <br>
        <a href="/insert">Insert Data</a>
        <br>
        <a href="/showdata">Show Data</a>
        <br>
        <a href="/form">Instructor Form</a>
    `);
});

app.get('/create',  (req, res) => {
    // Create table in MySQL database
    const sql = `CREATE TABLE instructors1 (
        id INT PRIMARY KEY,
        firstname VARCHAR(100),
        lastname VARCHAR(100),
        email VARCHAR(100),
        phone VARCHAR(15)
    )`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created or already exists");
        res.send("Table created or already exists");
    });
    // then, Insert data into the table    

});

app.get('/insert',  (req, res) => {
    const sql = `INSERT INTO instructors1 (id, firstname, lastname, email, phone) VALUES 
    (1, 'John', 'Doe', 'john.doe@example.com', '123-456-7890'),
    (2, 'Jane', 'Smith', 'jane.smith@example.com', '987-654-3210'),
    (3, 'Alice', 'Johnson', 'alice.johnson@example.com', '555-555-5555'),
    (4, 'Bob', 'Brown', 'bob.brown@example.com', '444-444-4444'),
    (5, 'Charlie', 'Davis', 'charlie.davis@example.com', '333-333-3333')`;

    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Data inserted successfully");
        res.send("Data inserted successfully");
    });
    // then, Insert data into the table    

});

app.get('/showdata',  (req, res) => {
    const sql = "SELECT * FROM instructors1";
    conn.query(sql, function (err, results) {
        if (err) throw err;
        console.log(results);
        res.render('show', { data: results });
    });
});

// FORM -----------------------------------------------------------------------

app.get('/form', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/form.html"));
});

app.get('/formget', (req, res) => {
    // read data from query string 
    const { id, firstname, lastname, email, phone } = req.query;

    const insertSql = "INSERT INTO instructors1 (id, firstname, lastname, email, phone) VALUES (?, ?, ?, ?, ?)";
    
    conn.query(insertSql,[id, firstname, lastname, email, phone], (err, result) =>{
        if (err) throw err;
        console.log("Data inserted");
        res.send("Data inserted");
    });
});

// -----------------------------------------------------------------------

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 