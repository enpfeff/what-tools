/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const User = require('./user.model');
const crudRoutes = require('../crud/crud.routes');

module.exports = crudRoutes(User);