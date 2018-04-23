// SERVER-SIDE JAVASCRIPT

// var db          = require('./models');

/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////


//require express in our app
var express          = require('express'),
    bodyParser       = require('body-parser'),
    methodOverride   = require('method-override')

// generate a new express app and call it 'app'
var app              = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));


// set the view engine to ejs
app.set('view engine', 'ejs');


//Use this for any requests with _method
app.use(methodOverride("_method"));


// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('index');
});


// ===================================
//READ
// ===================================

// ===================================
//CREATE
// ===================================

// ===================================
//EDIT ROUTES
// ===================================

// ===================================
//UPDATE ROUTE
// ===================================

// ===================================
//DESTROY ROUTE
// ===================================



app.listen(3000, function(){
  console.log('3000 is the magic port');
});
