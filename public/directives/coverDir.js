angular.module('cinemaNode').directive('movieDisplay', function(){


	var coverController = ['$scope', 'apiService', function($scope, apiService) {
		$scope.addMovieToShelf = function(shelf_id) {
			apiService.addMovieToShelf($scope.movie, shelf_id).then(response => {
				console.log("movie saved");
			});
		}

		//All these functions make the "Add to" dialogue work
		function getUpdatedData() {
			apiService.getShelvesForMovie($scope.movie.imdbID).then(response => {
				$scope.movieShelfList = response.shelfList;
				$scope.shelfNames = response.shelfNames;
			});
		}


		$scope.showShelfList = () => {
			getUpdatedData();
			$scope.isVisible = !!!$scope.isVisible;
		}

		$scope.isSelected = shelf_id => {
			var selected = $scope.movieShelfList.indexOf(shelf_id) >= 0
			return selected;
		}

		$scope.updateMovieShelf = shelf_id => {
			
			if($scope.movieShelfList.indexOf(shelf_id) >= 0) {
				apiService.deleteShelfMovie($scope.movie.imdbID, shelf_id).then(response => {
					getUpdatedData();
					$scope.reload();
				})
			} else {
				apiService.addMovieToShelf($scope.movie, shelf_id).then(response => {
					getUpdatedData();
					$scope.reload();
				})
			}
		}

	}]



	return {
		restrict: "E",
		templateUrl: './directives/coverDir.html',
		scope: {
			movie: '=',
			reload: '&'
		},
		controller:coverController
	}
})