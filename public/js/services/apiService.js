angular.module("cinemaNode").service("apiService", function($http, $q) {

	var port = 3000;
	var baseURL = "http://localhost:" + port;



//AUTHENTICATION	=	=	=	=	=	=	=	=	=	=	=

//USERS =	=	=	=	=	=	=	=	=	=	=	=	=	=
	this.getCurrentUser = () => {
		var deferred = $q.defer();
		var url = baseURL + "/user/current";
		$http.get(url)
		.success(response => {
			deferred.resolve(response);
		})
		return deferred.promise;
	}

//SHELVES 	=	=	=	=	=	=	=	=	=	=	=	=	=

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

//MOVIES 	=	=	=	=	=	=	=	=	=	=	=	=	=

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


//REVIEWS 	=	=	=	=	=	=	=	=	=	=	=	=	=

	this.getReviewsForMovie = movie_id => {
		var deferred = $q.defer();
		var url = baseURL + "/review/movie/" + movie_id;
		$http.get(url).success(response => {
			deferred.resolve(response);
		});
		return deferred.promise;
	}

	this.getReviewForUser = movie_id => {
		var deferred = $q.defer();
		var url = baseURL + "/review/user/" + movie_id;
		$http.get(url).success(response => {
			deferred.resolve(response);
		});
		return deferred.promise;
	}

	this.saveReview = (movie_id, reviewText, userRating) => {
		var reviewData = {
			movie_id:movie_id,
			review_text:reviewText,
			user_rating:userRating
		}

		var deferred = $q.defer();
		var url = '${baseURL}/review/new';
		$http.post(url, reviewData).success(response => {
			if(response == "200") {
				deferred.resolve(true);
			} else {
				deferred.resolve(false);
			}
		})
		return deferred.promise;
	}

})