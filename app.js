const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-luke:ForksUp11@cluster0.x9qqa.mongodb.net/boeingDB", {useNewUrlParser: true});

const poiSchema = new mongoose.Schema({
    id: Number,
    name: {
        type: String,
        required: [true, "Description required"]
    },
    latlng: {
        type: [Number],
        requited: [true,"Coordinates required"]
    }
});

const Poi = mongoose.model("Poi", poiSchema);

var locations = [
    {
        id: '1',
        name: 'Hemmingson Center',
        latlng: [47.667100, -117.399600]
    },
    {
        id: '2',
        name: 'McCarthy Center',
        latlng: [47.665300, -117.399100]   
    },
    {
        id: '3',
        name: 'Zag Shop',
        latlng: [47.667700,	-117.397700]   
    },
    {
        id: '4',
        name: 'Foley Library',
        latlng: [47.666500, -117.400900]   
    },
    {
        id: '5',
        name: 'College Hall',
        latlng: [47.668100, -117.402500]   
    },
    {
        id: '6',
        name: 'Herak',
        latlng: [47.666600, -117.402200]   
    },
    {
        id: '7',
        name: 'Jepsen',
        latlng: [47.667200, -117.405000]   
    },
    {
        id: '8',
        name: 'Riverfront Pavilion',
        latlng: [47.662600, -117.419000]   
    },
    {
        id: '9',
        name: 'Numerica Skate Ribbon',
        latlng: [47.660700, -117.422500]   
    },
    {
        id: '10',
        name: 'Forza Coffee',
        latlng: [47.667100, -117.396200]   
    }
];

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
    Poi.find({}, function(err, foundPois) {
        if (foundPois.length === 0) {
            Poi.insertMany(locations, function(err) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("Successfully added default items");
                }
            });
            res.redirect("/live-maps");
        } 
        else {
            res.render("live-maps", {pois: JSON.stringify(foundPois)});
        }
    });
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

// Port is dynamically accessible by Heroku as well as (or) locally on port 3000
app.listen(process.env.PORT || 3000, function() {
    console.log('Successfully started server on port 3000!');
});