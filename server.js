//Node modules import
var express 	= require('express');
var session		= require('express-session')
var bodyParser 	= require('body-parser');
var cors 		= require('cors');
var massive		= require('massive');
var passport 	= require('passport');
var fbStrategy	= require('passport-facebook');

var config 		= require('./config.js');

var port = 3000;

//Initialize, Export, and Configure the app
var app = module.exports = express();
app.use(bodyParser.json());
var corsOptions = {	origin: config.baseURL + config.port}
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));


//Local File modules  AFTER app initialization
//This is because the nodes require the database to be initilaized first
var shelfNode 	= require('./node_controllers/shelfNode.js');
var movieNode 	= require('./node_controllers/movieNode.js');
var userNode  	= require('./node_controllers/userNode.js');
var reviewNode 	= require('./node_controllers/reviewNode.js');


//Connect to DB
var conn = massive.connectSync({
	connectionString:"postgres://postgres:" + config.pglogin + "@localhost/cinema_node"
});

app.set('db',conn);
var db = app.get('db');


//Initialize Passport Security, Facebook Strategy, and login urls
app.use(session({secret: config.sessionSecret}));
app.use(passport.initialize());
app.use(passport.session());


passport.use('facebook', new fbStrategy({
	clientID:config.facebook.appID,
	clientSecret:config.facebook.appSecret,
	callbackURL: "/auth/facebook/callback",
	profileFields: ['id', 'displayName', 'photos']
}, function(token, refreshToken, profile, done) {
	return done(null,profile);
}));

passport.serializeUser(function(user, done) {
  return done(null, user);
})

passport.deserializeUser(function(user, done) {
  return done(null, user);
})


//CUSTOM MIDDLEWARE
var authcheck = function(req,res,next) {
	if(!req.isAuthenticated()) {
		res.status(401).send(401);
	} else {
		next();
	}
}


//END POINTS

//Authentication/Account Creation
app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback", passport.authenticate("facebook"),userNode.loginUserFB);
app.get("/auth/logout", function(req,res,next) {
	req.logout();
	req.session.currentUser = null;
	res.redirect('/');
})
app.get('/loggedin', function (req, res) {
	res.send(req.isAuthenticated() ? req.session.currentUser : '0');
})


app.post("/api/auth/local/create", userNode.createUser);
app.post("/api/auth/local/login", userNode.loginUser);


//Users
app.get('/user/current', userNode.getCurrentUser);

//Shelves
app.get('/shelves/all', authcheck, shelfNode.getAllShelves);
app.get('/shelves/',authcheck, shelfNode.getShelvesForUser);
app.get('/shelves/list/',authcheck, shelfNode.getShelfListForUser);
app.get('/shelves/movie/:mid', shelfNode.getShelvesForMovie)

//Movies
app.post('/movies/addtoshelf',authcheck, movieNode.addMovieToShelf);
app.get('/movies/movie/:mid',authcheck, movieNode.getMovieById);
app.delete('/movies/shelfmovie/:sid/:mid', movieNode.removeMovieFromShelf)

//Reviews
app.get('/review/movie/:mid', reviewNode.getReviewsForMovie);
app.get('/review/user/:mid', authcheck, reviewNode.getReviewForUser);
app.post('/review/new', authcheck, reviewNode.saveReview);


app.listen(port, function() {
  console.log("Started server on port", port, (new Date()).toTimeString());
});