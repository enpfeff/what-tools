/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const mongo = require('../lib/mongoose/mongo');
const User = require('../lib/user/user.model');
const P = require('bluebird');
const _ = require('lodash');
const isTrueParam = (x) => _.isString(x) ? (x === 'true') : !!x;
const CLI = isTrueParam(process.env.CLI);
const datas = require('./data/identity');
const log = require('../lib/log/log');

function identity() {
    let userPromises = _.map(datas, upsertUser);
    return P.all(userPromises);
}

function upsertUser(user) {
    return User.findOne({email: user.email})
        .then(aUser => {
            if(!_.isEmpty(aUser)) return log.warn(`user: ${user.email} already exists`);
            return new User(user).save().then(() => log.info(`created user: ${user.email}`));
        });
}

const bootstrap = () => identity();
module.exports = bootstrap;