/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const User = require('../user/user.model');
const HttpErrors = require('../httpErrors/httpErrors');
const jwtService = require('./jwt.service');
const ObjectID = require('mongodb').ObjectID;
const _ = require('lodash');
const providerFactory = require('./providers/provider.factory');
const log = require('../log/log');

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
            return providerFactory().revoke(id);
        })
        .then(() => res.sendStatus(200));

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