var express = require('express');
var logger = require('morgan');
var fs = require('fs')

var app = express();

// Middleware
app.use(logger('dev'))
// custom logger
app.use((req, res, next) => {
    console.log(req.method, req.url, res.statusCode, (new Date()).getMinutes() + " ms")
    next();
});

// custom exress.json
app.use((req, res, next) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    })

    req.on('end', () => {
        if(req.method === "POST" && req.headers['content-type']=== "application/json") {
            res.body = JSON.parse(data);
            // console.log(res.body)
            res.end(JSON.stringify(res.body))
        }
    })
    next();
});

app.use((req, res, next) => {
    let data = '';
    req.on('data', (chunk) => {
        data += chunk;
    })

    req.on('end', () => {
        if(req.method === "POST" && req.headers['content-type']=== "application/x-www-form-urlencoded") {
            res.body = JSON.stringify(data);
            res.end(res.body)
        }
    })
    next();
});

// custom express.static
app.use((req, res, next) => {
    var publicPath = __dirname + "/public" + req.path;
    fs.readFile(publicPath, (err, content) => {
        if(err) return next();
        res.sendFile(publicPath)
    })
});

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Error 
app.use((req, res, next) => {
    res.send('Page Not Found')
})

// listener
app.listen(4000, () => {
    console.log('server listening on port 4000')
});