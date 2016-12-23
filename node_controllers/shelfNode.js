var app = require('./../server.js')

module.exports = {
	getAllShelves:getAllShelves,
	getShelvesForUser:getShelvesForUser
}

function getAllShelves(req,res,next) {
	var db = app.get('db');
	db.get_all_shelves(function(err,shelves) {
		if(!err) {
			res.status(200).send(shelves);
		} else {
			console.log(err);
		}
	})
}

function getShelvesForUser(req,res,next) {
	var db = app.get('db');
	db.get_shelves_by_user([req.params.uid], function(err,shelves) {
		if(!err) {
			for (shelf of shelves) {
				db.get_movies_for_shelf(shelf.shelf_id, function(err,movies) {
					if(!err) {
						console.log("Shelf ID:" + shelf.shelf_id)
						shelf.movies = movies;
					} else {
						console.log(err);
					}
				})
			}
			console.log(shelves);
			res.status(200).send(shelves);
		} else {
			console.log(err);
		}
	})
}
