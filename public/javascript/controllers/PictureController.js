(function() {
	'use strict';
	angular.module('app')
	.controller('PictureController', PictureController);

	PictureController.$inject = ['$state', 'PictureFactory', '$rootScope'];

	function PictureController($state, PictureFactory, $rootScope) {
		var vm = this;
		vm.picture = {};
		vm.loggedInUser = $rootScope._user;
		

		var getPictures = function() {	
			PictureFactory.getPictures().then(function(res) {
				vm.pictures = res;
				console.log(res);
			});
		};

		getPictures;

		vm.postPicture = function(picture) {
			vm.picture.createdDate = new Date();
			vm.picture.addedBy = $rootScope._user.id;
			//vm.picture.albumId = $rootScope._album.id;*/
			PictureFactory.postPicture(vm.picture).then(function(res) {
				getPictures();
				delete vm.picture; //check this out later
			});
		};

		vm.deletePicture = function(picture) {
			vm.pictures.splice(vm.pictures.indexOf(picture), 1);
			PictureFactory.deletePicture(picture);
		};
	}
})();