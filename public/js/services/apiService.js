angular.module("cinemaNode").service("apiService", function($http, $q) {

	var port = 3000;



	//GET shelves/movies for a user
	this.getUserMovies = user_id => {
		var deferred = $q.defer();
		var url = "http://localhost:" + port + "/shelves/" + user_id;
		$http.get(url)
		.success(response => {
			deferred.resolve(response);
		})
		return deferred.promise;
	} 

	//GET list of shelf names for user
	this.getUserShelfList = user_id => {
		var deferred = $q.defer();
		var url = "http://localhost:" + port + "/shelves/list/" + user_id;
		$http.get(url)
		.success(response => {
			deferred.resolve(response);
		})
		return deferred.promise;
	}


	//CREATE record in shelf_movie (no need for user id, as is tied to shelf)
	this.addMovieToShelf = (movie, shelf_id) => {

		var data = {
			'movie':movie,
			'shelf_id':shelf_id
		};

		var deferred = $q.defer();
		var url = "http://localhost:" + port + "/movies/addtoshelf/";
		$http.post(url,data)
		.success(response => {

		});
		return deferred.promise;
	}

})