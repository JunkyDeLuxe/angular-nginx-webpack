import HomeController from './home-controller';

function HomeModuleConfig($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		template: require('./home.html'),
		controller: 'HomeController',
		controllerAs: 'home'
	});
};

export default angular.module('app.home', [])
	.config(HomeModuleConfig)
	.controller('HomeController', HomeController)
	.name;
