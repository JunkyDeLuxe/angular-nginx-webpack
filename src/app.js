import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';
// or import accordion from 'angular-ui-bootstrap/src/accordion'; for only accordion

import $ from 'jquery';
import moment from 'moment';

/* custom angular modules */
import home from './home/home-module';

// /* bootstrap less */
// import "bootstrap-less";
import css from 'bootstrap-less/bootstrap/bootstrap.less';

angular.module('app', 
	[
		uirouter,
		uibootstrap,
		home
	]).config(function ($urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
	});