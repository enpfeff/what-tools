/**
 * @module what-tools
 * @since 12/5/16
 * @author Ian Pfeffer
 */
"use strict";

require('./home.scss');
require('./home.html');

module.exports = angular.module('App.Home', [])
    .controller('HomeController', require('./home.controller'));