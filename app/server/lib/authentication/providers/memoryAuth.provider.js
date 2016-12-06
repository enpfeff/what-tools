/**
 * @module what-tools
 * @since 12/6/16
 * @author Ian Pfeffer
 */
"use strict";
const _ = require('lodash');
const moment = require('moment');
const HttpErrors = require('../../httpErrors/httpErrors');

let revokeHash = {};

function revoke(id) {
    if(_.isUndefined(revokeHash)) revokeHash = {};
    revokeHash[id] = moment().unix().toString();
    return true;
}

function checkRevoke(user, jwt) {
    if (!user) throw new HttpErrors.HttpBadRequestError("no user in the db for given id");

    // nothing in the hash
    if(_.isUndefined(revokeHash) || _.isEmpty(revokeHash)) return user;

    const timestamp = revokeHash[user._id.toString()];
    if(jwt.iat < timestamp) throw new HttpErrors.HttpUnauthorizedError('jwt revoked');

    return user;
}

module.exports = {
    revoke,
    checkRevoke
};