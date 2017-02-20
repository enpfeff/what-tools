
function controller(AuthService, UserService, $state, NotificationService) {
    'ngInject';

    let home = this;

    _.extend(home, {
        login
    });

    init();

    function init() {
        // if they are coming here they are not logged in generally confirm that
        AuthService.logout();
    }

    function login() {
        if(_.isUndefined(home.username) || _.isUndefined(home.password)) return;

        return AuthService.login(home.username, home.password)
            .then((data) => UserService.createSession(data.user, data.jwt))
            .then(() => $state.go('app.auth.dashboard'))
            .catch(() => NotificationService.toast('Failed to login'));
    }
}

module.exports = controller;