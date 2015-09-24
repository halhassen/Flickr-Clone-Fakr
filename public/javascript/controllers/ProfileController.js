(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['UserFactory', 'PictureFactory', 'HomeFactory', '$state', '$stateParams', '$rootScope'];

	function ProfileController(UserFactory, PictureFactory, HomeFactory, $state, $stateParams, $rootScope) {
		var vm = this;
		vm.picture = {};
		vm.user = {};
		vm.loggedInUser = $rootScope._user;

		if($rootScope._user) {
			UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
				vm.loggedInUser= res;
			});
		};	

		if($rootScope._user) {
			PictureFactory.getPicture($rootScope._user.id).then(function(res) {
				vm.picture = res;
			});
		};	

		if(!$stateParams.id) {
			$state.go('Profile');
		} else {
			UserFactory.getUserLoggedIn($stateParams.id).then(function(res) {
				vm.user = res
			});
		};

		var getPictures = function() {	
			PictureFactory.getPictures($rootScope._user.id).then(function(res) {
				vm.pictures = res;
				console.log(res);
			});
		};

		vm.getAlbums = function() {
			UserFactory.getAlbums($rootScope._user.id).then(function(res) {
				console.log(res);
			});
		};
		

		//--------Editing-----------------------
		vm.editProfile = function(user) {
			UserFactory.editProfile(vm.user).then(function() {
				$state.go('EditProfile') 
			});
		};


		vm.createAlbum = function(addedBy) { //do I need to pass in the user?
			UserFactory.createAlbum().then(function(res) {
				$rootScope._album = res;
				$state.go('') //create album and then picture either 'CreatePicture' or 'CreateAlbum'
			})
		};

		vm.deleteUser = function(user) {
			vm.users.splice(vm.users.indexOf(user), 1);
			UserFactory.deleteUser(user);
		};

		vm.deletePicture = function(picture) {
			vm.pictures.splice(vm.pictures.indexOf(picture), 1);
			PictureFactory.deletePicture(picture);
		};


	}
})();