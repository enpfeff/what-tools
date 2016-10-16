/**
 * @module Index
 * @author Ian Pfeffer
 * @copyright Copyright (c) 2013-2016 NETSCOUT
 */

'use strict';

const express = require('express');
const indexRouter = express.Router();
indexRouter.get('*', renderIndex);

function renderIndex(req, res, next) {
    // Renders the 'index' view we've registered elsewhere
    res.render('index', {});
    next();
}


module.exports = indexRouter;