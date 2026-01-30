const express = require('express')
const app = express()
const port = 3000

const path = require('path');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/home.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/about.html'));
});

app.get('/hello', function(req, res){
  res.send("Hello World!, via GET");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
})

app.get('/form', function(req, res){
  res.sendFile(path.join(__dirname, '/public/form.html'));
});

// Route handling query parameters
app.post('/submitform', (req, res) => {
  // Access query parameters using req.query
  const { fname, lname } = req.body;
  res.send(`First name: ${fname}<br>Last name: ${lname}`);
});

// post - body
// get - query
