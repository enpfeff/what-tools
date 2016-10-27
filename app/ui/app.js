/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";
const angular = require('angular');

const requires = [
    require('./lib/core').name
];

//
//  Bootstrap to the Page
//
angular.element(document).ready(() => {
    angular.bootstrap(document, ['App'], {strictDi: true});
});

module.exports = angular
    .module('App', requires);