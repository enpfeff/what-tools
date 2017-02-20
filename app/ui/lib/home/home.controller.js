
function controller(AuthService) {
    'ngInject';

    let home = this;

    _.extend(home, {
        login
    });

    function login() {
        if(_.isUndefined(home.username) || _.isUndefined(home.password)) return;

        return AuthService.login(home.username, home.password)
            .then((res) => console.log(res));
    }
}

module.exports = controller;