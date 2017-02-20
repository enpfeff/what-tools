/**
 * Created by enpfeff on 2/20/17.
 */
module.exports = service;

function service($http) {
    'ngInject';

    return {
        login,
        logout
    };

    function login(user, pass) {
        return $http({
            url: '/auth/login',
            method: 'POST',
            data: {
                email: user,
                password: pass
            }
        });
    }

    function logout() {

    }
}