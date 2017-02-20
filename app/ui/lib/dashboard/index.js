/**
 * Created by enpfeff on 2/20/17.
 */
require('./dashboard.html');

const requires = [
    'App.Core'
];

module.exports = angular.module('App.Dashboard', requires)
    .controller('DashboardController', require('./dashboard.controller'));