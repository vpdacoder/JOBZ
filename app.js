// SERVER-SIDE JAVASCRIPT

var db = require('./models');

/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  passport = require('passport'),
  LocalStrategy = require('passport-local'),
  passportLocalMongoose = require('passport-local-mongoose')

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({
  extended: true
}));


// set the view engine to ejs
app.set('view engine', 'ejs');


//Use this for any requests with _method
app.use(methodOverride("_method"));

// ==============================
// PASSPORT AND SESSIONS CONFIG
// ==============================

app.use(require("express-session")({
  secret: "We gonna be alright",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//lets us use User.authenticate property
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());


// *******************************
// ROUTES
// *******************************

// index page
app.get('/', function(req, res) {
  res.render('index');
});

// ****SIGNUP****
//show sign-up form
app.get("/signup", function(req, res) {
  res.render('signup');
});

//handling user sign up
app.post("/signup", function(req, res) {
  console.log(req.user);
  db.User.register(new db.User({
    username: req.body.username
  }), req.body.password, function(err, user) {
    if (err) {
      console.log(err);
      return res.render("signup");
    }
    passport.authenticate("local")(req, res, function() {
      res.redirect("/new");
    });
  });
});


// ****LOGIN****
//show login form
app.get("/login", function(req, res) {
  res.render('login');
});

//handling login request
app.post("/login", passport.authenticate("local", {
  successRedirect: "/new",
  failureRedirect: "/login"
}), function(req, res) {

});

//middleware to check login status
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}


app.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});


//Application cards route
// app.get("/collection", function(req,res){
//   db.User.applications.find({}, function(err, apps){
//     if(err){
//       console.log('Error');
//     } else{
//       res.render('collections',{apps:apps});
//     }
//   });
// });

app.get('/collection', isLoggedIn,function(req, res) {
    let user = req.user;
    res.render('collections', {apps: user.applications});
});


app.get('/new/int', function(req, res) {
  res.render('./interview/new');
});
// ===================================
//READ
// ===================================

// ===================================
//CREATE
// ===================================

//Rendering Application Form
app.get('/new', isLoggedIn, function(req, res) {
  console.log(req.user);
  res.render('./job/new');
});


// Creating New Application Card from the form
// app.post("/new",function(req,res){
//   db.App.create(req.body.job, function(err, newJob){
//     if(err){
//       res.render(err);
//     }else {
//       res.redirect("/collection");
//     }
//   });
// })

// app.post("/new",function(req,res){
//   db.App.create(req.body.job, function(err, newJob){
//     if(err){
//       res.render(err);
//     }else {
//       res.redirect("/collection");
//     }
//   });
// })

// app.post("/new", function(req, res) {
//   db.User.findById(req.user.id, function(err, user) {
//     if (err) {
//       res.render(err);
//     } else {
//       var appModel = new db.App();
//       appModel = req.body.job ;
//       user.applications.push(appModel);
//       user.save();
//       res.redirect("/");
//     }
//   });
// });


app.post("/new", function(req, res) {
  db.User.findById(req.user.id, function(err, user) {
    if (err) {
      res.render(err);
    } else {
      var appModel = new db.App();
      appModel = req.body.job ;
      user.applications.push(appModel);
      user.save();
      res.redirect("/collection");
    }
  });
});

// ===================================
//EDIT ROUTE
// ===================================

// ===================================
//UPDATE ROUTE
// ===================================

// ===================================
//DESTROY ROUTE
// ===================================



app.listen(3000, function() {
  console.log('3000 is the magic port');
});
