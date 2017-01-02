//Node modules import
var express 	= require('express');
var session		= require('express-session')
var bodyParser 	= require('body-parser');
var cors 		= require('cors');
var massive		= require('massive');

var config 		= require('./config.js');

var port = 3000;

//Initialize, Export, and Configure the app
var app = module.exports = express();
app.use(bodyParser.json());
var corsOptions = {	origin: 'http://localhost:' + port}
app.use(cors(corsOptions));
app.use(express.static(__dirname + '/public'));


//Local File imports  AFTER app initialization
var shelfNode = require('./node_controllers/shelfNode.js');
var movieNode = require('./node_controllers/movieNode.js');



//Connect to DB
var conn = massive.connectSync({
	connectionString:"postgres://postgres:" + config.pglogin + "@localhost/cinema_node"
});

app.set('db',conn);
var db = app.get('db');



//END POINTS

app.get('/shelves/all', shelfNode.getAllShelves);
app.get('/shelves/:uid', shelfNode.getShelvesForUser);
app.get('/shelves/list/:uid', shelfNode.getShelfListForUser);
app.post('/movies/addtoshelf', movieNode.addMovieToShelf);

app.listen(port, function() {
  console.log("Started server on port", port, (new Date()).toTimeString());
});