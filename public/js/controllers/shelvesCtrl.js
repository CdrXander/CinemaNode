angular.module('cinemaNode').controller('shelvesCtrl', function($scope, apiService) {

	$scope.initialLoad = function() {
		apiService.getUserMovies().then(serviceData => {
			$scope.shelves 	= serviceData;
			$scope.currentShelf = $scope.shelves[0];
		});
	}

	$scope.loadMovieData = function() {
		apiService.getUserMovies().then(serviceData => {
			$scope.shelves 	= serviceData;
		});
	}

	$scope.updateShelf = shelfIndex => {
		$scope.currentShelf = $scope.shelves[shelfIndex];
	}


	$scope.initialLoad();
})