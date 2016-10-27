/**
 * @module what-tools
 * @since 10/27/16
 * @author Ian Pfeffer
 */
"use strict";
const HttpError = require('../httpErrors/httpErrors');

const CRUD_FNS = {
    get: {func: getById, path: '/:_id'},
    list: {func: getAll},
    remove: {func: remove, method: 'delete', path: '/:_id'},
    update: {func: update, method: 'put', path: '/:_id'},
    add: {func: add, method: 'post'}
};

function getById(model, body, params) {
    if(!params.id) throw new HttpError.HttpBadRequestError('must specify an id');

    return model.findById(params.id)
        .then(isPresent)
}

function getAll(model) {
    return model.find()
        .then(isPresent)
}

function remove(model, body, params) {
    if(!params.id) throw new HttpError.HttpBadRequestError('must specify an id');

    return model.findById(params.id)
        .then(isPresent)
        .then((doc) => doc.remove());
}

function update(model, body, params) {
    if(!params.id) throw new HttpError.HttpBadRequestError('must specify an id');
    if(!body) throw new HttpError.HttpBadRequestError('must specify an body');

    return model.update({_id: params.id}, body)
}

function add(model, body, params) {
    if(!body) throw new HttpError.HttpBadRequestError('must specify an body');

    return new model(body).save();
}



function isPresent(doc) {
    if (!doc) throw new HttpError.HttpNotFoundError('No Document found');
    return doc;
}

module.exports = {
    CRUD_FNS
};