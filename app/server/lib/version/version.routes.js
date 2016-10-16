/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 * @copyright Copyright (c) 2016 NETSCOUT
 */
"use strict";

const PromiseRouter = require('express-promise-router');
const pkg = require('../../package.json');
let versionRouter = PromiseRouter();
const log = require('../log/log');

versionRouter.get('/', returnVersion);

function returnVersion(req, res) {
    let version;

    try {
        version = require('../../version.json');
    } catch (e) {
        version = {version: pkg.version};
        log.error('No version.json file found', e);
    }

    return res.json(version).send();
}

module.exports = versionRouter;
module.exports.private = returnVersion;