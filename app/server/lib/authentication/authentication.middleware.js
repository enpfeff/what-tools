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
const redis = require('../redis/redisClient');
const ObjectId = require('mongodb').ObjectId;
const C = require('../constant/constant.service')();
const moment = require('moment');
const _ = require('lodash');

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
                .then((user) => checkRevoke(user, jwt))
        })
        .catch(() => {
            throw new HttpErrors.HttpUnauthorizedError();
        });
}

function checkRevoke(user, jwt) {
    if (!user) throw new HttpErrors.HttpBadRequestError("no user in the db for given id");
    return redis().then(db => {
        // check to see if the id has been revoked
        return db.hgetall(C.REDIS_REVOKE_KEY)
            .then(hash => {
                if(_.isNull(hash)) return user;

                // if the timestamp in redis is after the issue at timestamp in the jwt we're
                // trying to login with an old jwt, so we should kill it.
                const timestamp = hash[user._id.toString()];
                if(jwt.iat < timestamp) throw new HttpErrors.HttpUnauthorizedError('jwt revoked');

                return user;
            });
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