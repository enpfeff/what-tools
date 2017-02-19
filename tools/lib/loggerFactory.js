/**
 * Created by ianpfeffer on 9/23/15.
 */
var winston = require('winston');
var fs = require('fs');
var config = require('../config/configFactory').getConfig();
var mkdir = require('mkdirp');
var path = require('path');
var touch = require('touch');

let staticLogger = null;

init();


function init() {
    // create the logging path if not there
    mkdir.sync(path.dirname(config.loggingFile));
    if (!fs.existsSync(config.loggingFile)) touch.sync(config.loggingFile);
    let logger = null;

    try {
        logger = new (winston.Logger)({
            transports: [
                new (winston.transports.Console)(),
                new (winston.transports.File)({
                    stream: fs.createWriteStream(config.loggingFile, {flags: 'a'})
                })
            ]
        });
    } catch(e) {
        console.log("error creating logger", e);
    }

    if (config.PROWL_API_KEY !== '') logger.prowl = new require('node-prowl')(config.PROWL_API_KEY);

    staticLogger = logger;
    return logger
}

function getLogger() {
    if (staticLogger) return staticLogger;
    return init();
}

module.exports = {
    getLogger: getLogger
};
