/**
 * @module what-tools
 * @since 12/5/16
 * @author Ian Pfeffer
 */
"use strict";

require('./public.html');

module.exports = angular.module('App.Public', [])
    .controller('PublicController', require('./public.controller'));