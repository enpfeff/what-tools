/**
 * @module what-tools
 * @since 10/27/16
 * @author Ian Pfeffer
 */
"use strict";

const C = require('../constant/constant.service')();
const _ = require('lodash');
const P = require('bluebird');
const log = require('../log/log');
const createClient = require('then-redis').createClient;

function getClient() {
    let options = {
        host: C.REDIS_HOST,
        port: C.REDIS_PORT
    };

    if(!_.isUndefined(C.REDIS_PASS)) options = _.extend({}, options, {password: C.REDIS_PASS});

    return new P((res, rej) => {
        let db;
        try {
            db = createClient(options);
        } catch(e) {
            log.error('could not connect to redis, ' + e.message);
            return rej(e);
        }
        return res(db);
    });


}

module.exports = getClient;