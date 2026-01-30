const express = require('express')
const app = express()
const port = 3000
const path = require('path');


app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/home.html'));
});

app.get('/padthai', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/padthai.html'));
});

app.get('/sushi', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/sushi.html'));
});

app.get('/beefburger', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/beefburger.html'));
});

app.get('/falafelwrap', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/falafelwrap.html'));
});
app.get('/chickenshawarma', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/chickenshawarma.html'));
});
app.get('/hummuspita', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/hummuspita.html'));
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}, press Ctrl-C to terminate....`)
})

