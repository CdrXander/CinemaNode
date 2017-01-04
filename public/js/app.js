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
		})
		.state('login', {
			url:'/login',
			templateUrl:'./views/login.html'
		})
		.state('register', {
			url:'/register',
			templateUrl:'./views/register.html'
		});

		$urlRouterProvider.otherwise('/');

}).run();
