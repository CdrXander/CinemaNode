angular.module('cinemaNode').controller('mainCtrl', function($scope, apiService) {

	$scope.pageNotWorking = "Main Controller Working";

	apiService.getCurrentUser().then(currentUser => {
		if(!!currentUser) {
			$scope.currentUser = currentUser;
		} else {
			$scope.currentUser = false;
		}
	})

})