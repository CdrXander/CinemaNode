angular.module('cinemaNode').directive('movieDisplay', function(){


	var coverController = ['$scope', 'apiService', function($scope, apiService) {
		$scope.addMovieToShelf = function(movie, shelf_id) {
			apiService.addMovieToShelf(movie, shelf_id).then(response => {
				console.log("movie saved");
			});
		}


		//All these functions make the "Add to" dialogue work
		$scope.getShelfListForMovie = movie_id => {
			apiService.getShelvesForMovie(movie_id).then(movieShelfList => {
				$scope.movieShelfList = movieShelfList;
			});
		}

		$scope.showShelfList = (index, movie_id) => {
			$scope.getShelfListForMovie(movie_id);
			$scope.isVisible[index] = !!!$scope.isVisible[index];
		}

		$scope.isSelected = shelf_id => {
			return $scope.movieShelfList.indexOf(shelf_id) >= 0;
		}

		$scope.updateMovieShelf = () => {
			console.log("TODO");
		}


		// Initialization of data
		apiService.getUserShelfList().then(shelfList => {
			$scope.shelfList = shelfList;
		}); 	
		$scope.isVisible = [];

	}]



	return {
		restrict: "E",
		templateUrl: './directives/coverDir.html',
		scope: {
			movies: '='
		},
		controller:coverController
	}
})