const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require('path');
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


// Connect to database
let db = new sqlite3.Database('phones.db', (err) => {
  if (err) {
    console.error('Error connecting to database:', err.message);
    } else {
    console.log('Connected to the phones database.');
  }
});
// Routes
app.get('/', (req, res) => {
    res.redirect('/products');
});

app.get('/products', (req, res) => {  
  db.all(`SELECT * FROM phones`, (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {      
      res.render('showproducts', { data : rows });
    }
  });
});

// add to cart route
app.get('/add-to-cart/:item', (req, res) => {
    const item = req.params.item;
    if (!req.session.cart) {
        req.session.cart = [];
    }
    // Add item to cart
    req.session.cart.push(item);
    console.log(`Item '${item}' added to cart...`);
    res.redirect('/products');
});

// View cart
app.get('/cart', (req, res) => {
    const cart = req.session.cart || [];
    console.log(`List in your cart: ${cart.join(', ')}`);

    db.serialize(() => {
        const query = `SELECT * FROM phones WHERE id in (${cart.join(', ')})`;
        console.log(`Executing query: ${query}`);

        db.all(query, (err, rows) => {

            if (err) {
                console.error(err.message);
            } else {
                res.render('showcart', { data: rows });
            }
        });
    });
});

// Clear cart
app.get('/clear-cart', (req, res) => {
    req.session.cart = [];
    res.send('Cart cleared!');
    res.redirect('/menu');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// const express = require('express');
// const session = require('express-session');

// const app = express();
// const PORT = 3000;

// app.use(session({
//     secret: 'your-secret-key', 
//     resave: false,             
//     saveUninitialized: true,   
//     cookie: { secure: false }  
// }));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// const user = {
//     username: 'john',
//     role: 'admin',
//     preferences: { theme: 'dark', language: 'en' }
// };

// app.get('/', function (req, res) {
//     res.send(`Welcome! Your session ID is ${req.sessionID} <br>
//         <ul>
//             <li><a href="/set-session">Set Session Variables</a></li>
//             <li><a href="/get-session">Get Session Variables</a></li>
//             <li><a href="/logout">Logout (Destroy Session)</a></li>
//         </ul>
//         `);
// });

// app.get('/set-session', (req, res) => {
//     req.session.username = user.username;
//     req.session.role = user.role;
//     req.session.preferences = user.preferences;

//     res.send('Session variables set successfully!');
// });

// app.get('/get-session', (req, res) => {
//     if (req.session.username) {
//         res.json({
//             username: req.session.username,
//             role: req.session.role,
//             preferences: req.session.preferences
//         });
//     } else {
//         res.send('No session variables found.');
//     }
// });

// app.get('/logout', (req, res) => {
//     req.session.destroy((err) => {
//         if (err) {
//             return res.status(500).send('Error destroying session.');
//         }
//         res.send('Session destroyed successfully!');
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });



// // Import required modules
// const express = require('express');
// const cookieParser = require('cookie-parser');

// const app = express();
// const PORT = 3000;


// app.use(cookieParser());

// app.get('/', function (req, res) {
//     res.send(`Welcome! <br>
//         <ul>
//             <li><a href="/set-cookie">Set Cookie</a></li>
//             <li><a href="/get-cookie">Get Cookie</a></li>
//             <li><a href="/clear-cookie">Clear Cookie</a></li>
//         </ul>
//         `);
// });

// // Route to set a cookie
// app.get('/set-cookie', (req, res) => {
//     try {
//         // Basic cookie
//         res.cookie('username', 'webdev-admin', {
//             maxAge: 1000 * 60 * 60, 
//             httpOnly: true,         
//             secure: false          
//         });   

//         res.send('Cookies have been set!');
//     } catch (err) {
//         console.error('Error setting cookie:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// // Route to read cookies
// app.get('/get-cookie', (req, res) => {
//     try { 
//         res.send('Hello ' + req.cookies.username );
//     } catch (err) {
//         console.error('Error reading cookies:', err);
//         res.status(500).send('Internal Server Error');
//     }
// });

// app.get('/clear-cookie', (req, res) => {
    
//     res.clearCookie('username', {
//         httpOnly: true,
//         secure: false,
//         sameSite: 'Strict'
//     });
//     res.send('Cookie has been cleared.');
// });

// // Start server
// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

