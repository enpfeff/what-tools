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
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
}, {timestamps: true});

module.exports = user;