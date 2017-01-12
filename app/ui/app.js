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
const ngMaterial = require('angular-material');

const vendor = [
    'ui.router',
    'ui.router.stateHelper',
    'ngMaterial',
    'ngAria',
    'ngAnimate'
];

const modules = [
    require('./lib/core'),
    require('./lib/home')
];

const app = angular.module('App', _.union(_.map(modules, 'name'), vendor));

angular.element(document).ready(bootstrap);
module.exports = app;

function bootstrap() {
    angular.bootstrap(document, ['App'], {strictDi: true});
}