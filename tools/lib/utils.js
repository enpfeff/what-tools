/**
 * Created by ianpfeffer on 9/22/15.
 */
var fs = require('fs');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var Error = require('./models/Error');
var logFactory = require('./loggerFactory');

var logger = logFactory.getLogger();

/**
 * Checks if file or directory exists
 * @param path - path of the directory or file
 * @param create - will create if it does not exist ASSUMES its a directory
 * @param cb - callback
 */
var exists = function (path, create) {
    var ret = fs.existsSync(path);
    logger.info("Utils#exists: path - " + path + ", exists - "+ret);
    if (!ret && create) {
        mkdirp.sync(path);
        logger.info("Utils#exists: created directory " + path);
    }
    return ret;
};


// will return the first capture group found
function getMatch(string, regex) {
    var ret = null;

    logger.info("utils#getMatch: name - " + string + ", regex used - " + regex);

    var matches = regex.exec(string);
    _.forEach(matches, function(match, index) {
        if (index !== 0) {
            if (match) {
                logger.info("utils#getMatch: found match - " + match);
                ret = match;
            }
        }
    });
    return ret;
};

function createMongoUrl(db) {
    return 'mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name;
};

var utils = {
    exists: exists,
    getMatch : getMatch,
    createMongoUrl: createMongoUrl
};

module.exports = utils;