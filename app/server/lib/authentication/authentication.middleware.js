/**
 * @module what-tools
 * @since 10/27/16
 * @author Ian Pfeffer
 */
"use strict";

const P = require('bluebird');
const User = require('../user/user.model');
const AUTH_HEADER = 'what-auth';
const HttpErrors = require('../httpErrors/httpErrors');
const jwtService = require('./jwt.service');
const providerFactory = require('./providers/provider.factory');
const ObjectId = require('mongodb').ObjectId;

function authenticate(req, res, next) {
    return validateJwt(req)
        .then((user) => req.user = user)
        .then(() => P.resolve('next'))
        .catch((err) => HttpErrors.HttpErrorHandler(err, req, res));
}


function validateJwt(req) {
    return getAuthHeader(req)
        .then(jwtService.decodeToken)
        .then((jwt) => {
            return getUserFromJwt(jwt)
                .then((user) => providerFactory().checkRevoke(user, jwt))
        })
        .catch(() => {
            throw new HttpErrors.HttpUnauthorizedError();
        });
}


function getUserFromJwt(jwtObj) {
    const userId = jwtObj.sub;
    if(!userId) throw new HttpErrors.HttpInternalServerError("no sub on jwt");

    return User.findById(new ObjectId(userId));
}

/**
 * auth header should look like HEADER_NAME: {jwt}
 * @param req
 */
function getAuthHeader(req) {
    let authHeader = req.header(AUTH_HEADER);
    if(!authHeader) return P.reject();

    return P.resolve(authHeader);
}

module.exports = authenticate;