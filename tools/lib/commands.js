/**
 * Created by ianpfeffer on 9/22/15.
 */
var fs = require('fs');
var logger = require('./loggerFactory').getLogger();

var move = function(src, dest) {

};

var symlink = function(src, dest) {
    logger.info("commands#symlink: called with src: " + src + " and dest: " + dest);
    try {
        fs.symlinkSync(src, dest);
        return true;
    } catch (e) {
        logger.error("commands#symlink:  It Already Exists");
        return false;
    }
};

module.exports = {
    move: move,
    symlink: symlink
};