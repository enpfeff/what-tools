/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";

const usersSchema = require('./user.schema');
const mongoose = require('mongoose');
const controller = require('./user.controller');

const MODEL_NAME = 'User';
const COLLECTION_NAME = 'User';

usersSchema.pre('save', controller.schemaHashPassword);
usersSchema.methods.comparePassword = controller.schemaComparePassword;
usersSchema.methods.toJSON = controller.removePassword;

module.exports = mongoose.models[MODEL_NAME] || mongoose.model(MODEL_NAME, usersSchema, COLLECTION_NAME);