'use strict';

/*
*
*	Core Angular routing app
*	Author: Xander Hacking
*
*/
angular.module('cinemaNode', ['ui.router']).config(function ($stateProvider, $urlRouterProvider) {

	var authCheck = function authCheck($q, $timeout, $http, $state, $rootScope) {
		var deferred = $q.defer();
		$http.get('/loggedin').success(function (user) {
			if (user !== '0') {
				deferred.resolve();
			} else {
				deferred.reject();
				$state.go('login');
			}
		});
		return deferred.promise;
	};

	$stateProvider.state('home', {
		url: '/home',
		templateUrl: './views/home.html',
		controller: 'homeCtrl',
		resolve: {
			loggedin: authCheck
		}
	}).state('shelves', {
		url: '/shelves',
		templateUrl: './views/shelves.html',
		controller: 'shelvesCtrl',
		resolve: {
			loggedin: authCheck
		}

	}).state('search', {
		url: '/search',
		templateUrl: './views/search.html',
		controller: 'searchCtrl',
		resolve: {
			loggedin: authCheck
		}
	}).state('details', {
		url: '/details/:id',
		templateUrl: './views/detail.html',
		controller: 'detailCtrl',
		resolve: {
			loggedin: authCheck
		}
	}).state('login', {
		url: '/login',
		templateUrl: './views/login.html'
	});

	$urlRouterProvider.otherwise('/shelves');
}).run();
'use strict';

angular.module('cinemaNode').controller('coverCtrl', function ($scope, apiService) {

	apiService.getUserShelfList().then(function (shelfList) {
		$scope.shelfList = shelfList;
	});

	$scope.addMovieToShelf = function (movie, shelf_id) {
		apiService.addMovieToShelf(movie, shelf_id).then(function (response) {
			console.log("movie saved");
		});
	};
});
'use strict';

angular.module('cinemaNode').controller('detailCtrl', function ($scope, $stateParams, omdbService, apiService) {

	var fullMovie = {};

	omdbService.getMovieDetails($stateParams.id).then(function (omdbData) {
		fullMovie = omdbData;
		apiService.getMovieById($stateParams.id).then(function (CNData) {
			if (!!CNData) {
				fullMovie.shelves = CNData.shelves;
			}
			$scope.movie = fullMovie;
		});
	});

	apiService.getReviewForUser($stateParams.id).then(function (review) {
		$scope.userReview = review[0].review_text;
	});

	apiService.getReviewsForMovie($stateParams.id).then(function (reviews) {
		$scope.reviews = reviews;
	});

	//These functions make the add to dialog work
	function getUpdatedData() {
		apiService.getShelvesForMovie($stateParams.id).then(function (response) {
			$scope.movieShelfList = response.shelfList;
			$scope.shelfNames = response.shelfNames;
		});
	}

	getUpdatedData();

	$scope.showShelfList = function () {
		$scope.isVisible = !!!$scope.isVisible;
	};

	$scope.saveReview = function () {
		apiService.saveReview($scope.movie.imdbID, $scope.userReview, 5).then(function (response) {
			$scope.reviewSaved = response;
		});
	};

	$scope.isSelected = function (shelf_id) {
		return $scope.movieShelfList.indexOf(shelf_id) >= 0;
	};

	$scope.updateMovieShelf = function (shelf_id) {

		if ($scope.movieShelfList.indexOf(shelf_id) >= 0) {
			apiService.deleteShelfMovie($scope.movie.imdbID, shelf_id).then(function (response) {
				getUpdatedData();
			});
		} else {
			apiService.addMovieToShelf($scope.movie, shelf_id).then(function (response) {
				getUpdatedData();
			});
		}
	};
});
'use strict';

angular.module('cinemaNode').controller('homeCtrl', function ($scope) {

	$scope.pageNotWorking = "Home Page is Working!";
});
'use strict';

angular.module('cinemaNode').controller('mainCtrl', function ($scope, apiService) {

	$scope.pageNotWorking = "Main Controller Working";

	apiService.getCurrentUser().then(function (currentUser) {
		if (!!currentUser) {
			$scope.currentUser = currentUser;
		} else {
			$scope.currentUser = false;
		}
	});
});
'use strict';

angular.module('cinemaNode').controller('searchCtrl', function ($scope, omdbService, apiService) {

	var user_id = 1;

	$scope.searchForMovies = function () {
		omdbService.searchForMovies($scope.searchTitle).then(function (serviceData) {
			$scope.movies = serviceData;
			console.log($scope.movies);
			$scope.searchTitle = '';
		});
	};
});
'use strict';

angular.module('cinemaNode').controller('shelvesCtrl', function ($scope, apiService) {

	$scope.initialLoad = function () {
		apiService.getUserMovies().then(function (serviceData) {
			$scope.shelves = serviceData;
			$scope.currentShelf = $scope.shelves[0];
		});
	};

	$scope.loadMovieData = function () {
		apiService.getUserMovies().then(function (serviceData) {
			$scope.shelves = serviceData;
		});
	};

	$scope.updateShelf = function (shelfIndex) {
		$scope.currentShelf = $scope.shelves[shelfIndex];
	};

	$scope.initialLoad();
});
"use strict";

angular.module("cinemaNode").service("apiService", function ($http, $q) {

	//AUTHENTICATION	=	=	=	=	=	=	=	=	=	=	=

	//USERS =	=	=	=	=	=	=	=	=	=	=	=	=	=
	this.getCurrentUser = function () {
		var deferred = $q.defer();
		var url = "/user/current";
		$http.get(url).success(function (response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	};

	//SHELVES 	=	=	=	=	=	=	=	=	=	=	=	=	=

	//GET shelves/movies for a user
	this.getUserMovies = function () {
		var deferred = $q.defer();
		var url = "/shelves/";
		$http.get(url).success(function (response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	};

	//GET list of shelf names for user
	this.getUserShelfList = function () {
		var deferred = $q.defer();
		var url = "/shelves/list/";
		$http.get(url).success(function (response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	};

	//GET shelf list for a movie/user combo
	this.getShelvesForMovie = function (movie_id) {
		var deferred = $q.defer();
		var url = "/shelves/movie/" + movie_id;
		$http.get(url).success(function (response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	};

	//MOVIES 	=	=	=	=	=	=	=	=	=	=	=	=	=

	//CREATE record in shelf_movie (no need for user id, as is tied to shelf)
	this.addMovieToShelf = function (movie, shelf_id) {

		var data = {
			'movie': movie,
			'shelf_id': shelf_id
		};

		var deferred = $q.defer();
		var url = "/movies/addtoshelf/";
		$http.post(url, data).success(function (response) {
			deferred.resolve();
		});
		return deferred.promise;
	};

	this.deleteShelfMovie = function (movie_id, shelf_id) {
		var deferred = $q.defer();
		var url = "/movies/shelfmovie/" + shelf_id + "/" + movie_id;
		$http.delete(url).success(function (response) {
			deferred.resolve();
		});
		return deferred.promise;
	};

	this.getMovieById = function (movie_id) {
		var deferred = $q.defer();
		var url = "/movies/movie/" + movie_id;
		$http.get(url).success(function (response) {
			if (!!response) {
				deferred.resolve(response);
			} else {
				deferred.resolve(null);
			}
		});
		return deferred.promise;
	};

	//REVIEWS 	=	=	=	=	=	=	=	=	=	=	=	=	=

	this.getReviewsForMovie = function (movie_id) {
		var deferred = $q.defer();
		var url = "/review/movie/" + movie_id;
		$http.get(url).success(function (response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	};

	this.getReviewForUser = function (movie_id) {
		var deferred = $q.defer();
		var url = "/review/user/" + movie_id;
		$http.get(url).success(function (response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	};

	this.saveReview = function (movie_id, reviewText, userRating) {
		var reviewData = {
			movie_id: movie_id,
			review_text: reviewText,
			user_rating: userRating
		};

		var deferred = $q.defer();
		var url = '/review/new';
		$http.post(url, reviewData).success(function (response) {
			if (response == "200") {
				deferred.resolve(true);
			} else {
				deferred.resolve(false);
			}
		});
		return deferred.promise;
	};
});
'use strict';

angular.module('cinemaNode').service('dummyDataService', function () {

	var userMovies = [{
		imdbID: 'tt0372784',
		Title: 'Batman Begins',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNTM3OTc0MzM2OV5BMl5BanBnXkFtZTYwNzUwMTI3._V1_SX300.jpg',
		Year: '2005',
		own: true,
		watch: false,
		seen: true
	}, {
		imdbID: 'tt0468569',
		Title: 'The Dark Knight',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
		Year: '2008',
		own: true,
		watch: false,
		seen: true
	}, {
		imdbID: 'tt1345836',
		Title: 'The Dark Knight Rises',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_SX300.jpg',
		Year: '2012',
		own: true,
		watch: false,
		seen: true
	}, {
		imdbID: 'tt2313197',
		Title: 'Batman: The Dark Knight Returns, Part 1',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMzIxMDkxNDM2M15BMl5BanBnXkFtZTcwMDA5ODY1OQ@@._V1_SX300.jpg',
		Year: '2012',
		own: false,
		watch: true,
		seen: true
	}, {
		imdbID: 'tt2166834',
		Title: 'Batman: The Dark Knight Returns, Part 2',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ1Mjk1NTY2NV5BMl5BanBnXkFtZTgwMTA2MDEwNzE@._V1_SX300.jpg',
		Year: '2013',
		own: false,
		watch: true,
		seen: true
	}, {
		imdbID: 'tt0107290',
		Title: 'Jurassic Park',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjM2MDgxMDg0Nl5BMl5BanBnXkFtZTgwNTM2OTM5NDE@._V1_SX300.jpg',
		Year: '1993',
		own: true,
		watch: false,
		seen: true
	}, {
		imdbID: 'tt0119567',
		Title: 'The Lost World: Jurassic Park',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMDFlMmM4Y2QtNDg1ZS00MWVlLTlmODgtZDdhYjY5YjdhN2M0XkEyXkFqcGdeQXVyNTI4MjkwNjA@._V1_SX300.jpg',
		Year: '1997',
		own: false,
		watch: true,
		seen: true
	}, {
		imdbID: 'tt0163025',
		Title: 'Jurassic Park III',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BZTU1ZWU4ZjUtZDMwYS00MmU4LWI3Y2UtZWVjMWIzODMyOWQ4XkEyXkFqcGdeQXVyNTM2NTY4NzU@._V1_SX300.jpg',
		Year: '2001',
		own: false,
		watch: true,
		seen: true
	}, {
		imdbID: 'tt0369610',
		Title: 'Jurassic World',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQ5MTE0MTk3Nl5BMl5BanBnXkFtZTgwMjczMzk2NTE@._V1_SX300.jpg',
		Year: '2015',
		own: false,
		watch: true,
		seen: true
	}, {
		imdbID: 'tt0080684',
		Title: 'Star Wars: Episode V - The Empire Strikes Back',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BYmViY2M2MTYtY2MzOS00YjQ1LWIzYmEtOTBiNjhlMGM0NjZjXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
		Year: '1980',
		own: true,
		watch: true,
		seen: true
	}, {
		imdbID: 'tt0086190',
		Title: 'Star Wars: Episode VI - Return of the Jedi',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BODllZjg2YjUtNWEzNy00ZGY2LTgyZmQtYTkxNDYyOWM3OTUyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		Year: '1983',
		own: true,
		watch: true,
		seen: true
	}, {
		imdbID: 'tt0076759',
		Title: 'Star Wars: Episode IV - A New Hope',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BZGEzZTExMDEtNjg4OC00NjQxLTk5NTUtNjRkNjA3MmYwZjg1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
		Year: '1977',
		own: true,
		watch: true,
		seen: true
	}, {
		imdbID: 'tt2488496',
		Title: 'Star Wars: The Force Awakens',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BOTAzODEzNDAzMl5BMl5BanBnXkFtZTgwMDU1MTgzNzE@._V1_SX300.jpg',
		Year: '2015',
		own: false,
		watch: true,
		seen: true
	}, {
		imdbID: 'tt0120915',
		Title: 'Star Wars: Episode I - The Phantom Menace',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BM2FmZGIwMzAtZTBkMS00M2JiLTk2MDctM2FlNTQ2OWYwZDZkXkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
		Year: '1999',
		own: true,
		watch: false,
		seen: true
	}, {
		imdbID: 'tt0121766',
		Title: 'Star Wars: Episode III - Revenge of the Sith',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg',
		Year: '2005',
		own: true,
		watch: false,
		seen: true
	}, {
		imdbID: 'tt0121765',
		Title: 'Star Wars: Episode II - Attack of the Clones',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNDRkYzA4OGYtOTBjYy00YzFiLThhYmYtMWUzMDBmMmZkM2M3XkEyXkFqcGdeQXVyNDYyMDk5MTU@._V1_SX300.jpg',
		Year: '2002',
		own: true,
		watch: false,
		seen: true
	}, {
		imdbID: 'tt3748528',
		Title: 'Rogue One: A Star Wars Story',
		Poster: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjEwMzMxODIzOV5BMl5BanBnXkFtZTgwNzg3OTAzMDI@._V1_SX300.jpg',
		Year: '2016',
		own: false,
		watch: true,
		seen: true
	}];

	this.getDummyData = function () {
		return userMovies;
	};
});
'use strict';

angular.module('cinemaNode').service('omdbService', function ($http, $q) {

	//Acquire search results for a movie
	this.searchForMovies = function (title) {
		var deferred = $q.defer();

		var url = "https://www.omdbapi.com/?s=" + title + "&page=1";
		$http.get(url).success(function (response) {
			var searchResults = response.Search;
			deferred.resolve(searchResults);
		});
		return deferred.promise;
	};

	this.getMovieDetails = function (id) {
		var deferred = $q.defer();
		var url = "https://www.omdbapi.com/?i=" + id + "&plot=full&r=json&tomatoes=true";

		$http.get(url).success(function (response) {
			deferred.resolve(response);
		});
		return deferred.promise;
	};
});
'use strict';

angular.module('cinemaNode').directive('movieDisplay', function () {

	var coverController = ['$scope', 'apiService', function ($scope, apiService) {
		$scope.addMovieToShelf = function (shelf_id) {
			apiService.addMovieToShelf($scope.movie, shelf_id).then(function (response) {
				console.log("movie saved");
			});
		};

		//All these functions make the "Add to" dialogue work
		function getUpdatedData() {
			apiService.getShelvesForMovie($scope.movie.imdbID).then(function (response) {
				$scope.movieShelfList = response.shelfList;
				$scope.shelfNames = response.shelfNames;
			});
		}

		$scope.showShelfList = function () {
			getUpdatedData();
			$scope.isVisible = !!!$scope.isVisible;
		};

		$scope.isSelected = function (shelf_id) {
			var selected = $scope.movieShelfList.indexOf(shelf_id) >= 0;
			return selected;
		};

		$scope.updateMovieShelf = function (shelf_id) {

			if ($scope.movieShelfList.indexOf(shelf_id) >= 0) {
				apiService.deleteShelfMovie($scope.movie.imdbID, shelf_id).then(function (response) {
					getUpdatedData();
					$scope.reload();
				});
			} else {
				apiService.addMovieToShelf($scope.movie, shelf_id).then(function (response) {
					getUpdatedData();
					$scope.reload();
				});
			}
		};
	}];

	return {
		restrict: "E",
		templateUrl: './directives/coverDir.html',
		scope: {
			movie: '=',
			reload: '&'
		},
		controller: coverController
	};
});
'use strict';

angular.module('cinemaNode').directive('shelfDisplay', function () {

	// var dirController = ['$scope', 'apiService', function($scope, apiService) {
	// 	apiService.getUserShelfList().then(shelfList => {
	// 		$scope.shelfList = shelfList;
	// 	}); 	
	// }]

	return {
		restrict: "E",
		templateUrl: './directives/shelfDir.html',
		scope: {
			movies: "=",
			reload: '&'
		}
	};
});
//# sourceMappingURL=bundle.js.map
