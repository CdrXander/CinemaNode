angular.module('cinemaNode').controller('coverCtrl', function($scope, apiService) {
	
	apiService.getUserShelfList().then(shelfList => {
		$scope.shelfList = shelfList;
	}); 

	$scope.addMovieToShelf = function(movie, shelf_id) {
		apiService.addMovieToShelf(movie, shelf_id).then(response => {
			console.log("movie saved");
		})
	}
});	
