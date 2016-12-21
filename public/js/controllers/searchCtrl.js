angular.module('cinemaNode').controller('searchCtrl', function($scope, omdbService) {


	$scope.searchForMovies = function() {
		omdbService.searchForMovies($scope.searchTitle).then(serviceData => {
			$scope.movies = serviceData;
			$scope.searchTitle = '';
		})
	}

});