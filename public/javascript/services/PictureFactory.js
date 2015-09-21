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

		//---------------Album Functions---------------

		o.createAlbum = function(addedById){
			var q = $q.defer();
			$http.get('/api/album' + addedById + '|' + $rootScope._user.id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		//------------Picture Functions----------------
		o.getAlbums = function() {
			var q =$q.defer();
			$http.get('api/album', {_id: $rootScope._user.id}, getAuth()).success(function(res) {
				q.resolve(res)
			});
			return q.promise;
		};

		o.getAlbum = function(){
			var q = $q.defer();
			$http.post("/api/album/albumStart", {_id: $rootScope._album._id}, getAuth()).success(function (res) {
				q.resolve(res);

			});
			return q.promise;
		};	

		o.getPicture = function(id) {
			var q = $q.defer();
			$http.get('api/picture' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.postPicture = function(picture){
			var q = $q.defer();
			$http.post('/api/picture/newPicture', {actualPicture: picture, albumId: $rootScope._album._id}, getAuth()).success(function(res) {

				q.resolve();
			});
			return q.promise;
		};

		o.deletePicture = function(picture) {
			var q = $q.defer();
			$http.delete('api/picture/' + picture._id).success(function(res) {
			});
		};

		o.getPicture();

		return o;
	}
})();