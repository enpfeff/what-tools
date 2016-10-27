/**
 * @module what-tools
 * @since 10/27/16
 * @author Ian Pfeffer
 * @copyright Copyright (c) 2016 NETSCOUT
 */
"use strict";

const Router = require('express-promise-router');
const crudFns = require('./crud.controller').CRUD_FNS;
const _ = require('lodash');
const log = require('../log/log');
const HttpErrors = require('../httpErrors/httpErrors');

function createRoutes(model) {
    let router = Router();

    _.each(crudFns, (crudRoute, key) => {
        if(!crudRoute.method) crudRoute.method = 'get';
        if(!crudRoute.path) crudRoute.path = '/';

        router[crudRoute.method](crudRoute.path, composeController(model, crudRoute))
    });

    return router;
}

function composeController(model, crudRoute) {

    return function(req, res) {
        const params = composeParams(req);
        const body = composeBody(req);

        return crudRoute.func(model, body, params)
            .then((result) => res.json(result))
            .catch((err) => HttpErrors.HttpErrorHandler(err, req, res));
    }
}

function  composeParams(req) {
    if(req.params._id) req.params.id = req.params._id;

    return req.params;
}

function composeBody(req) {
    return req.body;
}


module.exports = createRoutes;