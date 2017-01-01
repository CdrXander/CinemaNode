angular.module('cinemaNode').directive('movieDisplay', function(){


	var coverController = ['$scope', 'apiService', function($scope, apiService) {
		$scope.addMovieToShelf = function(movie, shelf_id) {
			apiService.addMovieToShelf(movie, shelf_id).then(response => {
				console.log("movie saved");
			})
		}	
	}]

	return {
		restrict: "E",
		templateUrl: './directives/coverDir.html',
		scope: {
			movies: '=',
			shelfList: '='
		},
		controller:coverController
	}


	
})