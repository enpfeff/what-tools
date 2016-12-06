/**
 * @module what-tools
 * @since 12/5/16
 * @author Ian Pfeffer
 */
"use strict";

const states = require('./app.states');

function routes($locationProvider, $urlRouterProvider, stateHelperProvider) {
    'ngInject';

    // some awesome

    $locationProvider.html5mode(true);
    stateHelperProvider.state(states);
    $urlRouterProvider.otherwise('/');
}

module.exports = routes;