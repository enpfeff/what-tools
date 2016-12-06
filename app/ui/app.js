/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";
const angular = require('angular');
const uiRouter = require('angular-ui-router');
const uiRouterHelper = require('angular-ui-router.statehelper');

const vendor = [
    'ui.router',
    'ui.router.stateHelper'
];

const modules = [
    require('./lib/core'),
    require('./lib/home')
];

const app = angular.module('App', _.union(_.map(modules, 'name'), vendor));

angular.element(document).ready(bootstrap);

function bootstrap() {
    angular.bootstrap(document, ['App'], {strictDi: true});
}

module.exports = app;