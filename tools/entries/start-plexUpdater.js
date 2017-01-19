/**
 * Created by ianpfeffer on 9/24/15.
 */
const args = require('minimist')(process.argv.slice(2));
const _ = require('lodash');

let dev = false;
//check arguments
if ((args.d) || (args.dev)) {
    // have to use console here as the logger hasnt been initialized
    console.log("Dev Environment Set");
    dev = true;
}

const configFactory = require('../config/configFactory');
const config = dev
    ? configFactory.getConfig('dev')
    : configFactory.getConfig();


const plex = require('../lib/plexUpdater');
const logger = require('../lib/loggerFactory').getLogger();

//check arguments
if ((args.h) || (args.help)) {
    // they just want help
    logger.info(config.help.plexUpdater);
    process.exit(0);
}


if (args._.length !== 1) {
    logger.error(config.help.plexUpdater);
    return process.exit(1);
}

return plex.findLibraries(args._[0])
    .then((dirs) => {
        if (_.isEmpty(dirs.length)) return;
        return plex.refreshLibraries(_.map(dirs, 'key'));
    });

