/**
 * @module what-tools
 * @since 12/5/16
 * @author Ian Pfeffer
 */
"use strict";

const childStates = [
    require('../../home/home.states')
];

const state = {
    name: 'public',
    url: '',
    abstract: true,
    templateUrl: 'public.html',
    controller: 'PublicController as pub',
    children: childStates
};

module.exports = state;