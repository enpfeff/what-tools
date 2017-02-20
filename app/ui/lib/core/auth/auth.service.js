/**
 * Created by enpfeff on 2/20/17.
 */
module.exports = service;

function service($http, UserService, $state) {
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
        }).then((res) => res.data);

    }

    function logout(go) {
        UserService.removeSession();
        if(go) $state.go('app.public.home');
    }
}