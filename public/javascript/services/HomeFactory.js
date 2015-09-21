(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};
		
		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth;
		}

		o.getUsers = function() {
			var q = $q.defer();
			$http.get('/api/user').success(function(res) {
				q.resolve(res);
			});
			return q.promise
		};

		

		return o;
	}
})();