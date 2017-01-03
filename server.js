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
var shelfNode = require('./node_controllers/shelfNode.js');
var movieNode = require('./node_controllers/movieNode.js');
var userNode  = require('./node_controllers/userNode.js');


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
	callbackURL: config.baseURL + config.port + "/auth/facebook/callback"
}, function(token, refreshToken, profile, done) {
	return done(null,profile);
}));

passport.serializeUser(function(user, done) {
  return done(null, user);
})

passport.deserializeUser(function(user, done) {
  return done(null, user);
})


//END POINTS

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get("/auth/facebook/callback", passport.authenticate("facebook"),userNode.loginUserFB);

app.get('/shelves/all', shelfNode.getAllShelves);
app.get('/shelves/', shelfNode.getShelvesForUser);
app.get('/shelves/list/', shelfNode.getShelfListForUser);
app.post('/movies/addtoshelf', movieNode.addMovieToShelf);
app.get('/movies/movie/:mid', movieNode.getMovieById);

app.listen(port, function() {
  console.log("Started server on port", port, (new Date()).toTimeString());
});