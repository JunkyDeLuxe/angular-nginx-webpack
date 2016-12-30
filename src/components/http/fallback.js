const fallback = function ($http, $rootScope, Session, $state, $q) {
	function rejection2state(rejection) {
		if (rejection.status === 0) return 'network-error';
		if (rejection.status === 401) return 'unauthorized';
		if (rejection.status === 404) return 'not-found';
		if (rejection.status >= 500 && rejection.status <= 599) return 'unavailable-service';
		return 'unexpected-error';
	}

	$http.fallback = function (rejection) {
		if (rejection.code) {
			switch (rejection.code) {
				case 'jwt expired':
				case 'invalid-session':
				case 'invalid-token': {
					$rootScope.$emit('logged-out');
					return;
				}
			}
		}

		$state.go(rejection2state(rejection));
		return $q.reject();
	};
};

export default /*@ngInject*/  fallback;