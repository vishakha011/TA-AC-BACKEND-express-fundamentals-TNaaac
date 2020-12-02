var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser')

var app = express();

// Middlewares
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'))

app.use(cookieParser());

app.use((req, res, next) => {
    var count = req.cookies.count;
    if(count) {
        res.cookie('count', Number(count) + 1)
    }
    else {
        res.cookie('count', 1)
    }
    console.log(count)
    next();
})

// Routing middlewares
app.get('/route', (req, res) => {
    res.send('Welcome')
});

app.get('/users', (req, res) => {
    res.send(req.cookies.count);
});

app.post('/json', (req, res) => {
    res.send(res.body);
});

app.get(['/', '/index.html'], (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.get('/speakers.html', (req, res) => {
    res.sendFile(__dirname + '/speakers.html')
});

app.get('/register.html', (req, res) => {
    res.sendFile(__dirname + '/register.html')
});

app.get('/schedule.html', (req, res) => {
    res.sendFile(__dirname + '/schedule.html')
});

app.get('/venue.html', (req, res) => {
    res.sendFile(__dirname + '/venue.html')
});

// Error
app.use((req, res, next) => {
    res.send('Page Not Found')
});

app.use((err, req, res, nexr) => {
    res.send("Error")
});

app.listen(4000, () => {
    console.log('server listening on port 4000')
})