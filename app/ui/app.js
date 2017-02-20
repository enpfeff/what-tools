/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const angular = require('angular');
const uiRouter = require('angular-ui-router');
const uiRouterHelper = require('angular-ui-router.statehelper');
const ngAria = require('angular-aria');
const ngAnimate = require('angular-animate');
const ngCookies = require('angular-cookies');
const ngMaterial = require('angular-material');
const environment = require('env');
const DEVELOPMENT = 'development';

const vendor = [
    'ui.router',
    'ui.router.stateHelper',
    'ngMaterial',
    'ngAria',
    'ngAnimate',
    'ngCookies'
];

const modules = [
    require('./lib/core'),
    require('./lib/home'),
    require('./lib/dashboard')
];

const app = angular.module('App', _.union(_.map(modules, 'name'), vendor))
    .config(($logProvider) => $logProvider.debugEnabled(environment.env === DEVELOPMENT));

angular.element(document).ready(bootstrap);
module.exports = app;

function bootstrap() {
    angular.bootstrap(document, ['App'], {strictDi: true});
}