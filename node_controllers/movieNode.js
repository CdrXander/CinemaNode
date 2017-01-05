var app 	= require ('./../server.js');
var config 	= require ('./../config.js');

module.exports = {
	addMovieToShelf:addMovieToShelf,
	getMovieById:getMovieById
}


function addMovieToShelf(req,res,next) {
	var db = app.get('db');

	//Check if movie is already in database
	db.get_movie_by_imdbid([req.body.movie.imdbID], function(err,movie) {
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

function getMovieById(req,res,next) {
	var db = app.get('db');
	db.get_movie_by_imdbid([req.params.mid], function(err, movie) {
		if(!err) {
			if (movie.length > 0) {
				db.get_movie_metadata_by_id([config.testUserId,movie[0].movie_id], function(err, metadata) {
					if(!err) {
						movie[0].shelves = [];
						for(var i = 0; i < metadata.length; i++) {
							movie[0].shelves.push(metadata[i].shelf_id);
						}
						res.status(200).send(movie);
					} else {
						res.status(500).send(err);
					}
				})
			} else {
				res.status(200).send();
			}
		} else {
			res.status(500).send(err);
		}
	})
}




function addMovieToDatabase(movie) {
	var db = app.get('db');
	db.add_movie([movie.imdbID, movie.Title, movie.Poster, movie.Year], function(err,result) {
		if(!err) {
		}
	});
}