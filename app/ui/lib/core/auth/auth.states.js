/**
 * Created by enpfeff on 12/5/16.
 */

const children = [];

const state = {
    name: 'auth',
    url: '',
    children: children,
    abstract: true,
    templateUrl: 'auth.html',
    controller: 'AuthController as auth'
};

module.exports = state;