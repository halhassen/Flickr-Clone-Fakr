(function() {
	'use strict';
	angular.module('app')
	.controller('CommentsController', CommentsController);

	CommentsController.$inject = ['$state', 'PictureFactory', '$stateParams', 'UserFactory', '$rootScope'];

	function CommentsController($state, PictureFactory, $stateParams, UserFactory, $rootScope) {
		var vm = this;
		vm.picture = {};
		vm.comment = {};
		vm.loggedInUser = $rootScope._user;
		vm.x = false;

		if($rootScope._user) {
			UserFactory.getUserLoggedIn($rootScope._user.id).then(function(res) {
				vm.loggedInUser = res;
			});
		};	

		if($stateParams.id) { //if the ID exists here, we go to the factory and find the specific pictures
			PictureFactory.getComment($stateParams.id).then(function(res) {
				vm.comment = res;
				vm.oldComment = angular.copy(res);
			});
		};	
		

		//-------------Comments----------------
		vm.getComments = function() {
			PictureFactory.getComments().then(function(res) {
				vm.comment = res;
			})
		};

		vm.getComments();

		vm.deleteComment = function(comment) {
			vm.comment.splice(vm.comment.indexOf(comment), 1);
			PictureFactory.deleteComment(comment);
		};

		vm.editComment = function(id) {
			vm.edit.id = id;
			console.log(vm.edit);
			PictureFactory.editComment(vm.edit).then(function() {
				vm.edit = "";
				vm.getComments();
			});
		};

		vm.createComment = function() {
			var comment = {
				body: vm.comment.body,
				picture: $stateParams.id,
				addedBy: vm.loggedInUser
			};
			PictureFactory.createComment(comment).then(function(res) {
				vm.comment.body = " ",
				vm.getComments();
				console.log(res);
				vm.comment.push(res);
				console.log(vm.comment)
			})
		}
	}
})();