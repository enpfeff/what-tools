/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const _ = require('lodash');

let constants = {};

function add(...optionsArgs) {
    if (!optionsArgs) return;
    _.each(optionsArgs, (options) => _.merge(constants, options));
}

function init() {
    // inject known files
    const CONSTANTS = [
        require('../../config/express.constants'),
        require('../mongoose/mongo.constants'),
        require('../authentication/authentication.constants'),
        require('../redis/redis.constants')
    ];

    add(...CONSTANTS);

    return constants;
}

const isDevelopment = () => constants.NODE_ENV === 'development';

module.exports = () => constants;
module.exports.add = add;
module.exports.init = init;
module.exports.isDevelopment = isDevelopment;