/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const angular = require('angular');
const _ = require('lodash');

const requires = [];

module.exports = angular.module('App', requires)
    .controller('AppController', require('./app.controller'));