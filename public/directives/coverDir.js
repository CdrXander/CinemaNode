angular.module('cinemaNode').directive('movieDisplay', function(){

	return {
		restrict: "E",
		templateUrl: './directives/coverDir.html',
		scope: {
			movies: '='
		}
	}
})