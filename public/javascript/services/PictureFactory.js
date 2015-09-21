(function() {
	'use strict';
	angular.module('app')
	.factory('PictureFactory', PictureFactory);

	PictureFactory.$inject = ['$http', '$q'];

	function PictureFactory($http, $q) {
		var o = {};
		
		return o;
	}
})();