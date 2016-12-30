class ErrorCodeInterceptor {
	contructor($q, $rootScope) {
		this.$q = $q;
		this.$rootScope = $rootScope;

		this.responseError = function (rejection) {
			let code = ((rejection.data || {}).code || {});
			if (code) rejection.code = code;

			if (rejection.code) {
				switch (rejection.code) {
					case 'jwt expired':
					case 'invalid-session':
					case 'invalid-token': {
						rejection.handler = $rootScope.$emit('logged-out');
					}
				}
			}

			return this.$q.reject(rejection);
		}
	}
}

export default /*@ngInject*/ ErrorCodeInterceptor;