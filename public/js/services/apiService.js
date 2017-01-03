angular.module("cinemaNode").service("apiService", function($http, $q) {

	var port = 3000;
	var baseURL = "http://localhost:" + port;


	//GET shelves/movies for a user
	this.getUserMovies = () => {
		var deferred = $q.defer();
		var url = "http://localhost:" + port + "/shelves/";
		$http.get(url)
		.success(response => {
			deferred.resolve(response);
		})
		return deferred.promise;
	} 

	//GET list of shelf names for user
	this.getUserShelfList = () => {
		var deferred = $q.defer();
		var url = baseURL + "/shelves/list/";
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
		var url = baseURL + "/movies/addtoshelf/";
		$http.post(url,data)
		.success(response => {

		});
		return deferred.promise;
	}

	this.getMovieById = movie_id => {
		var deferred = $q.defer();
		var url = baseURL + "/movies/movie/" + movie_id;
		$http.get(url)
		.success(response => {
			if(!!response) {
				deferred.resolve(response);
			} else {
				deferred.resolve(null);
			}
		})
		return deferred.promise;
	}

})