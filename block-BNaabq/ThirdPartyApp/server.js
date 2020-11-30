var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();

// Middlewares
app.use(logger("dev"));

app.use(cookieParser());

app.use('/about', (req, res, next) => {
    res.cookie('username', 'Vishakha');
    next();
})

app.use((req, res, next) => {
    console.log(req.cookies);
    next();
});

// Routing Middlewares
app.get('/', (req, res) => {
    res.send('Welcome')
});


app.listen(4000, () => {
    console.log('server listening on port 4000')
});
