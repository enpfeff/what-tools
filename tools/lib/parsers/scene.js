/**
 * Created by ianpfeffer on 9/23/15.
 */

// Better.Call.Saul.S01E01.720p.HDTV.x264-KILLERS.mkv
// Limitless.S01E01.720p.HDTV.X264 DIMENSION.mkv
// South.Park.S19E01.720p.HDTV.x264 KILLERS.mkv
var utils = require('../utils');
var _ = require('lodash');
var logger = require('../loggerFactory').getLogger();

var REGEXES = {
    EPISODE_AND_SEASON : '(S[0-9]{1,2}E[0-9]{1,2}|[0-9]+x[0-1]{1,2})',
    UNDERSCORES : '_',
    SEASON_NUMBER : '[s]([0-9]{1,2})|([0-9]{1,2})[x,e]',
    JUST_SEASON: '[s]([0-9]{1,2})|([0-9]{1,2})',
    EPISODE_NUMBER : '[s][0-9]{1,2}[e]([0-9]{1,2})|[0-9]{1,2}[x,e]([0-9]{1,2})'
};

var parse = function(fileName) {
    logger.info("scene#parse: called with name: " + fileName);
    var ret = {};
    ret.fileName = fileName;
    var peices = fileName.split('.');
    var seasonPosition = null;
    //go through all the peices to get info
    _.forEach(peices, function(peice, index) {
        // capture the episode and the season first
        // two standard patterns right now S01E04 or 1x14 <-- for some stupid ass reason
        var episodeReg = new RegExp(REGEXES.EPISODE_NUMBER, 'ig');
        var seasonReg = new RegExp(REGEXES.SEASON_NUMBER, 'ig');
        var episodeSeasonReg = new RegExp(REGEXES.EPISODE_AND_SEASON, 'ig');
        var justSeason = new RegExp(REGEXES.JUST_SEASON, 'ig');

        if (episodeSeasonReg.test(peice)) {
            seasonPosition = index;
            ret.episode = parseInt(utils.getMatch(peice, episodeReg), 10);
            ret.season = parseInt(utils.getMatch(peice, seasonReg), 10);
            ret.isSeason = false;
            logger.info("scene#parse: matched regex at " + seasonPosition + " for episode" + ret.episode + ", season " + ret.season);
        } else if (seasonReg.test(peice)) {
            seasonPosition = index;
            logger.info('We have a season');
            ret.episode = '';
            ret.season = parseInt(utils.getMatch(peice, justSeason), 10);
            ret.isSeason = true;
            logger.info("scene#parse: Season matched regex at " + seasonPosition + ", season " + ret.season);
        }
    });

    // Get Series Name
    //everything ahead of the Season and Episode is the Name of the Series
    if (seasonPosition) {
        var name = '';
        for (var i = 0; i < seasonPosition; i++) {
            name += peices[i];
            name += ' ';
        }
        var underReg = new RegExp(REGEXES.UNDERSCORES, 'g');
        if (underReg.test(name)) {
            name = name.replace(underReg, ' ');
        }

        ret.seriesName = name.trim().toLowerCase();
        logger.info('scene#parse: parsed series Name: ' + ret.seriesName);
    }

    logger.info('scene#parse: returning ' + ret);
    return ret;
};


module.exports = {
    parse: parse
};