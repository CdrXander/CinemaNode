angular.module('cinemaNode').directive('shelfDisplay', function() {
	
	// var dirController = ['$scope', 'apiService', function($scope, apiService) {
	// 	apiService.getUserShelfList().then(shelfList => {
	// 		$scope.shelfList = shelfList;
	// 	}); 	
	// }]

	return {
		restrict: "E",
		templateUrl:'./directives/shelfDir.html',
		scope: {
			movies: "=",
			reload: '&'
		}
	}
})