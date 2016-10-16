/**
 * @summary Logger
 * @module Log
 * @memberof Utils
 * @since 2/12/16
 * @author Ross Nordstrom <ross.nordstrom@flukenetworks.com>/**
 * @copyright Copyright (c) 2016 NETSCOUT
 */

'use strict';

var _ = require('lodash');
var winston = require('winston');
var constants = require('../constant/constant.service')();

var loglevel = constants.LOG_LEVEL;
//By default we log to STDOUT (the Console)
var transports = [
    new (winston.transports.Console)({level: loglevel, colorize: true, timestamp: true})
];

if (constants.LOG_TO_FILE) {
    //If logging to file, don't also log to console.
    transports = [new (winston.transports.File)({
        level: loglevel,
        filename: constants.LOG_FILE,
        colorize: true,
        timestamp: true,
        maxsize: Math.pow(10, 8),            //100mb
        tailable: true,
        maxFiles: 100,
        json: false
    })];
}

var logger = new (winston.Logger)({
    transports: transports
});

// we need an access point for morgan (route logging)
logger.stream = {
    write: function (message, encoding) {
        logger.info(message);
    }
};


function log(level, message) {
    if (_.isUndefined(message)) {
        message = level;
        level = 'verbose';
    }

    logger.log(level, message);
}


module.exports = log;
module.exports.stream = logger.stream;

// I'm sick of doing "log('<VERBOSITY>', ...)", so let's add some method wrappers
module.exports.error = _.partial(log, 'error');
module.exports.warn = _.partial(log, 'warn');
module.exports.info = _.partial(log, 'info');
module.exports.verbose = _.partial(log, 'verbose');
module.exports.debug = _.partial(log, 'debug');
module.exports.trace = _.partial(log, 'debug');
module.exports.log = log;

module.exports.metric = (metric, value, units) => log('info', `[Metric] ${metric}=${value} (${units})`);
module.exports.metricVerbose = (metric, value, units) => log('verbose', `[Metric] ${metric}=${value} (${units})`);
