const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sqlite3 = require('sqlite3').verbose();

app.set('view engine', 'ejs');

app.use(cookieParser());

let db = new sqlite3.Database('customers.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the customers database.');
});

let custs = {};
let counter = 1;

app.get('/', function (req, res) {
    if (counter == 1) {
        let sql = `SELECT * FROM customers ORDER BY RANDOM() LIMIT 1`;
    
        db.get(sql, (err, rows) => {
            if (err) {
                console.error(err.message);
            }
            console.log(rows);
            res.render('home', { customers: rows });
        });
    }else {
        if (Object.keys(custs).length === 0) {
            custs = {
                CustomerId: '',
                FirstName: '',
                LastName: '',
                Address: '',
                Email: '',
                Phone: ''
            };
        }
        else {
            console.log(custs);
        }
        res.render('home', { customers: custs });
    }
});

app.get('/set-cookie', (req, res) => {
    let { customerId, FirstName, LastName, Address, Email, Phone } = req.query;
    try {
        res.cookie('customerId', customerId, {
            maxAge: 1000 * 60 * 60, 
            httpOnly: true,         
            secure: false          
        });   
        res.cookie('FirstName', FirstName, {
            maxAge: 1000 * 60 * 60, 
            httpOnly: true,         
            secure: false          
        });   
        res.cookie('LastName', LastName, {
            maxAge: 1000 * 60 * 60, 
            httpOnly: true,         
            secure: false          
        });   
        res.cookie('Address', Address, {
            maxAge: 1000 * 60 * 60, 
            httpOnly: true,         
            secure: false          
        });   
        res.cookie('Email', Email, {
            maxAge: 1000 * 60 * 60, 
            httpOnly: true,         
            secure: false          
        });   
        res.cookie('Phone', Phone, {
            maxAge: 1000 * 60 * 60, 
            httpOnly: true,         
            secure: false          
        });   

        console.log('Cookies set successfully');
        custs = {};
        counter = 0;
        res.redirect('/');
        
    } catch (err) {
        console.error('Error setting cookie:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to read cookies
app.get('/show-data', (req, res) => {
    let { customerId, FirstName, LastName, Address, Email, Phone } = req.cookies;
    try { 
       custs = {
                CustomerId: customerId,
                FirstName: FirstName,
                LastName: LastName,
                Address: Address,
                Email: Email,
                Phone: Phone
            };
        counter = 0;
        res.redirect('/');
    } catch (err) {
        console.error('Error reading cookies:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/clear-data', (req, res) => {
    custs = {};
    res.clearCookie('customerId', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
    });
    res.clearCookie('FirstName', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
    });
    res.clearCookie('LastName', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
    });
    res.clearCookie('Address', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
    });
    res.clearCookie('Email', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
    });
    res.clearCookie('Phone', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
    });
    counter = 0;
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});