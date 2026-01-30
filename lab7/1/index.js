const express = require('express')
const app = express()
const port = 3000
const path = require('path');


app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/home.html'));
});

app.get('/pompom', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/pompom.html'));
});

app.get('/kuromi', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/kuromi.html'));
});

app.get('/cinnamoroll', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/cinnamoroll.html'));
});

app.get('/about', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/about.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
})
