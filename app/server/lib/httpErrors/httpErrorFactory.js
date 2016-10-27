/**
 * @module what-tools
 * @since 10/27/16
 * @author Ian Pfeffer
 */
"use strict";

const _ = require('lodash');

/**
 * Produce an error object with HTTP info.
 * @param name
 * @param defaultMessage
 * @param httpCode
 */
function httpErrorGenerator(name, defaultMessage, httpCode) {

    // Dynamically produce an HttpXxxxError, inheriting from Error
    function GeneratedHttpError(err) {
        Error.call(this, err);

        this.name = name;
        this.httpCode = httpCode;

        if (!_.isObject(err)) {
            this.message = err || defaultMessage;
        } else {
            this.message = defaultMessage;
            this.details = err;
        }
        this.stack = (new Error()).stack;
    }

    GeneratedHttpError.prototype = Object.create(Error.prototype);
    return GeneratedHttpError;
}


module.exports = httpErrorGenerator;