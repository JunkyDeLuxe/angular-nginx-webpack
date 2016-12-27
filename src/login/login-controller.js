class LoginController {
	constructor($rootScope, LoginService) {
		this.LoginService = LoginService;
		this.$rootScope = $rootScope;

		this.ongoing = false;
		this.errors = [];
	}

	submit() {
		this.ongoing = true;
	}
}

export default /*@ngInject*/ LoginController;