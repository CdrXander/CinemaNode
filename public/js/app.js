/*
*
*	Core Angular routing app
*	Author: Xander Hacking
*
*/
angular.module('cinemaNode', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {
	

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: './views/home.html',
			controller: 'homeCtrl'
		})
		.state('shelves', {
			url: '/shelves',
			templateUrl:'./views/shelves.html',
			controller:'shelvesCtrl'
		})
		.state('search', {
			url: '/search',
			templateUrl: './views/search.html',
			controller: 'searchCtrl'
		})
		.state('details', {
			url: '/details/:id',
			templateUrl: './views/detail.html',
			controller: 'detailCtrl'
		});

		$urlRouterProvider.otherwise('/');

}).run();
