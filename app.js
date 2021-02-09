const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

// CORS Headers to allow Cross Origin Request
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Typically dangerous using '*' (all)
    res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    res.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});


app.get('/', function(req, res) {
    var newDate = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    var dateFormatted = newDate.toLocaleDateString('en-us', options);

    res.render('home', {Today: dateFormatted});
});

app.get('/live-cams', function(req, res) {
    res.render('live-cams', {})
});

app.get('/live-maps', function(req, res) {
    res.render('live-maps', {})
});

app.get('/front-cam', function(req, res) {
    res.render('front-cam', {})
});

app.get('/front-cam-live', function(req, res) {
    res.render('front-cam-live', {});
});

app.get('/rear-cam', function(req, res) {
    res.render('rear-cam', {})
});

// app.post('/', function() {

// });

// Port is dynamically accessible by Heroku as well as (or) locally on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Successfully started server on port 3000!');
});