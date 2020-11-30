var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
const { static } = require('express');

var app = express();

// Middlewares
app.use(logger("dev"));

app.use(cookieParser());

app.use('/about', (req, res, next) => {
    res.cookie('username', 'Vishakha');
    next();
})

// Routing
app.get('/', (req, res) => {
    res.send('Welcome')
});

app.get('/about', (req, res) => {
    res.send(req.cookies);
})

app.listen(4000, () => {
    console.log('server listening on port 4000')
});
