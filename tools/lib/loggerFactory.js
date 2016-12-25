/**
 * Created by ianpfeffer on 9/23/15.
 */
var winston = require('winston');
var fs = require('fs');
var config = require('../config/configFactory').getConfig();
var mkdir = require('mkdirp');
var path = require('path');
var touch = require('touch');

// Singleton
var staticLogger = null;
init();

function init() {
    // create the logging path if not there
    mkdir.sync(path.dirname(config.loggingFile));

    // touch a log file
    if (!fs.existsSync(config.loggingFile)) touch.sync(config.loggingFile);

    try {
        var logger = new (winston.Logger)({
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

    var prowl = null;
    if (config.PROWL_API_KEY !== '') {
        var Prowl = require('node-prowl');
        prowl = new Prowl(config.PROWL_API_KEY);
        logger.prowl = prowl;
    }

    staticLogger = logger;

    return logger
}

var getLogger = function() {
    if (staticLogger) {
        return staticLogger;
    } else {
        //logger isnt created lets do that
        return init();
    }
};

module.exports = {
    getLogger: getLogger
};
