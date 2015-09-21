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
				$state.go('Register');
			});
		};

		vm.login = function() {
			UserFactory.login(vm.user).then(function() {
				vm.loggedInUser = $rootScope._user;
				$state.go('Home')
			});
		};

		vm.logout = function() {
			UserFactory.logout();
			vm.loggedInUser = $rootScope._user;
			delete vm.user;
			$state.go('Home')
		};
	};
})();