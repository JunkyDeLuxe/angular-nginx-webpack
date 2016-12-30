import LoginController from './login-controller';
import LoginService from './login-service';

const loginConfig = function ($stateProvider) {
	$stateProvider.state('login', {
		parent: 'app',
		url: '/login?redirect',
		template: require('./login.html'),
		controller: 'LoginController as vm'
	});
};

export default /*@ngInject*/ angular.module('app.login', [])
	.config(loginConfig)
	.controller('LoginController', LoginController)
	.service('LoginService', LoginService)
	.name;