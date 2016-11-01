/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";
const uuid = require('node-uuid');
const C = require('../constant/constant.service')();
const P = require('bluebird');
const HttpErrors = require('../httpErrors/httpErrors');
const nodeJwt = P.promisifyAll(require('jsonwebtoken'));
const moment = require('moment');
const _ = require('lodash');
const log = require('../log/log');

const MAX_EXP = 2592000; //30 days
const DEFAULT_EXP = 3600 * 24; //1 day
const accessTokenOptions = {algorithm: 'RS256', issuer: C.JWT_ISSUER};

/**
 * helper function gets experiation and defaults
 * @param expSeconds
 * @returns {*}
 */
function getExpiration(expSeconds) {
    if (_.isUndefined(expSeconds) || !_.isFinite(expSeconds) || expSeconds > MAX_EXP) {
        expSeconds = DEFAULT_EXP;
    }
    return moment().add(expSeconds, 'seconds').valueOf();
}

/**
 * creates the jwt object and signs it
 * @param claims
 * @param experiation
 * @returns {*}
 */
function createJwt(claims, experiation) {
    const accessTokenPrivateKey = new Buffer(C.JWT_PRIVATE_KEY, 'base64');

    if(!claims) return null;

    const baseJwt = {
        exp: getExpiration(experiation),
        iat: moment().unix().toString(),
        jti: uuid.v4()
    };

    const jwtObj = _.extend({}, baseJwt, claims);

    try {
        const signedJwt = nodeJwt.sign(jwtObj, accessTokenPrivateKey, accessTokenOptions);
        log.info("Signed JWT for user: " + claims.sub);
        return signedJwt;
    } catch (e) {
        log.warn('Problem signing JWT (did you set TOKEN_PUBLIC_KEY/TOKEN_PRIVATE_KEY ?) - message: ' + e.message);
        throw new HttpErrors.HttpInternalServerError();
    }
}

function decodeToken(jwt) {
    const accessTokenPublicKey = new Buffer(C.JWT_PUBLIC_KEY, 'base64');
    return nodeJwt.verifyAsync(jwt, accessTokenPublicKey, accessTokenOptions);
}

module.exports = {
    createJwt,
    decodeToken
};