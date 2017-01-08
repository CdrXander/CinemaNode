var app = require('./../server.js')
var config 	= require ('./../config.js');

module.exports = {
	getShelfListForUser:getShelfListForUser,
	getAllShelves:getAllShelves,
	getShelvesForUser:getShelvesForUser,
	getShelvesForMovie:getShelvesForMovie,
}

function getShelfListForUser(req,res,next) {
	var db = app.get('db');
	db.get_shelf_list_for_user([req.session.currentUser.user_id],function(err,shelfList) {
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
	db.get_shelves_for_user([req.session.currentUser.user_id], function(err, shelves) {
		if(!err) {
			// console.log(shelves);
			var sortedShelves = [];
			var curShelfId = 0;
			var shelvesIndex = -1;

			//Loop through results. 
			if(shelves.length > 0) {
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
				//Mostly for new users, who have shelves but no films yet
				db.shelf.find({user_id: req.session.currentUser.user_id}, function(err, shelves) {
					for(var j = 0; j <  shelves.length; j++) {
						var newShelf = {
							shelf_id	: 	shelves[j].shelf_id,
							name		: 	shelves[j].name,
							summary		: 	shelves[j].summary,
							movies 	 	: 	[]
						};
						sortedShelves.push(newShelf);
					}
					res.status(200).send(sortedShelves);
				})
			}
			
		} else { 
			console.log(err);
			res.status(500).send(err);
		}
	})
}

function getShelvesForMovie(req,res,next) {
	var db = app.get('db');
	db.get_shelves_for_movie(
	[req.params.mid, req.session.currentUser.user_id],
	function(err, shelfList) {
		if(!err) {
			shelfArray = [];
			shelfList.forEach(function(shelf) {
				shelfArray.push(shelf.shelf_id);
			});
			db.get_shelf_list_for_user([req.session.currentUser.user_id], function(err, shelfNames) {
				var responseObj = {
					shelfList: shelfArray,
					shelfNames: shelfNames
				}
				res.status(200).send(responseObj);

			})
		} else {
			console.log('ShelfNode.getShelvesForMovie');
			console.log(err);
			res.send(500);
		}
	})
}