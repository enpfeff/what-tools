/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 * @copyright Copyright (c) 2016 NETSCOUT
 */
"use strict";

const User = require('./user.model');
const crudRoutes = require('../crud/crud.routes');

module.exports = crudRoutes(User);