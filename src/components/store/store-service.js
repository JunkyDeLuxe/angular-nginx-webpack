const Store = /*@ngInject*/ function ($q, $window) {
	return {
		get: function (key) {
			return angular.fromJson($window.localStorage.getItem(key));
		},

		set: function (key, data) {
			$window.localStorage.setItem(key, angular.toJson(data));
		},

		del: function (filter) {
			$window.localStorage.removeItem(filter);
		},

		clear: function () {
			$window.localStorage.clear();
		}
	};
};

export default Store;