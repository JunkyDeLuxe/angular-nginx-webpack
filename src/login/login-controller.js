class LoginController {
	constructor($rootScope, LoginService) {
		this.LoginService = LoginService;
		this.$rootScope = $rootScope;

		this.ongoing = false;
		this.errors = [];
	}

	submit() {
		this.ongoing = true;

		// this.LoginService.submitLogin(this.req).then((response) => {
		// 	this.$rootScope.$emit('logged-in');
		// }, () => {
		// 	this.errors.push({});
		// 	this.ongoing = false;
		// }).catch(()=> {
		// 	this.ongoing = false;
		// });
	}
}

export default LoginController;