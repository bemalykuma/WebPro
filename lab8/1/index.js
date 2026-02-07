// index.js

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;


// เพิ่มใช้งานไฟล์
const conn = require('./database'); 

// Set EJS as templating engine
app.set('view engine', 'ejs');
// For parsing form data
app.use(express.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));

// routing 
app.get('/',  (req, res) => {
        const sql = `CREATE TABLE IF NOT EXISTS Users (
            id INT PRIMARY KEY,
            username VARCHAR(100),
            password VARCHAR(100),
            email VARCHAR(100),
            firstname VARCHAR(100),
            lastname VARCHAR(100),
            age INT,
            address VARCHAR(255),
            phone VARCHAR(15)
        )`;

        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created or already exists");
            tableCreated = true;
        });
        const sql1 = `INSERT IGNORE INTO Users (id, username, password, email, firstname, lastname, age, address, phone) VALUES 
        (1, 'it001', 'pwof001', 'bobby@gmail.com', 'Bobby', 'Tables', 30, '123 Main St', '091-392-3920'),
        (2, 'it002', 'pwof002', 'sally@gmail.com', 'Sally', 'Fields', 25, '456 Oak St', '092-483-2391'),
        (3, 'it003', 'pwof003', 'tommy@gmail.com', 'Tommy', 'Smith', 28, '789 Pine St', '096-584-3402'),
        (4, 'it004', 'pwof004', 'linda@gmail.com', 'Linda', 'Johnson', 32, '321 Elm St', '094-685-4513'),
        (5, 'it005', 'pwof005', 'jimmy@gmail.com', 'Jimmy', 'Brown', 29, '654 Maple St', '098-786-5624'),
        (6, 'it006', 'pwof006', 'nancy@gmail.com', 'Nancy', 'Davis', 27, '987 Cedar St', '064-887-6735'),
        (7, 'it007', 'pwof007', 'george@gmail.com', 'George', 'Wilson', 31, '159 Spruce St', '072-988-7846'),
        (8, 'it008', 'pwof008', 'susan@gmail.com', 'Susan', 'Taylor', 26, '753 Birch St', '063-089-8957'),
        (9, 'it009', 'pwof009', 'frank@gmail.com', 'Frank', 'Miller', 33, '852 Walnut St', '098-190-9068'),
        (10, 'it010', 'pwof010', 'kate@gmail.com', 'Kate', 'Wilson', 29, '147 Oak St', '096-291-0179'),
        (11, 'it011', 'pwof011', 'john@gmail.com', 'John', 'Doe', 35, '258 Cedar St', '063-392-1280'),
        (12, 'it012', 'pwof012', 'jane@gmail.com', 'Jane', 'Doe', 28, '369 Willow St', '075-493-2391'),
        (13, 'it013', 'pwof013', 'mike@gmail.com', 'Mike', 'Johnson', 40, '741 Pine St', '094-594-3402'),
        (14, 'it014', 'pwof014', 'linda@gmail.com', 'Linda', 'Johnson', 32, '321 Elm St', '094-685-4513'),
        (15, 'it016', 'pwof016', 'lala@gmail.com', 'Lala', 'Lalyly', 29, '456 wangchan St', '081-234-5678'),
        (16, 'it148', 'pwof148', 'bubu@gmail.com', 'Bubu', 'Babu', 20, '111 Payub St', '092-891-5221')`;
        conn.query(sql1, function (err, result) {
            if (err) throw err;
            console.log("Data inserted");
            dataInserted = true;
        });
    const sql2 = "SELECT * FROM Users";
    conn.query(sql2, function (err, results) {
        if (err) throw err;
        console.log(results);
        res.render('show', { data: results });
    });
});

app.listen(port, () => {
    console.log(`listening to port ${port}`);
}); 