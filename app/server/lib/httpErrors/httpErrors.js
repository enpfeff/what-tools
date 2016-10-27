/**
 * @module what-tools
 * @since 10/27/16
 * @author Ian Pfeffer
 * @copyright Copyright (c) 2016 NETSCOUT
 */
"use strict";

var httpErrorFactory = require('./httpErrorFactory');

module.exports = {
    HttpErrorHandler: require('./httpErrorHandler'),
    HttpBadRequestError: httpErrorFactory('HttpBadRequestError', 'Bad Request', 400),
    HttpUnauthorizedError: httpErrorFactory('HttpUnauthorizedError', 'Unauthorized', 401),
    HttpForbiddenError: httpErrorFactory('HttpForbiddenError', 'Forbidden', 403),
    HttpNotFoundError: httpErrorFactory('HttpNotFoundError', 'Not Found', 404),
    HttpInternalServerError: httpErrorFactory('HttpInternalServerError', 'Internal Server Error', 500),
    HttpNotImplementedError: httpErrorFactory('HttpNotImplementedError', 'NotImplemented', 501),
    HttpServiceUnavailable: httpErrorFactory('HttpServiceUnavailable', 'Unavailable', 503),
    HttpInsufficientStorageError: httpErrorFactory('HttpInsufficientStorageError', 'InsufficientStorage', 507)
};