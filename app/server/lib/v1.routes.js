/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const PromiseRouter = require('express-promise-router');

function init() {
    let router = PromiseRouter();
    let v1Router = PromiseRouter();
    let libRouter = PromiseRouter();


    libRouter.use('/version', require('./version/version.routes'));
    libRouter.use('/user', require('./user/user.routes'));

    v1Router.use(libRouter);
    v1Router.use('*', (req, res) => {
        return res.status(404).send();
    });

    // routes start looking like '/prefix/v1/...'
    return router.use(v1Router);
}

module.exports = init;