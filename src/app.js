import angular from 'angular';
import uirouter from 'angular-ui-router';
import uibootstrap from 'angular-ui-bootstrap';
// or import accordion from 'angular-ui-bootstrap/src/accordion'; for only accordion

// import $ from 'jquery';
// import moment from 'moment';
import _ from 'lodash';

/* custom angular modules */
import home from './home/home-module';
import login from './login/login-module';

/* LESS */
import './app-less.js';

angular.module('app', 
	[
		uirouter,
		uibootstrap,
		home,
		login
	]).config(function ($urlRouterProvider, $locationProvider) {
		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/');
	});