/**
 * Created by enpfeff on 2/20/17.
 */
function userService($cookies, $q, $log) {
    'ngInject';
    const JWT_KEY = 'jwt';

    let userSession = {};

    return {
        createSession,
        getUser,
        getJwt,
        removeSession,
        hasSession
    };

    function removeSession() {
        $log.debug('remove user session');
        userSession = {};
        $cookies.remove(JWT_KEY);
    }

    function createSession(user, jwt) {
        userSession.user = user;
        userSession.jwt = jwt;
        $log.debug('Creating cookie');
        $cookies.putObject(JWT_KEY, { jwt, user });
    }

    function hasSession() {
        return $q((resolve, reject) => {
            if(!_.isUndefined(userSession.jwt) && !_.isUndefined(userSession.user)) return resolve(true);

            // they've come from refreshing but are logged in
            const object = $cookies.getObject(JWT_KEY);
            if(_.isUndefined(object)) return reject();

            if(!_.isUndefined(object.jwt) && !_.isUndefined(object.user)) {
                createSession(object.user, object.jwt);
                return resolve(true);
            }

            return reject();
        });
    }

    function getUser() {
        return userSession.user;
    }

    function getJwt() {
        return userSession.jwt;
    }
}

module.exports = userService;