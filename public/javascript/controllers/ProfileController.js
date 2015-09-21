(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['UserFactory', 'PictureFactory', 'HomeFactory', '$state', '$stateParams', '$rootScope'];

	function ProfileController(UserFactory, PictureFactory, HomeFactory, $state, #stateParams, $rootScope) {
		var vm = this;

		if(!$stateParams.id) {
			$state.go('Profile');
		} else {
			UserFactory.getUserLoggedIn($stateParams.id).then(function(res) {
				vm.user = res
			});
		};

		vm.getAlbums = function() {
			UserFactory.getAlbums($rootScope._user.id).then(function(res) {
				console.log(res);
			});
		};

		//checks if visitor is logged in

		if($rootScope._user) {
			UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
				vm.userLoggedIn = res;
			})
		};

		//--------Editing-----------------------
		vm.editProfile = function() {
			UserFactory.editProfile(vm.user);
			$state.go('Profile');
		};

		vm.createAlbum = function() { //do I need to pass in the user?
			UserFactory.createAlbum().then(function(res) {
				$rootScope._album = res;
				$state.go('') //create album and then picture either 'CreatePicture' or 'CreateAlbum'
			})
		}
	}
})();