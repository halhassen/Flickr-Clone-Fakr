(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html',
			controller: 'NavBarController',
			controllerAs: 'vm'
		}).state("Register", {
			url: '/Register',
			templateUrl: 'views/register_user.html',
			controller: 'NavBarController',
			controllerAs: 'vm'
		}).state('Profile', {
			url: '/Profile',
			templateUrl: 'views/profile.html',
			controller: "ProfileController",
			controllerAs: 'vm'
		}).state('Albums', {
			url: '/Albums',
			templateUrl: 'views/albums.html',
			controller: 'PictureController',
			controllerAs: 'vm'
		}).state('Login', {
			url: '/Login',
			templateUrl: 'views/login.html',
			controller: 'NavBarController',
			controllerAs: 'vm'
		}).state('CreatePicture', {
			url: '/CreatePicture',
			templateUrl: 'views/add_picture.html',
			controller: 'PictureController',
			controllerAs: 'vm'
		}).state('EditProfile', {
			url: '/EditProfile/:id', 
			templateUrl: 'views/edit_profile.html',
			controller: 'ProfileController',
			controllerAs: 'vm'
		}).state('EditPicture', {
			url: '/EditPicture/:id',
			templateUrl: 'views/edit_picture.html',
			controller: 'PictureController',
			controllerAs: 'vm'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
