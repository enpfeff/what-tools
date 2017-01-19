/**
 * Created by ianpfeffer on 9/23/15.
 */
const PlexAPI = require("plex-api");
const config = require('../config/configFactory').getConfig();
const credentials = require('plex-api-credentials');
const _ = require('lodash');
const P = require('bluebird');
const logger = require('./loggerFactory').getLogger();

let client = null;

// ----------------------------------------
//  Init
// ----------------------------------------

if (config.plex) {
    const userAndPass = credentials({ username: config.plex.user, password: config.plex.password });
    userAndPass.on('token', (token) => logger.info("plexUpdater: found token " + token));
    client = new PlexAPI({ hostname: config.plex.PLEX_URL, authenticator: userAndPass });
} else {
    logger.error('plexUpdater: Plex config is not set');
}

// ----------------------------------------
// Privates (tee hee)
// ----------------------------------------
function findLibraries(type) {
    logger.info('plexUpdater#findLibraries: find libraries called');
    return client.find("/library/sections", {type: type});
}

function refreshLibrary(key) {
    return client.perform(`/library/sections/${key}/refresh`)
        .then(() => logger.info(`plexUpdater#refreshLibraries: refreshed library key: ${key}`))
}

function refreshLibraries(keys) {
    if (keys.length === 0)return logger.info('plexUpdater#refreshLibraries: no keys to refresh return');

    logger.info('plexUpdater#refreshLibraries: refreshing these keys ' + keys);
    return P.all(_.map(keys, refreshLibrary))
        .catch(logger.error);

}


module.exports = {
    findLibraries: findLibraries,
    refreshLibraries: refreshLibraries
};