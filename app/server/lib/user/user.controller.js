/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const bcrypt = require('bcrypt-as-promised');
const SALT_WORK_FACTOR = 10;
const log = require('../log/log');

/**
 * Proxy function for users Schema
 * @param next
 * @returns {*}
 */
function schemaHashPassword(next) {
    const user = this;
    if(!user.isModified('password')) return next();

    return hashPassword(user.password)
        .then((hash) => user.password = hash)
        .then(next);
}

/**
 * uses bcrypt to hash password
 * @param password
 * @returns {*}
 */
function hashPassword(password) {
    return bcrypt.genSalt(SALT_WORK_FACTOR)
        .then((salt) => bcrypt.hash(password, salt))
        .catch(log.error)
}


/**
 * Schema proxy to compare password
 * @param canidate
 * @returns {*}
 */
function schemaComparePassword(canidate) {
    const user = this;

    return comparePassword(canidate, user.password)
}

/**
 * compares a password
 * @param canidate
 * @param hash
 * @returns {*}
 */
function comparePassword(canidate, hash) {
    return bcrypt.compare(canidate, hash)
}

function invalidPassword(val) {
    log.error(val)
}

/**
 * Middleware function for toJson
 * @returns {*}
 */
function removePassword() {
    let user = this.toObject();
    delete user.password;

    return user;
}

module.exports = {
    schemaHashPassword,
    hashPassword,
    comparePassword,
    schemaComparePassword,
    removePassword
};