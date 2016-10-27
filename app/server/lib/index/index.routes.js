/**
 * @module Index
 * @author Ian Pfeffer
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