angular.module('cinemaNode').controller('shelvesCtrl', function($scope, apiService) {

	$scope.loadMovieData = function() {
		apiService.getUserMovies().then(serviceData => {
			$scope.shelves = serviceData;
		});
	}


	// $scope.loadDummyMovieData();
	$scope.loadMovieData();
})