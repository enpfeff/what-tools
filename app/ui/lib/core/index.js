/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";
require('./app.scss');

const requires = [];

module.exports = angular.module('App.Core', requires)
    .controller('AppController', require('./app.controller'));