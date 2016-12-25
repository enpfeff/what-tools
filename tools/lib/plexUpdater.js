/**
 * Created by ianpfeffer on 9/23/15.
 */
var PlexAPI = require("plex-api");
var config = require('../config/configFactory').getConfig();
var credentials = require('plex-api-credentials');
var _ = require('lodash');
var logger = require('./loggerFactory').getLogger();


if (config.plex) {
    var userAndPass = credentials({
        username: config.plex.user,
        password: config.plex.password
    });

    userAndPass.on('token', function(token){
        logger.info("plexUpdater: found token " + token);
    });

    var client = new PlexAPI({
        hostname: config.plex.PLEX_URL,
        authenticator: userAndPass
    });
} else {
    logger.error('plexUpdater: Plex config is not set');
}



function findLibraries(type) {
    logger.info('plexUpdater#findLibraries: find libraries called');
    return client.find("/library/sections", {type: type});
}

function refreshLibraries(keys) {
    if (keys.length === 0){
        logger.info('plexUpdater#refreshLibraries: no keys to refresh return');
        return;
    }
    logger.info('plexUpdater#refreshLibraries: refreshing these keys ' + keys);
    _.forEach(keys, function(key) {
        client.perform("/library/sections/" + key + "/refresh").then(function () {
            logger.info("plexUpdater#refreshLibraries: refreshed library key " + key);
        }, function (err) {
            logger.error("plexUpdater#refreshLibraries: couldn't connect to plex");
        });
    });

}


module.exports = {
    findLibraries: findLibraries,
    refreshLibraries: refreshLibraries
};