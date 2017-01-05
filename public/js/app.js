/*
*
*	Core Angular routing app
*	Author: Xander Hacking
*
*/
angular.module('cinemaNode', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
	
	var authCheck = function($q, $timeout, $http, $state, $rootScope) {
		var deferred = $q.defer();
		$http.get('/loggedin').success(function(user) {
			if(user !== '0') {
				deferred.resolve();
			} else {
				deferred.reject();
				$state.go('login');
			}
		});
		return deferred.promise;
	}


	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: './views/home.html',
			controller: 'homeCtrl',
			resolve: {
				loggedin:authCheck
			}
		})
		.state('shelves', {
			url: '/shelves',
			templateUrl:'./views/shelves.html',
			controller:'shelvesCtrl',
			resolve: {
				loggedin:authCheck
			}

		})
		.state('search', {
			url: '/search',
			templateUrl: './views/search.html',
			controller: 'searchCtrl',
			resolve: {
				loggedin:authCheck
			}
		})
		.state('details', {
			url: '/details/:id',
			templateUrl: './views/detail.html',
			controller: 'detailCtrl',
			resolve: {
				loggedin:authCheck
			}
		})
		.state('login', {
			url:'/login',
			templateUrl:'./views/login.html'
		});

		$urlRouterProvider.otherwise('/shelves');

}).run();
