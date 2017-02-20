/**
 * Created by enpfeff on 12/5/16.
 */

require('./auth.html');

const requires = ['ngCookies'];

const app = angular.module('App.Auth', requires)
    .factory('AuthService', require('./auth.service'))
    .constant({
        WHAT_HEADER_TMP: 'tmp',
        WHAT_HEADER: 'what-auth'
    })
    .controller('AuthController', require('./auth.controller'));

module.exports = app;