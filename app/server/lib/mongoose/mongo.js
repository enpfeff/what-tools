/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 * @copyright Copyright (c) 2016 NETSCOUT
 */
"use strict";

const C = require('../constant/constant.service')();
const P = require('bluebird');
const _ = require('lodash');
const mongoose = require('mongoose');
const log = require('../log/log');

mongoose.Promise = P;

let connected = false;

const mongooseConnectionoOpts = {
    server: {
        sslValidate: false,
        poolSize: C.MONGO_POOL_SIZE
    },
};


function init(mongoUrl) {
    // for child processes to log
    let logger = log;
    const MONGO_URL = _.isUndefined(mongoUrl) ? C.MONGO_URL : mongoUrl;

    return new P((resolve, reject) => {
        if (connected) return resolve(); // In case this is called more than once

        connected = true;
        logger.info(`[Mongoose] Connecting to ${MONGO_URL}`);

        mongoose.connect(MONGO_URL, mongooseConnectionoOpts, function (e) {
            if (e) {
                logger.error(`[Mongoose] error on mongoose connection ${e}`);
                return reject();
            }
            logger.info(`[Mongoose] Mongoose connected`);
            return resolve();
        });

        mongoose.connection.on('error', function (e) {
            logger.error(`[Mongoose] error from mongoose connection ${e}`);
        });

    });
}

module.exports = init;

