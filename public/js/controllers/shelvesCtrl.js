angular.module('cinemaNode').controller('shelvesCtrl', function($scope, apiService) {
	var user_id = 1;

	// $scope.loadDummyMovieData = function() {
	// 	$scope.ownedMovies = [];
	// 	$scope.watchMovies = [];
	// 	$scope.seenMovies  = [];

	// 	var savedMovies = dummyDataService.getDummyData();
	// 	for (let movie of savedMovies) {
	// 		if (movie.own === true) {
	// 			$scope.ownedMovies.push(movie);
	// 		}
	// 		if (movie.watch === true) {
	// 			$scope.watchMovies.push(movie);
	// 		}
	// 		if (movie.seen === true) {
	// 			$scope.seenMovies.push(movie);
	// 		}
	// 	}
	// }

	$scope.loadMovieData = function() {
		apiService.getUserMovies(user_id).then(serviceData => {
			$scope.shelves = serviceData;
		});
	}


	// $scope.loadDummyMovieData();
	$scope.loadMovieData();
})