/**
 * Created by enpfeff on 12/5/16.
 */

require('./auth.html');

const requires = [];

const app = angular.module('App.Auth', requires)
    .factory('AuthService', require('./auth.service'))
    .controller('AuthController', require('./auth.controller'));

module.exports = app;