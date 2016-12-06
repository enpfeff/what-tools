/**
 * @module what-tools
 * @since 12/6/16
 * @author Ian Pfeffer
 */
"use strict";

const redis = require('../../redis/redisClient');
const C = require('../../constant/constant.service')();
const _ = require('lodash');
const moment = require('moment');
const HttpErrors = require('../../httpErrors/httpErrors');
const REDIS_REVOKE_KEY = C.REDIS_REVOKE_KEY;

function revoke(id) {
    return redis().then(db => {
        return db.hgetall(REDIS_REVOKE_KEY)
            .then(hash => {
                if(_.isNull(hash)) hash = {};
                hash[id] = moment().unix().toString();
                return db.hmset(REDIS_REVOKE_KEY, hash);
            });
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

module.exports = {
    revoke,
    checkRevoke
};