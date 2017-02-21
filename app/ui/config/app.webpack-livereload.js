/**
 * Created by enpfeff on 2/20/17.
 */
const webpackInit = require('./webpack.config');
const LiveReloadPlugin = require('webpack-livereload-plugin');
let config = webpackInit(false, '../dist/vendor-manifest.json');

config.plugins.push(new LiveReloadPlugin());
module.exports = config;