var express = require('express');

var app = express();

// Middleware
app.use('/admin', (req, res, next) => {
    next('Unautorized user')
})


// Routing middleware

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.get('/about', (req, res) => {
    res.send('About Page')
})

// error
app.use((req, res, next) => {
    res.send('Page Not Found');
});

app.use((err, req, res, next) => {
    res.send(err)
});



app.listen(4500, () => {
    console.log('server listening on ort 4500')
});