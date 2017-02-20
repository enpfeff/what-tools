/**
 * @module what-tools
 * @since 12/5/16
 * @author Ian Pfeffer
 */
"use strict";

const children = [];

const state = {
    name: 'dashboard',
    url: '/dashboard',
    templateUrl: 'dashboard.html',
    controller: 'DashboardController as dash',
    children: children
};

module.exports = state;