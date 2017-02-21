/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const VALID_ENV = ['production', 'development'];
const _ = require('lodash');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const logger = require('morgan');
const expressCdn = require('express-cdn');
const constantService = require('../lib/constant/constant.service');
const routes = require('../lib/app.routes');

const UI_DIST = path.normalize(__dirname + '/../../ui/dist');
const VIEWS_DIR = path.normalize(__dirname + '/../views');

function init() {
    let app = express();

    // determine which state to load the ipm-bind-service in
    const NODE_ENV = determineNodeEnv();
    const C = constantService.init();
    constantService.add({NODE_ENV});

    app.use(logger('dev'));
    app.use(bodyParser.json({limit: '16mb'}));
    app.use(bodyParser.raw({type: 'application/octet-stream', limit: '16mb'}));
    app.use(bodyParser.text({limit: '16mb'}));
    app.use(bodyParser.urlencoded({ extended: true }));

    const CDN = expressCdn(app, cdnOptions(false, C));
    app.locals.CDN = CDN();

    // things that apply to all routes
    if (C.COMPRESSION_ENABLED) app.use(compression());
    app.use(allowCrossDomain);
    app.use(noCache);

    // view engine setup
    app.set('view engine', 'ejs');
    app.set('views', VIEWS_DIR);

    // Serve up the UI's Assets so we can go get them
    app.use(express.static(UI_DIST));

    app.use(routes());

    return app;
}

function determineNodeEnv() {
    let NODE_ENV = process.env.NODE_ENV || 'development';
    if(!_.includes(VALID_ENV, NODE_ENV))  {
        log.error(`Unknown Environment: ${NODE_ENV} using development`);
        NODE_ENV = process.env.NODE_ENV = 'development';
    }

    return NODE_ENV;
}

function cdnOptions(isProd = false, C) {
    const options = {
        publicDir: UI_DIST,
        viewsDir: VIEWS_DIR,
        domain: 'cdn.your-domain.com',
        bucket: 'bucket-name',
        endpoint: 'bucket-name.s3.amazonaws.com', // optional
        key: 'amazon-s3-key',
        secret: 'amazon-s3-secret',
        hostname: 'localhost',
        port: C.SSL ? C.SSL_PORT : C.PORT,
        ssl: C.SSL,
        production: isProd
    };

    return options;
}

function noCache(req, res, next) {

    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
}

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, ngp-authorization, Content-Length, X-Requested-With');

    if ('OPTIONS' !== req.method) return next();

    // Intercept OPTIONS method
    res.status(200);
    return res.send();
}

module.exports = init;