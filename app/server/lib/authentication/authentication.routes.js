/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";
const Router = require('express-promise-router');
const authController = require('./authentication.controller');

let router = Router();
router.post('/login', authController.login);
router.post('/logout', authController.logout);

module.exports = router;