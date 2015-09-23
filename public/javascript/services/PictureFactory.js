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

		/*o.createAlbum = function(addedById){
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
		};	*/

		//----Create Comments----------
		o.createComment = function(comment) {
			var q = $q.defer();
			$http.post('/api/comments', comment, getAuth()).success(function(res) {
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

		o.editPicture = function(picture) {
			var q = $q.defer();
			$http.put('/api/picture' + picture._id, picture).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getPicture();

		return o;
	}
})();