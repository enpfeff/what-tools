/**
 * Created by ianpfeffer on 9/24/15.
 */
var args = require('minimist')(process.argv.slice(2));
var _ = require('lodash');

var dev = false;
//check arguments
if ((args.d) || (args.dev)) {
    // have to use console here as the logger hasnt been initialized
    console.log("Dev Environment Set");
    dev = true;
}
var config = dev ? require('../config/configFactory').getConfig('dev') : require('../config/configFactory').getConfig();

var plex = require('../lib/plexUpdater');
var logger = require('../lib/loggerFactory').getLogger();
//check arguments
if ((args.h) || (args.help)) {
    // they just want help
    logger.info(config.help.plexUpdater);
    process.exit(0);
}


if (args._.length === 1) {
    var type = args._[0];
    plex.findLibraries(type).then(function (directories) {
        if (directories.length > 0) {
            var keys = [];
            _.forEach(directories, function (dir) {
                keys.push(dir.key);
            });
            plex.refreshLibraries(keys);
        } else {
            logger.info("start-plexUpdater: no keys found exiting");
        }
    }, function () {
        logger.error("start-plexUpdater: there was an error in finding the libraries");
    });
} else {
    logger.error(config.help.plexUpdater);
    process.exit(1);
}