export default /*@ngInject*/ class HomeController {
	constructor() {
		this.name = 'World';
		this.newName = "Hello";
	}

	changeName() {
		this.name = 'angular-tips';
	}
}