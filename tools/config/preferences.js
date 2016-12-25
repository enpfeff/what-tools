/**
 * Created by ianpfeffer on 9/22/15.
 */
module.exports = {
    // Directory where files are downloaded to
    tvStagingDirectory: '/drives/eve/stagedTv',

    // Directory where the files should go
    tvDestDirectory: '/drives/eve/tv',

    // where should we log use full paths
    loggingFile: '/opt/what-tools/logs/log.txt',

    // should we symlink - false or move - true
    move: 'false',

    // if this is set we'll send completes via prowl
    PROWL_API_KEY: process.env.PROWL_API_KEY || '',

    // How the Tv shows will be moved or symlinked into the tvDestDirectory
    //
    // %s - season #
    // %e - episode number
    // %o - original filename
    // %n - series name
    directoryStructure: '/%n/Season %s/%o',
    directoryStructureSeason: '/%n/Season %s',

    plex : {
        //plex url
        PLEX_URL: '192.168.1.5',
        user: '',
        password: ''
    }
};