angular.module('cinemaNode').controller('searchCtrl', function($scope, omdbService, apiService) {

	var user_id=1;

	apiService.getUserShelfList(user_id).then(shelfList => {
		$scope.userShelfList = shelfList;
	});

	$scope.searchForMovies = function() {
		omdbService.searchForMovies($scope.searchTitle).then(serviceData => {
			$scope.movies = serviceData;
			console.log($scope.movies);
			$scope.searchTitle = '';
		})
	}
});