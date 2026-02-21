const express = require("express");
const path = require("path");
const port = 3000;
const sqlite3 = require('sqlite3').verbose();

// Creating the Express server
const app = express();

// Connect to SQLite database
let db = new sqlite3.Database('tasks.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});


// static resourse & templating engine
app.use(express.static('public'));
// Set EJS as templating engine
app.set('view engine', 'ejs');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    const endpoint = 'http://localhost:3000/api/tasks';
    fetch(endpoint)
        .then(response => response.json())
        .then(item => {
            res.render('home', { tasks: item });
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/api/tasks', (req, res) => {

    const query = 'SELECT * FROM tasks';
    db.all(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log(rows);
        res.send(JSON.stringify(rows));
    });
});

app.post('/api/tasks', (req, res) => {
    const { title, description, deadline } = req.body;
    const sql = `INSERT INTO tasks (title, description, deadline, status) VALUES (?, ?, ?, 0)`;
    db.run(sql, [title, description, deadline], (err) => {
        if (err) {
            console.log(err.message);
        }
        res.redirect('/');
    });
});

app.get('/check/:id', (req, res) => {
    const status = req.query.status;
    const query = `UPDATE tasks SET status = ${status} WHERE id = ${req.params.id}`;
    db.run(query, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
    });
});

app.get('/add', (req, res) => {
    res.render('form');
});

app.listen(port, () => {
    console.log(`Starting server at port ${port}`);
});

