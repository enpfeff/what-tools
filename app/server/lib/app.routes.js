/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const PromiseRouter = require('express-promise-router');
const v1Router = require('./v1.routes');
const IndexRouter = require('./index/index.routes');
const constantService = require('./constant/constant.service');
const C = constantService();
const _ = require('lodash');
const authMiddleware = require('./authentication/authentication.middleware');

function init() {
    let appRouter = PromiseRouter();

    let url = '/v1';
    if(!_.isEmpty(C.URL_PREFIX)) url = `/${C.URL_PREFIX}/v1`;

    // init the routes this has to come last
    appRouter.use(url, authMiddleware, v1Router());

    appRouter.use('/auth', require('./authentication/authentication.routes'));

    // index routes
    appRouter.use('/', IndexRouter);

    return appRouter;
}

module.exports = init;
