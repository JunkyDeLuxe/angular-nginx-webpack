import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap'; // or import accordion from 'angular-ui-bootstrap/src/accordion'; for only accordion

import 'angular-cookies';
import 'angular-translate';
import 'angular-translate-storage-local';
import 'angular-translate-storage-cookie';
import 'angular-translate-loader-static-files';

// import $ from 'jquery';
import moment from 'moment';
import _ from 'lodash';

/* runs */
import httpFallback from './components/http/fallback';

/* services */
import session from './components/session/session-service';
import authInterceptor from './components/session/auth-interceptor';
import errorCodeInterceptor from './components/http/error-code-interceptor';
import Store from './components/store/store-service';

/* controllers */
import AppController from './app-controller';
import HeaderController from './header/header-controller';

/* project angular modules */
import home from './home/home-module';
import login from './login/login-module';

/* LESS modules */
import './app-module.less';

angular.module('app', 
	[
		uirouter,
		uibootstrap,
		'ngCookies',
		'pascalprecht.translate',
		'tmh.dynamicLocale',
		home,
		login
	])
	.controller('AppController', AppController)
	.controller('HeaderController', HeaderController)
	.service('Session', session)
	.service('authInterceptor', authInterceptor)
	.service('errorCodeInterceptor', errorCodeInterceptor)
	.service('Store', Store)

	.config(/*@ngInject*/ function ($translateProvider, tmhDynamicLocaleProvider) {
		$translateProvider.useStaticFilesLoader({
			prefix: 'locales/locale_',
			suffix: '.json'
		});

		$translateProvider.preferredLanguage('fr-FR');
		$translateProvider.useLocalStorage();
		$translateProvider.useLoaderCache(true);
		$translateProvider.useSanitizeValueStrategy('escape');
		$translateProvider.useSanitizeValueStrategy(_.identity);

		//Set default path to resolve locale in different languages.
		// tmhDynamicLocaleProvider.localeLocationPattern('angular/i18n/angular-locale_{{locale}}.js');
		// tmhDynamicLocaleProvider.localeLocationPattern(require('angular-i18n/angular-locale_fr-fr.js'));
		//Set default locale for $locale used for date, numbers filter by angular-js
		tmhDynamicLocaleProvider.defaultLocale('fr-FR');
	})

	.config(/*@ngInject*/ function ($httpProvider, $urlRouterProvider, $stateProvider, $locationProvider) {
		$locationProvider.html5Mode(true).hashPrefix('!');

		$httpProvider.interceptors.push(
			'authInterceptor',
			'errorCodeInterceptor'
		);

		$stateProvider.state('app', {
			abstract: true,
			views: {
				'': {
					template: require('./app.html'),
					controller: 'AppController as vm'
				},
				'header@app': {
					template: require('./header/header.html'),
					controller: 'HeaderController as vm'
				}
			},
			resolve: {
				translateReady: function ($translate) {
					return $translate.onReady();
				}
			}
		});

		[
			'not-found',
			'unauthorized',
			'network-error',
			'unavailable-service',
			'unexpected-error'
		].forEach(function (error) {
			$stateProvider.state(error, {
				parent: 'app',
				controller: function (err) {
					var vm = this;

					vm.error = err;
				},
				controllerAs: 'vm',
				templateUrl: 'error.html',
				resolve: {
					err: function () {
						return error;
					}
				}
			});
		});

		$urlRouterProvider.otherwise(function ($injector, $location) {
			var state = $injector.get('$state');
			state.go('not-found');
			return $location.path();
		});
	})
	.run(/*@ngInject*/ function ($rootScope, $document) {
		$rootScope.$on('$stateChangeSuccess', function () {
			$document[0].body.scrollTop = $document[0].documentElement.scrollTop = 0;
		});
	})
	.run(httpFallback);