/**
 * Created by enpfeff on 2/20/17.
 */


const requires = [
    'ngMaterial',
    'ui.router',
    'ui.router.stateHelper',
    'ngCookies'
];

module.exports = angular.module('App.Users', requires)
    .factory('UserService', require('./user.service'));