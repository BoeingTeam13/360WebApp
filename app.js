const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

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

app.get('/rear-cam', function(req, res) {
    res.render('rear-cam', {})
});

// app.post('/', function() {

// });

// Port is dynamically accessible by Heroku as well as (or) locally on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Successfully started server on port 3000!');
});