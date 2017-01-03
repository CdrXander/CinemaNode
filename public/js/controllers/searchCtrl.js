angular.module('cinemaNode').controller('searchCtrl', function($scope, omdbService, apiService) {

	var user_id=1;

	$scope.searchForMovies = function() {
		omdbService.searchForMovies($scope.searchTitle).then(serviceData => {
			$scope.movies = serviceData;
			console.log($scope.movies);
			$scope.searchTitle = '';
		})
	}
});