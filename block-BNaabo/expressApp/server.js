var express = require('express');

var app = express();

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// JSON data
app.use(express.json());

// Parse form data
app.use(express.urlencoded({extended: false}));

// Static data
app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/contact', (req, res) => {
    console.log(req.body);
})

app.listen(3000, () => {
    console.log('server listening on port 3000')
});