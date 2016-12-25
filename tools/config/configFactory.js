/**
 * Created by ianpfeffer on 9/26/15.
 */
var _ = require('lodash');
var all = require('./all');

var DEFAULT = 'preferences';
var DEV = 'dev_preferences';
var staticConfig = null;


var init = function(env) {
    var environment = DEFAULT;
    if (env === 'dev') {
        environment = DEV;
    }

    try {
        var preferences = require('../config/' + environment);
    } catch (e) {
        console.log('Could not find ' + environment + ' Using default instead');
        var preferences = require('../config/' + DEFAULT);
    }

    staticConfig = _.extend({}, all, preferences);
    return staticConfig;
};

var getConfig = function(env) {
    if (staticConfig) {
        return staticConfig;
    } else {
        if(env) {
            return init(env);
        } else {
            return init(DEFAULT)
        }
    }
};

module.exports = {
    getConfig: getConfig
};