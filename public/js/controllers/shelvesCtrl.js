angular.module('cinemaNode').controller('shelvesCtrl', function($scope, dummyDataService) {


	$scope.loadMovieData = function() {
		$scope.ownedMovies = [];
		$scope.watchMovies = [];

		var savedMovies = dummyDataService.getDummyData();
		for (let movie of savedMovies) {
			if (movie.own === true) {
				$scope.ownedMovies.push(movie);
			}
			if (movie.watch === true) {
				$scope.watchMovies.push(movie);
			}
		}
		$scope.test = "Test";
	}

	$scope.loadMovieData();
})