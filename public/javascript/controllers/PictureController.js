(function() {
	'use strict';
	angular.module('app')
	.controller('PictureController', PictureController);

	PictureController.$inject = ['$state', 'PictureFactory', 'UserFactory', '$rootScope'];

	function PictureController($state, PictureFactory, UserFactory, $rootScope) {
		var vm = this;
		vm.picture = {};
		vm.loggedInUser = $rootScope._user;
		

		if($rootScope._user) {
			UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
				vm.loggedInUser = res;
			});
		};	

		vm.getPictures = function() {	
			PictureFactory.getPictures().then(function(res) {
				vm.pictures = res;
				console.log(res);
			});
		};

		vm.getPictures();

		vm.postPicture = function(picture) {
			vm.picture.createdDate = new Date();
			vm.picture.addedBy = $rootScope._user.id;
			PictureFactory.postPicture(vm.picture).then(function(res) {
				vm.getPictures();
				delete vm.picture;
				console.log(vm.picture)
			});
		};

		vm.editPicture = function(picture) {
			$state.go('EditPicture');
			PictureFactory.editPicture(picture).then(function(res) {

			})
		};


		vm.deletePicture = function(picture) {
			vm.pictures.splice(vm.pictures.indexOf(picture), 1);
			PictureFactory.deletePicture(vm.picture);
		}; 

		//-------------Comments----------------
		vm.createComment = function() {
			var newComment = {
				body: vm.comment,
				picture: $stateParams.id,
				addedBy: vm.loggedInUser
			};
			console.log(newComment);
			PictureFactory.createComment(vm.comment).then(function(res) {
				vm.newComment = " ",
				console.log(res);
				//newComment.body.push(res);
				console.log(res + '2');
			})
		}
	}
})();