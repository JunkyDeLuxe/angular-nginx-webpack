import HomeController from './home-controller';

function HomeModuleConfig($stateProvider) {
	$stateProvider.state('home', {
		parent: 'app',
		url: '/',
		template: require('./home.html'),
		controller: 'HomeController as vm'
	});
};

export default angular.module('app.home', [])
	.config(HomeModuleConfig)
	.controller('HomeController', HomeController)
	.run(($templateCache) => {
		$templateCache.put("test-include.html", require("./test-include.html"));
	})
	.name;
