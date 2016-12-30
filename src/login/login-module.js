import LoginController from './login-controller';
import LoginService from './login-service';

const loginConfig = function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		template: require('./login.html'),
		controller: 'LoginController',
		controllerAs: 'login'
	});
};

export default /*@ngInject*/ angular.module('app.login', [])
	.config(loginConfig)
	.controller('LoginController', LoginController)
	.service('LoginService', LoginService)
	.name;