(function() {
	'use strict';
	angular.module('app')
	.controller('PictureController', PictureController);

	PictureController.$inject = ['$state', 'PictureFactory', '$stateParams', 'UserFactory', '$rootScope'];

	function PictureController($state, PictureFactory, $stateParams, UserFactory, $rootScope) {
		var vm = this;
		vm.picture = {};
		vm.loggedInUser = $rootScope._user;

		if($rootScope._user) {
			UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
				vm.loggedInUser = res;
			});
		};	


		if($stateParams.id) { //if the ID exists here, we go to the factory and find the specific pictures
			PictureFactory.getPicture($stateParams.id).then(function(res) {
				vm.picture = res;
				vm.oldPicture = angular.copy(res);
			});
		};	

		vm.getPictures = function() {	
			PictureFactory.getPictures().then(function(res) {
				vm.pictures = res;
			});
		};
		
		vm.getPictures();

		vm.postPicture = function(picture) {
			vm.picture.createdDate = new Date();
			vm.picture.addedBy = $rootScope._user.id;
			PictureFactory.postPicture(vm.picture).then(function(res) {
				vm.getPictures();
				delete vm.picture;
			});
		};

		vm.editPicture = function(picture) {
			PictureFactory.editPicture(vm.oldPicture, vm.picture).then(function() {
				$state.go('Home')
				vm.getPictures();
			});
		};


		vm.deletePicture = function(picture) {
			vm.pictures.splice(vm.pictures.indexOf(picture), 1);
			PictureFactory.deletePicture(picture);
		}; 

	}
})();