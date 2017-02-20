/**
 * Created by ianpfeffer on 9/26/15.
 */
module.exports = {
    // Directory where files are downloaded to
    tvStagingDirectory: '/Users/enpfeff/code/what-tools/out/stage',

    // Directory where the files should go
    tvDestDirectory: '/Users/enpfeff/code/what-tools/out/dest',

    // where should we log use full paths
    loggingFile: '/Users/enpfeff/code/what-tools/out/log.txt',

    // should we symlink - false or move - true
    move: 'false',

    // if this is set we'll send completes via prowl
    PROWL_API_KEY: process.env.PROWL_API_KEY || '09152be5ee79d2b3b48744635dd8757650c05566',

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
    },

    mongodb: {
        user: 'enpfeff',
        pass: 're86uvin',
        host: 'ds039484.mongolab.com',
        port: '39484',
        name: 'what-tools-dev'
    }
};