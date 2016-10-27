/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const mongo = require('../lib/mongoose/mongo');
const identity = require('./identity');
const _ = require('lodash');
const C = require('../lib/constant/constant.service').init();

const isTrueParam = (x) => _.isString(x) ? (x === 'true') : !!x;
const CLI = isTrueParam(process.env.CLI);

function bootstrap() {
    return mongo(C.MONGO_URL)
        .then(() => identity());
}

module.exports = bootstrap;
if(CLI) return bootstrap()
    .then(() => process.exit(0))
    .catch(e => log.error(e));

