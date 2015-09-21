(function() {
	'use strict';
	angular.module('app')
	.controller('NavBarController', NavBarController);

	NavBarController.$inject = ['$state', 'UserFactory', 'HomeFactory', '$rootScope'];

	function NavBarController($state, UserFactory, HomeFactory, $rootScope) {
		var vm = this;
		
		vm.loggedInUser = $rootScope._user;

		vm.register = function() {
			UserFactory.register(vm.user).then(function() {
				delete vm.user;
				$state.go('Home');
			});
		};

		vm.login = function() {
			UserFactory.login(vm.user).then(function() {
				console.log('con1');
				vm.loggedInUser = $rootScope._user;
				console.log('con2');
				$state.go('Home')
			});
		};

		vm.logout = function() {
			UserFactory.logout();
			vm.loggedInUser = $rootScope._user;
			delete vm.user;
			$state.go('Home')
		};

		vm.search = function() {
			$scope.availableSearchParams = [
			{ key: "username", name: "Name", placeholder: "Created By..." },
			{ key: "album", name: "Album", placeholder: "Album Name..." },
			{ key: "pictureName", name: "Image", placeholder: "Image Name..." },
			{ key: "tags", name: "Tags", placeholder: "Tags..." }
			];
		};
	};
})();