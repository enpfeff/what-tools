/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const User = require('../user/user.model');
const HttpErrors = require('../httpErrors/httpErrors');
const bcrypt = require('bcrypt');
const jwtService = require('./jwt.service');
const redis = require('../redis/redisClient');
const moment = require('moment');
const ObjectID = require('mongodb').ObjectID;
const C = require('../constant/constant.service')();

const _ = require('lodash');
const log = require('../log/log');
const REDIS_REVOKE_KEY = C.REDIS_REVOKE_KEY;

 /**
 * first class citizen login route
 * @param req
 * @param res
 * @returns {*}
 */
function login(req, res) {
    const { email, password } = req.body;
    return User.findOne({email: email})
        .then((user) => {
            return checkPassword(user, password)
                .then(createClaims)
                .then(jwtService.createJwt)
                .then((jwt) => createRes(user, jwt))
                .then((response) => res.json(response))
        })
        .catch((err) => HttpErrors.HttpErrorHandler(err, req, res));
}

/**
 * expecting user id in the body adds id with a timestamp to a redis cache
 * this will get removed on login again
 * @param req
 * @param res
 */
function logout(req, res) {
    const {id} = req.body;
    if(!id) return res.sendStatus(400);

    return User.findOne({_id: new ObjectID(id)})
        .then(user => {
            if(!user) return res.sendStatus(404);
            return revokeJwt(id)
        })
        .then(() => res.sendStatus(200));

}

function revokeJwt(id) {
    return redis().then(db => {
        return db.hgetall(REDIS_REVOKE_KEY)
            .then(hash => {
                if(_.isNull(hash)) hash = {};
                hash[id] = moment().unix().toString();
                return db.hmset(REDIS_REVOKE_KEY, hash);
            });
    });
}

/**
 * creates the response if all goes well
 * @param user
 * @param jwt
 * @returns {{user: *, jwt: *}}
 */
function createRes(user, jwt) {
    return {
        user: _.omit(user.toJSON(), ['password']),
        jwt
    }
}

/**
 * helper function to create jwt claims
 * @param user
 * @returns {{sub: *, res: string, role: (user.role|{type, required, enum, default})}}
 */
function createClaims(user) {
    return {
        sub: user._id,
        res: 'user',
        role: user.role
    }
}

/**
 * checks the password using user.method on schema
 * @param user
 * @param password
 * @returns {*}
 */
function checkPassword(user, password) {
    if (!user) throw new HttpErrors.HttpUnauthorizedError();

    return user.comparePassword(password)
        .then(() => user)
        .catch(invalidPassword)
}

/**
 * catch case for invalid password
 */
function invalidPassword(err) {
    log.warn(err);
    throw new HttpErrors.HttpUnauthorizedError();
}

module.exports = {
    login,
    logout
};