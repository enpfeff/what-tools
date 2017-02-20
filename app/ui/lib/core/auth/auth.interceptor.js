/**
 * Created by enpfeff on 2/20/17.
 */
function config($httpProvider) {
    'ngInject';


    function tokenInterceptor($log, $q, WHAT_HEADER_TMP, WHAT_HEADER, UserService, AuthService) {
        'ngInject'; /* jshint ignore:line */


        return {
            /**
             * Intended to intercept $httpProvider's 'request' function in order to append a bearer token
             * @param config
             * @returns {*}
             */
            request: function (config) {
                // Set API token if it was stubbed out
                if ((WHAT_HEADER_TMP === _.get(config.headers, WHAT_HEADER))) {
                    config.headers[WHAT_HEADER] = UserService.getJwt();
                }
                return config;
            },

            /**
             * Handle response errors
             * @param response
             * @returns {*}
             */
            responseError: function (response) {

                if (response.status === 401) {
                    $log.warn('Jwt is not valid on this request, log them out');
                    //TODO try harder to get log in info
                    AuthService.logout(true);
                }

                return $q.reject(response);
            }
        };
    }

    $httpProvider.interceptors.push(tokenInterceptor);
}