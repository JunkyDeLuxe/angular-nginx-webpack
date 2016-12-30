class LoginService {
	constructor($http) {
		this.$http = $http;
	}

	submitLogin(req) {
		return this.$http.post('/api/login', req).then((res) => {
			return res;
		});
	}
}

export default /*@ngInject*/ LoginService;