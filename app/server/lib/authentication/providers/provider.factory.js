/**
 * @module what-tools
 * @since 12/6/16
 * @author Ian Pfeffer
 */
"use strict";

const C = require('../../constant/constant.service')();
const _ = require('lodash');
let provider = null;

/**
 * Function that determines the authorization provider
 * @returns a authorization provider
 */
function getProvider() {
    if(!_.isNull(provider)) return provider;

    // TODO could be worked out if we can talk to redis via the redis URL then use redis
    if(!_.isUndefined(C.AUTH_PROVIDER) && C.AUTH_PROVIDER === 'redis') {
        provider = require('./redisAuth.provider');
    } else {
        provider = require('./memoryAuth.provider');
    }

    return provider;
}

module.exports = getProvider;

