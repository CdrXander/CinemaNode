angular.module('cinemaNode').directive('movieDisplay', function(){


	var coverController = ['$scope', 'apiService', function($scope, apiService) {
		$scope.addMovieToShelf = function(shelf_id) {
			apiService.addMovieToShelf($scope.movie, shelf_id).then(response => {
				console.log("movie saved");
			});
		}


		//All these functions make the "Add to" dialogue work
		$scope.getShelfListForMovie = () => {
			apiService.getShelvesForMovie($scope.movie.imdbID).then(movieShelfList => {
				$scope.movieShelfList = movieShelfList;
			});
		}

		$scope.showShelfList = () => {
			$scope.getShelfListForMovie($scope.movie.imdbID);
			$scope.isVisible = !!!$scope.isVisible;
		}

		$scope.isSelected = shelf_id => {
			return $scope.movieShelfList.indexOf(shelf_id) >= 0;
		}

		$scope.updateMovieShelf = () => {
			console.log("TODO");
		}

	}]



	return {
		restrict: "E",
		templateUrl: './directives/coverDir.html',
		scope: {
			movie: '=',
			shelfList: '='

		},
		controller:coverController
	}
})