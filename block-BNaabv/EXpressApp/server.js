var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();

// Middlewares
app.use("/admin", (req, res, next) => {
    next('Unauthorized user')
})

app.use(logger('tiny'))
app.use(express.urlencoded({extended: false}));

app.use(express.json());

app.use(cookieParser());

app.use((req, res, next) => {
    res.cookie('count', 1)
    next();
})

// Routing Middleware

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('<h2>Welcome to Express</h2>')
});

app.get('/', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.send('My name is qwerty')
});

app.post('/form', (req, res) => {
    if(req.headers['content-type'] === 'application/x-www-form-urlencoded') {
        console.log(req.headers['content-type'])
        res.send(req.body);
    }
});

app.post('/json', (req, res) => {
    if(req.headers['content-type'] === 'application/json') {
        console.log(req.headers['content-type'])
        res.send(req.body);
    }
});

app.get('/users/:username', (req, res) => {
    var username = req.params.username;
    res.set('Content-Type', 'text/html')
    res.send(`<h2>${username}</h2>`)
})


// Error
// 404
app.use((req, res, next) => {
    res.send("Page Not Found")
});

app.use((err, req, res, next) => {
    res.status(500).send(err);
})


app.listen(3000, () => {
    console.log('server listening on port 3000')
});