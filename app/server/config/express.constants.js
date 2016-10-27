/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const _ = require('lodash');

function isTrueParam(x) {
    return _.isString(x) ? (x === 'true') : !!x;
}

module.exports = {
    PORT: process.env.PORT || 3001,
    COMPRESSION_ENABLED: isTrueParam(process.env.COMPRESSION_ENABLED),
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    SSL: isTrueParam(process.env.SSL),
    URL_PREFIX: process.env.URL_PREFIX || ''
};