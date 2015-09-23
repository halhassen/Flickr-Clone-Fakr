(function() {
	'use strict';
	angular.module('app')
	.controller('NavBarController', NavBarController);

	NavBarController.$inject = ['$state', '$stateParams', 'UserFactory', 'HomeFactory', 'PictureFactory', '$rootScope'];

	function NavBarController($state, $stateParams, UserFactory, HomeFactory, PictureFactory, $rootScope) {
		var vm = this;
		vm.user = {};
		vm.loggedInUser = $rootScope._user;

		vm.register = function() {
			UserFactory.register(vm.user).then(function() {
				delete vm.user;
				$state.go('Home');
			});
		};

		var getUsers = function() {	
			HomeFactory.getUsers().then(function(res) {
				vm.users = res;
				console.log(res);
			});
		};

		vm.login = function() {
			UserFactory.login(vm.user).then(function() {
				vm.loggedInUser = $rootScope._user;
				$state.go('Home');
				getUsers();

			});
		};

		vm.logout = function() {
			UserFactory.logout();
			vm.loggedInUser = $rootScope._user;
			delete vm.user;
			$state.go('Home');
			getUsers();
		};

		vm.search = function() {
			$scope.availableSearchParams = [
			{ key: "username", name: "Name", placeholder: "Created By..." },
			{ key: "album", name: "Album", placeholder: "Album Name..." },
			{ key: "pictureName", name: "Image", placeholder: "Image Name..." },
			{ key: "tags", name: "Tags", placeholder: "Tags..." }
			];
		};

		//add comment functionality here!

		vm.createComment = function() {
			var newComment = {
				body: vm.newComment,
				picture: $stateParams.id
			};

			UserFactory.createComment(comment).then(function(res) {
				vm.newComment = " ",
				vm.picture.comments.push(res);
			})
		}
	};
})();