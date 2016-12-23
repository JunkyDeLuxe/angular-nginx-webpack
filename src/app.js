import angular from 'angular';
import uirouter from 'angular-ui-router';
import $ from 'jquery';
import moment from 'moment';

import home from './home/home-module';

angular.module('app', 
	[
		uirouter,
		home
	]).config(function ($urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
	});