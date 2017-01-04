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

	apiService.getReviewsForMovie($stateParams.id).then(reviews => {
		$scope.reviews = reviews;
	})

	apiService.getUserShelfList().then(shelfList => {
		$scope.shelfList = shelfList;
	}); 
	


	$scope.addMovieToShelf = function(movie, shelf_id) {
		apiService.addMovieToShelf(movie, shelf_id).then(response => {
			console.log("movie saved");
		})
	}

})