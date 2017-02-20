/**
 * Created by enpfeff on 12/5/16.
 */

const children = [
    require('../../dashboard/dashboard.states')
];

function session(UserService, $log, $state) {
    'ngInject';
    return UserService.hasSession()
        .catch(() => {
            $log.warn('User tried to log in with no jwt');
            return $state.go('app.public.home');
        });

}

const state = {
    name: 'auth',
    url: '',
    children: children,
    abstract: true,
    templateUrl: 'auth.html',
    controller: 'AuthController as auth',
    resolve: {
        session
    }
};

module.exports = state;