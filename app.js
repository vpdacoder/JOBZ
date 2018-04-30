// SERVER-SIDE JAVASCRIPT

var db                  = require('./models');

/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

//require express in our app
var express             = require('express'),
  bodyParser            = require('body-parser'),
  methodOverride        = require('method-override'),
  flash                 = require('connect-flash'),
  passport              = require('passport'),
  LocalStrategy         = require('passport-local'),
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

//Using flash
app.use(flash());



// ==============================
// PASSPORT AND SESSIONS CONFIG
// ==============================

app.use(require("express-session")({
  secret: "We gonna be alright",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

//lets us use User.authenticate property
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

//MIDDLEWARE to check login status
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error","You must register before you can do that!");
  res.redirect("/login");
}

//making current user variable available everywhere
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});


// *******************************
// ROUTES
// *******************************

// index/landing page
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
  db.User.register(new db.User(
    {username: req.body.username}), req.body.password, function(err, user) {
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
  successRedirect: "/collection",
  failureRedirect: "/login"
}), function(req, res) {

});


// ****LOGOUT****
app.get("/logout", function(req, res) {
  req.logout();
  req.flash("success","You logged out successfully");
  res.redirect("/");
});




// ===================================
//READ
// ===================================


// Showing all the applications of the current user
app.get('/collection', isLoggedIn,function(req, res) {
  let user = req.user;
  res.render('collections', {apps: user.applications});
});


// ===================================
//CREATE
// ===================================

//Rendering Application Form
app.get('/new', isLoggedIn, function(req, res) {
  console.log(req.user);
  res.render('./job/new');
});

//Saving the data from Application form to the applications array
app.post("/new", function(req, res) {
  db.User.findById(req.user.id, function(err, user) {
    if (err) {
      res.render(err);
    } else {
      var appModel = new db.App();
      appModel = req.body.job ;
      db.App.create(appModel);
      user.applications.unshift(appModel);
      user.save();
      res.redirect("/collection");
    }
  });
});

//Rendering the new Interview form
app.get('/new/int', isLoggedIn, function(req, res) {
  res.render('./interview/new');
});



// ===================================
//EDIT ROUTES
// ===================================
app.get("/application/:id/edit", isLoggedIn,function(req,res){
  db.User.findById(res.locals.currentUser._id, function(error, user){
    if(error){
      res.redirect("/collection");
    } else {
      let app = user.applications.id(req.params.id);
          res.render("./job/edit", {app:app});
    }
  });
});

// ===================================
//UPDATE ROUTE
// ===================================

app.put("/application/:id", function(req,res){
  var user = res.locals.currentUser
  var app = user.applications.id(req.params.id);
  app.remove();
  var appModel = new db.App();
  appModel = req.body.job ;
  db.App.create(appModel);
  user.applications.unshift(appModel);
  user.save(function(err){
    res.redirect("/collection");
  });
});


// ===================================
//DESTROY ROUTE
// ===================================

//Deleting an application
app.delete("/application/:id", function(req,res){
      db.User.findById(req.user.id, function(error, user){
        if(error){
          res.redirect("/collection");
        } else
        user.applications.id(req.params.id).remove();
        user.save(function(errorr){
          console.log(errorr);
          res.redirect("/collection");
        });
      });
  });


app.listen(process.env.PORT || 3000, function() {
  console.log('3000 is the magic port');
});
