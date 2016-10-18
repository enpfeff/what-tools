/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 * @copyright Copyright (c) 2016 NETSCOUT
 */
"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
}, {timestamps: true});

module.exports = user;