/**
 * @module what-tools
 * @since 11/6/16
 * @author Ian Pfeffer
 */
"use strict";
require('./app.html');
const angular = require('angular');

const childStates = [
    require('./lib/core/public/public.states')
];

const state = {
    name: 'app',
    url: '',
    abstract: true,
    controller: 'AppController as app',
    templateUrl: 'app.html',
    children: childStates
};

module.exports = state;