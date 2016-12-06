/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";
const _ = require('lodash');
const webpack = require('webpack');

// loaders not necessarly used within context but needed
const ngCacheLoader = require('ng-cache-loader');
const scssLoader = require('sass-loader');
const cssLoader = require('css-loader');
const styleLoader = require('style-loader');
const postcssLoader = require('postcss-loader');
const exportsLoader = require('exports-loader');
const autoPrefixer = require('autoprefixer');
const jsonImporter = require('node-sass-json-importer');

function webpackConfig(prod, watch = false) {


    let config = {
        // creates source maps
        devtool: "eval",

        // build output
        stats: {
            colors: true,
        },
        output: {
            filename: 'bundle.js',
            publicPath: 'http://localhost:3001/'
        },
        watch: watch,

        module: {

            loaders: [{
                test: /\.js$/,
                loaders: ['ng-annotate', 'nginject?deprecate', "babel-loader?presets[]=es2015,cacheDirectory"]
            }, {
                test: /\.html$/,
                exclude: /node_modules/,
                loaders: ["ng-cache"]
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: getScssLoaders(prod)
            }, {
                loader: 'exports?window.angular',
                test: require.resolve('angular')
            }],

        },

        plugins: [
            // Sets global variables
            new webpack.ProvidePlugin({
                _: 'lodash',
                angular: 'angular'
            }),
        ],

        sassLoader: {
            importer: jsonImporter
        },

        postcss: function() {
            return [ autoPrefixer({ browsers: ['last 2 versions'] }) ];
        }
    };

    if(prod) return productionConfig(config);

    return config;
}

/**
 * creates production output
 * @param config
 * @returns {*}
 */
function productionConfig(config) {
    const OMIT = ['devtool', 'watch', 'output.publicPath'];

    return _.omit(config, OMIT);
}

/**
 * gets the loaders for scss for webpack
 * @param prod
 * @returns {[string,string,string]}
 */
function getScssLoaders(prod) {
    let scssLoaders = ['css', 'postcss', 'sass'];
    if (!prod) scssLoaders = _.map(scssLoaders, item => item += '?sourceMap');
    scssLoaders.unshift('style');

    return scssLoaders;
}

module.exports = webpackConfig;