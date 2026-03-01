const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path');
const e = require("express");
const PORT = 3000;
const sqlite3 = require('sqlite3').verbose();
const app = express();

// Middleware setup
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key-for-your-store', 
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 10 * 60000 } 
}));

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    const endpoint = 'http://webdev.it.kmitl.ac.th:4000/restaurant';    
    fetch(endpoint)
        .then(response => response.json())
        .then(food => {
            res.render('home', { data: food });
        })
        .catch(error => {
            console.log(error);
        });
});

app.get('/add-to-cart/:item', (req, res) => {
    const item = req.params.item;
    const endpoint = `http://webdev.it.kmitl.ac.th:4000/detail/${item}`;
    fetch(endpoint)
    .then(response => response.json())
    .then(food => {
        if (!req.session.cart) {
            req.session.cart = [];
        }
        req.session.cart.push(food);
        console.log(food);
        res.redirect('/');
    })
    .catch(error => {
        console.log(error);
    });
});

// View cart
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    res.render('cart', { data: cart });
});

// Clear cart
app.get('/clear-cart', (req, res) => {
    req.session.cart = [];
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
