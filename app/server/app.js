/**
 * @since 8/11/16
 * @author Ian Pfeffer
 */
"use strict";

const _ = require('lodash');
const fs = require('fs');
const chalk = require('chalk');
const expressConfig = require('./config/express');
const http = require('http');
const https = require('https');
const constantService = require('./lib/constant/constant.service');
const UTF8 = 'utf-8';
const log = require('./lib/log/log');
const mongo = require('./lib/mongoose/mongo');
const path = require('path');

let dieing = false;
const app = expressConfig();

process.on('SIGTERM', kill);
process.on('SIGINT', kill);

// constants are now populated
const c = constantService();

// connect to mongo and reference the server object for killing
let server;

return mongo().then(() => {
    createBanner(c);
    server = createServer(c);
    server = server.listen(c.SSL ? c.SSL_PORT: c.PORT);
});


function kill() {
    if(dieing) return;

    log.info('Server received termination interrupt');

    dieing = true;
    server.close();
    process.exit(0);
}

function createServer(c) {
    let server = http.createServer(app);
    if (c.SSL) {
        if (_.isUndefined(c.SSL_CREDENTIALS.KEY) || _.isUndefined(c.SSL_CREDENTIALS.CERT)) {
            log.error('Please supply a SSL certificate');
            process.exit(1);
        }

        let options;
        try {
            options = {
                key: fs.readFileSync(path.normalize(path.join(__dirname, c.SSL_CREDENTIALS.KEY)), UTF8),
                cert: fs.readFileSync(path.normalize(path.join(__dirname, c.SSL_CREDENTIALS.CERT)), UTF8)
            };
        } catch (e) {
            log.error(e);
            process.exit(1);
        }

        // Redirect from http port to https port
        http.createServer(function (req, res) {
            res.writeHead(301, { "Location": `https://${req.headers.host.replace(c.PORT, c.SSL_PORT)}${req.url}` });
            res.end();
        }).listen(c.PORT);

        server = https.createServer(options, app);
    }

    return server;
}

function createBanner(c) {
    log.info(chalk.green('==============================='));
    log.info(chalk.green('\t\tWhat-Tools'));
    log.info(chalk.green(''));
    log.info(chalk.green(`Environment:\t\t${c.NODE_ENV}`));
    log.info(chalk.green(`Port:\t\t\t\t${c.PORT}`));
    log.info(chalk.green(`SSL PORT:\t\t\t${c.SSL_PORT}`));
    log.info(chalk.green(`SSL:\t\t\t\t${c.SSL}`));
    if (!_.isEmpty(c.URL_PREFIX)) log.info(chalk.green(`Url Prefix:\t\t${c.URL_PREFIX}`));
    log.info(chalk.green(`Compression:\t\t${c.COMPRESSION_ENABLED}`));
    log.info(chalk.green('==============================='));
}
