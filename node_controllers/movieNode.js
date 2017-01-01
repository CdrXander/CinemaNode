var app = require ('./../server.js');

module.exports = {
	addMovieToShelf:addMovieToShelf
}


function addMovieToShelf(req,res,next) {
	var db = app.get('db');

	console.log(req.body);	
	//Check if movie is already in database
	db.get_movie([req.body.movie.movie_id], function(err,movie) {
		if(!err) {
			if(movie.length < 1) {
				addMovieToDatabase(req.body.movie);
			}
			db.add_movie_to_shelf([req.body.shelf_id,req.body.movie.imdbID, new Date()], function (err, shelf_movie) {
				if(!err) {
					res.status(204).send();
				} else {
					res.status(500).send(err);
				}
			})
		} else {
			res.status(500).send(err);
		}
	})
}


function addMovieToDatabase(movie) {
	var db = app.get('db');
	db.add_movie([movie.imdbID, movie.Title, movie.Poster, movie.Year], function(err,result) {
		if(!err) {
			console.log('MOVIE SAVED');
		}
	});
}