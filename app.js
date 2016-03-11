var express = require('express')
,   path    = require('path')
,   session = require('express-session')
,   bodyParser = require('body-parser')
,   cookieParser = require('cookie-parser')
,   passport    = require('passport')
,   mongoose = require('mongoose')
,   config  = require ('./config');

//create an instance of express 
var app = express();

//create an instance of the express router
var router = express.Router();

//setup static file serving
app.use(express.static(path.resolve(__dirname, 'public')));

//setup body-parser
app.use(bodyParser.json());

//set headers for our front end()
app.use(function(req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header("Access-Control-Allow-Origin", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Origin", 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

//setup mongoose
mongoose.connect('mongodb://' + config.MONGO_URL + ':' + config.MONGO_PORT + '/' + config.MONGO_DB, function(err) {
    if (err) { return err; }
    console.log("---MONGO DB---\nCONNECTED TO: %s\nON PORT: %s\nDB: %s", config.MONGO_URL, config.MONGO_PORT, config.MONGO_DB);
});

app.listen(config.PORT, function() {
    console.log('The app is up and running on port %s', config.PORT);
});

module.exports = app;