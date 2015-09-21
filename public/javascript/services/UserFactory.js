(function() {
	'use strict';
	angular.module('app')
	.factory('UserFactory', UserFactory);

	UserFactory.$inject = ['$http', '$q', '$window', '$rootScope'];

	function UserFactory($http, $q, $window, $rootScope) {
		var o = {};

		//---------Tokens----------------------------------

		function setToken(token) {
			localStorage.setItem("token", token);
		};

		function removeToken() {
			localStorage.removeItem("token");
		};

		function getToken() {
			return localStorage.token;
		};

		function isLoggedIn() {
			var token = getToken();
			if(token) {
				var payload = JSON.parse(urlBase64Decoder(token.split('.')[1]));
				if(payload.exp > Date.now() / 1000) {
					return payload;
				}
			} else {
				return false;
			}
		};

		//---------Login, Register, Logout----------------------------------
		o.register = function(user) {
			var q = $q.defer();
			$http.post('/api/user/register', user).success(funciton(res) {
				q.resolve();
			});
			return q.promise;
		};

		o.login = function(user) {
			var q = $q.defer();
			user.username = user.username.toLowerCase();
			$http.post('/api/user/login', user).success(function(res) {
				setToken(res.token);
				$rootScope._user = isLoggedIn();
				q.resolve();
			});
			return q.promise;
		};

		o.logout = function() {
			removeToken();
			$rootScope._user = isLoggedIn();
		};

		function urlBase64Decoder(str) {
			var output = str.replace(/-/g, '+').replace(/_/g, '/');
			switch(output.length % 4) {
				case 0: {break; }
				case 2: {output += '=='; break;}
				case 3: {output += '='; break;}
				default:
				throw 'Illegal base64 string'
			}
			return decodeURIComponent(escape($window.atob(output)));
		};

		//---------Getting User Data----------------------------------
		o.getUserLoggedIn = function(id) {
			var q = $q.defer();
			$http.get('/api/user' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getUsers = function() {
			var q = $q.defer();
			$http.get('/api/user').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.editProfile = function(edittedProfile) {
			var q = $q.defer();
			$http.put('/api/user' + edittedProfile._id, edittedProfile).success(function(res) {
				q.resolve(res);
				console.log(res);
			});
			return q.promise;
		};

		$rootScope._user = isLoggedIn();

		return o;
	}
})();