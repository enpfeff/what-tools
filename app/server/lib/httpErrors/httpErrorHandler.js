/**
 * @module what-tools
 * @since 10/27/16
 * @author Ian Pfeffer
 * @copyright Copyright (c) 2016 NETSCOUT
 */
"use strict";

const log = require('../log/log');
const sprintf = require('sprintf');
const C = require('../constant/constant.service')();
const _ = require('lodash');

/**
 * Intended to be a 4 param Express Error handling middleware that consumes our standard HttpError objects.
 * @param err
 * @param req
 * @param res
 * @param next
 */
function httpErrorHandler(err, req, res) {
    const ERROR_FIELDS = (C.NODE_ENV === 'production') ? ['message', 'details'] : ['message', 'details', 'stack'];

    var code = err.httpCode || 500;
    log.warn(sprintf("Http Error Handler: code:%s, msg:%s, details:%s", code, err.message, err.details));
    log.info(sprintf("Http Error Handler: stack:%s", err.stack));

    return res.status(code).json(_.pick(err, ERROR_FIELDS));
}

module.exports = httpErrorHandler;