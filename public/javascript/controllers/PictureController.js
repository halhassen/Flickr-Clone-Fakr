(function() {
	'use strict';
	angular.module('app')
	.controller('PictureController', PictureController);

	PictureController.$inject = ['$state', 'PictureFactory', '$rootScope'];

	function PictureController($state, PictureFactory, $rootScope) {
		var vm = this;
		vm.picture = {};

		vm.loadAlbums = function() {
			PictureFactory.getAlbum().then(function(res) {
				vm.loggedInUser = res.addedBy;
				console.log(vm.loggedInUser);
				vm.albumPictures = res.picture;
			});
		};

		vm.postPicture = function() {
			vm.picture.createdDate = new Date();
			vm.picture.addedBy = $rootScope._user.id;
			vm.picture.albumId = $rootScope._album._id;
			PictureFactory.postPicture(vm.picture).then(function(res) {
				vm.loadAlbums();
				delete vm.picture; //check this out later
			});
		};

		vm.deletePicture = function(picture) {
			vm.pictures.splice(vm.pictures.indexOf(picture), 1);
			PictureFactory.deletePicture(picture);
		};

		vm.deleteAlbum = function(album) {
			//hmmmmmmm
		};

		vm.loadAlbums();

	}
})();