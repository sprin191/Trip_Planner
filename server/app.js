var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var passport = require('./strategies/userStrategy');
var session = require('express-session');

// Route includes
var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');
var trips = require('./routes/trips');
var selectedTrip = require('./routes/selectedTrip');
var cost = require('./routes/cost');
var grocery = require('./routes/grocery');
var meal = require('./routes/meal');
var itinerary1 = require('./routes/itinerary1');
var note = require('./routes/note');
var packing = require('./routes/packing');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Catch direct requests and make sure the user can view this page
// app.use('/views/user.html', user);

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: { maxage: 60000, secure: false }
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', register);
app.use('/user', user);
app.use('/trips', trips);
app.use('/selectedTrip', selectedTrip);
app.use('/cost', cost);
app.use('/grocery', grocery);
app.use('/meal', meal);
app.use('/itinerary1', itinerary1);
app.use('/note', note);
app.use('/packing', packing);
app.use('/*', index);

// Mongo Connection //
// mongoose.set('debug', true);/
// var mongoURI = "mongodb://okami118:h118s@ds017544.mlab.com:17544/trip_cruncher";
// var mongoDB = mongoose.connect(mongoURI).connection;
var databaseURI = '';
// process.env.MONGODB_URI will only be defined if you
// are running on Heroku
if(process.env.MONGODB_URI !== undefined) {
    // use the string value of the environment variable
    databaseURI = process.env.MONGODB_URI;
} else {
    // use the local database server
    databaseURI = 'mongodb://localhost:27017/trip_planner';
}

mongoose.connect(databaseURI);

/*mongoDB.on('error', function(err){
   if(err) {
     console.log("MONGO ERROR: ", err);
   }
   res.sendStatus(500);
});

mongoDB.once('open', function(){
   console.log("Connected to Mongo!");
});*/

// App Set //
app.set('port', (process.env.PORT || 5000));

// Listen //
app.listen(app.get("port"), function(){
   console.log("Listening on port: " + app.get("port"));
});
