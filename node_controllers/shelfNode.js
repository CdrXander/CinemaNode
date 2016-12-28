var app = require('./../server.js')

module.exports = {
	getShelfListForUser:getShelfListForUser,
	getAllShelves:getAllShelves,
	getShelvesForUser:getShelvesForUser
}

function getShelfListForUser(req,res,next) {
	var db = app.get('db');
	db.get_shelf_list_for_user([req.params.uid],function(err,shelfList) {
		if(!err) {
			res.status(200).send(shelfList);
		} else {
			console.log(err);
			res.status(500).send(err);
		}
	})
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
	//New tactic: Get ALL the data, and then build the object
	var db = app.get('db');
	db.get_shelves_for_user([req.params.uid], function(err, shelves) {
		if(!err) {
			var sortedShelves = [];
			var curShelfId = 0;
			var shelvesIndex = -1;

			//Loop through results. 
			for(var i = 0; i < shelves.length; i++) {
				//On each instance of a new shelf, create a new shelf subject, and a new movie object
				if(shelves[i].shelf_id != curShelfId) {
					curShelfId = shelves[i].shelf_id;
					var newShelf = {
						shelf_id	: 	shelves[i].shelf_id,
						name		: 	shelves[i].name,
						summary		: 	shelves[i].summary,
						movies 	 	: 	[]
					};
					shelvesIndex++;
					sortedShelves.push(newShelf);
				//For subsequent instances of existing shelves, create movie abjects, and add them to shelves
				} 
				var newMovie = {
					imdbID		: 	shelves[i].movie_id,
					Title		: 	shelves[i].title,
					Poster 		: 	shelves[i].poster_url,
					Year		: 	shelves[i].year,
					Rated		: 	shelves[i].rating
				};
				sortedShelves[shelvesIndex].movies.push(newMovie);
			}
			res.status(200).send(sortedShelves);
		} else { 
			console.log(err);
			res.status(500).send(err);
		}
	})
}