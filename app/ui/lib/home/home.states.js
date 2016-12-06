/**
 * @module what-tools
 * @since 12/5/16
 * @author Ian Pfeffer
 */
"use strict";

require('./home.html');

const state = {
    name: 'home',
    url: '/',
    controller: 'HomeController as home',
    templateUrl: 'home.html'
};

module.exports = state;