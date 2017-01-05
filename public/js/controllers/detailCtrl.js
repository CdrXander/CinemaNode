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

	apiService.getUserShelfList().then(shelfList => {
		$scope.shelfList = shelfList;
	}); 
	


	$scope.saveReview = () => {
		apiService.saveReview($scope.movie.imdbID, $scope.userReview, 5).then(response => {
			$scope.reviewSaved = response;
		})

	}

	$scope.addMovieToShelf = function(movie, shelf_id) {
		apiService.addMovieToShelf(movie, shelf_id).then(response => {
			console.log("movie saved");
		})
	}

})