/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ROLES = [
    'admin',
    'user'
];
const ROLE_DEFAULT = 'user';

const user = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ROLES, default: ROLE_DEFAULT}
}, {timestamps: true});

module.exports = user;