// ------------------------------------------------------------------------
// Setup
// ------------------------------------------------------------------------

"use strict";

const _ = require('lodash');
const args = require('minimist')(process.argv.slice(2));
const path = require('path');
const fs = require('fs');
const P = require('bluebird');

let dev = false;
//check arguments
if ((args.d) || (args.dev)) {
    // they just want help
    console.log("Dev Environment Set");
    dev = true;
}
const config = dev ? require('../config/configFactory').getConfig('dev') : require('../config/configFactory').getConfig();

const utils = require('../lib/utils');
const commands = require('../lib/commands');
const parser = require('../lib/parsers/scene');
const log = require('../lib/loggerFactory');
const plex = require('../lib/plexUpdater');
const Torrent = require('../lib/models/Torrent');
const logger = log.getLogger();

const tv = (!((args.m) || (args.movie)));
const movie = ((args.m) || (args.movie));

module.exports = {
    notify
};

// ------------------------------------------------------------------------
// Main
// ------------------------------------------------------------------------
return main()
    .then(processTorrent)
    .then(updatePlex)
    .then(notify)
    .catch((obj) => {
        logger.error(obj.msg);
        return process.exit(obj.code);
    });


// ------------------------------------------------------------------------
// Private Functions
// ------------------------------------------------------------------------

/**
 * Processes the torrent file
 * currently supports:
 *  - TV Single Episodes
 *  - TV Seasons
 *  - Movies
 * @returns {*}
 */
function processTorrent() {

    if(args._.length === 0) throw new Error({msg: config.help.processTv, code: 1});

    let srcFile = args._[0];
    if (!utils.exists(srcFile)) throw new Error({msg: `${srcFile} does not exist`, code: 1});

    if(tv) {
        const fileObject = parser.parse(path.basename(srcFile));
        return processTv(fileObject);
    }

    return srcFile;
}

/**
 * Processes the Tv file
 * @param fileObject
 * @returns {*}
 */
function processTv(fileObject) {
    if(fileObject.isSeason)  return processSeason(fileObject);

    let directoryStructure = config.directoryStructure;
    directoryStructure = directoryStructure.replace(/%n/, fileObject.seriesName);
    directoryStructure = directoryStructure.replace(/%s/, fileObject.season.toString());
    directoryStructure = directoryStructure.replace(/%o/, fileObject.fileName);

    utils.exists(config.tvDestDirectory + path.dirname(directoryStructure), true);

    const success = commands.symlink(fileObject.fileName, config.tvDestDirectory + directoryStructure);
    if (!success) throw new Error({ msg: "Error creating the symlink", code: 1});

    logger.info('symlink created: ' + config.tvDestDirectory + directoryStructure);

    return fileObject.fileName;
}

/**
 * processes the file if its a season
 * @param fileObject
 */
function processSeason(fileObject) {
    let directoryStructureSeason = config.directoryStructureSeason;
    directoryStructureSeason = directoryStructureSeason.replace(/%n/, fileObject.seriesName);
    directoryStructureSeason = directoryStructureSeason.replace(/%s/, fileObject.season);

    utils.exists(config.tvDestDirectory + directoryStructureSeason, true);
    const list = fs.readdirSync(fileObject.fileName);

    // for each file in the season create the symlink
    _.each(list, (file) => commands.symlink(fileObject.fileName + '/' + file,
        config.tvDestDirectory + directoryStructureSeason + '/' + file));

    return fileObject.fileName;
}

/**
 * makes sure we are good to go as far as directories existing
 */
function main() {
    return new P((resolve, reject) => {
        //1. check to see if destination directory exists and make it if not
        utils.exists(config.tvDestDirectory, true);

        //2. test to make sure the staging directory is there if not exit thats bad
        if (!utils.exists(config.tvStagingDirectory)) {
            return reject({msg: 'Staging directory does not exist', code: 1});
        }

        //check arguments
        if ((args.h) || (args.help)) {
            // they just want help
            logger.error(config.help.processTv);
            return reject({msg: config.help.processTv, code: 0});
        }

        return resolve();
    });
}

/**
 * notifies via an provider, in this case prowl
 */
function notify(srcFile) {
    if (!logger.prowl) logger.info("Prowl is not set up correctly");

    let prowl = logger.prowl;
    if(_.isUndefined(prowl) && !_.isEmpty(config.PROWL_API_KEY)) {
        // for some reason the logger didnt create the prowl notifier correctly lets try again
        logger.info(`API Key: ${config.PROWL_API_KEY}`);
        const Prowl = require('node-prowl');
        prowl = new Prowl(config.PROWL_API_KEY);

        if(_.isUndefined(prowl)) return logger.info("something is messed up in the prowl department");
    }

    logger.info("notifying via Prowl");
    let msg = path.basename(srcFile) + ' Successfully Downloaded';

    prowl.push(msg, 'What-Tools', {}, (err, remaining) => {
        if(err) prowlErrorHandler(err);
        return logger.info(`remaining prowls: ${remaining}`);
    });
}

function prowlErrorHandler(err) {
    logger.error(err);
    throw err;
}

/**
 * updates the plex libraries when something new has been added
 * @returns {Promise.<TResult>}
 */
function updatePlex(srcFile) {
    return plex.findLibraries(tv ? 'show' : 'movie')
        .then((directories) => plex.refreshLibraries(_.map(directories, 'key')))
        .then(() => srcFile);
}