var express = require('express');

var app = express();

// Middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '/public'))


// Routing Middlewares
app.get('/',(req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/new',(req, res) => {
    res.sendFile(__dirname + '/new.html')
})

app.post('/new', (req, res) => {
    res.send(req.body)
})

app.get('/users/:username', (req, res) => {
    var username = req.params.username;
    res.send(username)
})

app.listen(4000, () => {
    console.log('server listening on port 4000')
});