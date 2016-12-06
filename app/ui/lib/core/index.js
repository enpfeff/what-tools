/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";
require('./app.scss');
require('./app.html');

const requires = [
    'ui.router',
    'ui.router.stateHelper',
    require('./public').name,
    require('./auth').name
];

module.exports = angular.module('App.Core', requires)
    .config(require('./app.routes'))
    .controller('AppController', require('./app.controller'));