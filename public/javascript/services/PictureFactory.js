(function() {
	'use strict';
	angular.module('app')
	.factory('PictureFactory', PictureFactory);

	PictureFactory.$inject = ['$http', '$q', '$rootScope'];

	function PictureFactory($http, $q, $rootScope) {
		var o = {};
		
		var getAuth = function() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			};
			return auth;
		};

		//-------------Comments----------------
		o.createComment = function(comment) {
			var q = $q.defer();
			$http.post('/api/comments', comment, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getPictureComment = function(id) {
			var q = $q.defer();
			$http.get('/api/picture/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		//-----Picture Getting and Creating-----
		o.getPictures = function() {
			var q = $q.defer();
			$http.get('/api/picture/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getPicture = function(id) {
			var q = $q.defer();
			$http.get('/api/picture/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.postPicture = function(picture){
			var q = $q.defer();
			$http.post('/api/picture/', picture, getAuth()).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		//----------Deleting and Editing
		o.deletePicture = function(picture) {
			var q = $q.defer();
			$http.delete('/api/picture/' + picture._id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.editPicture = function(oldPicture, picture) {
			var q = $q.defer();
			$http.put('/api/picture/' + oldPicture._id, picture).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		return o;
	}
})();