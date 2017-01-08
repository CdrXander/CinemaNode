angular.module('cinemaNode').controller(
	'detailCtrl', function($scope, $stateParams, omdbService, apiService) {


	var fullMovie = {};

	omdbService.getMovieDetails($stateParams.id).then(omdbData => {
		fullMovie = omdbData;
		apiService.getMovieById($stateParams.id).then(CNData => {
			if(!!CNData) {
				fullMovie.shelves = CNData.shelves;
			}
			$scope.movie = fullMovie;
		})

	});

	apiService.getReviewForUser($stateParams.id).then(review => {
		$scope.userReview = review[0].review_text;
	});

	apiService.getReviewsForMovie($stateParams.id).then(reviews => {
		$scope.reviews = reviews;
	});


	//These functions make the add to dialog work
	function getUpdatedData() {
		apiService.getShelvesForMovie($stateParams.id).then(response => {
			$scope.movieShelfList = response.shelfList;
			$scope.shelfNames = response.shelfNames;
		});	
	}
	
	getUpdatedData();

	$scope.showShelfList = () => {
		$scope.isVisible = !!!$scope.isVisible;
	}

	$scope.saveReview = () => {
		apiService.saveReview($scope.movie.imdbID, $scope.userReview, 5).then(response => {
			$scope.reviewSaved = response;
		})

	}
	
	$scope.isSelected = shelf_id => {
		return $scope.movieShelfList.indexOf(shelf_id) >= 0
	}

	$scope.updateMovieShelf = shelf_id => {
			
			if($scope.movieShelfList.indexOf(shelf_id) >= 0) {
				apiService.deleteShelfMovie($scope.movie.imdbID, shelf_id).then(response => {
					getUpdatedData();
				})
			} else {
				apiService.addMovieToShelf($scope.movie, shelf_id).then(response => {
					getUpdatedData();
				})
			}
		}

})