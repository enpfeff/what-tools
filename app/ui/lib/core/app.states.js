/**
 * @module what-tools
 * @since 11/6/16
 * @author Ian Pfeffer
 */
"use strict";
const angular = require('angular');

const childStates = [
    require('./public/public.states'),
    require('./auth/auth.states')
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