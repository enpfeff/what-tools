/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";
require('./app.scss');
require('./app.html');

const requires = [
    'ngMaterial',
    'ngCookies',
    'ui.router',
    'ui.router.stateHelper',
    require('./public').name,
    require('./auth').name,
    require('./user').name
];

module.exports = angular.module('App.Core', requires)
    .config(require('./app.routes'))
    .config(require('./theme'))
    .factory('NotificationService', require('./notification.service'))
    .controller('AppController', require('./app.controller'));