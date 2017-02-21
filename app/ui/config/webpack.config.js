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
const path = require('path');

function webpackConfig(prod = false, manifest) {


    let config = {
        // creates source maps
        devtool: "eval",

        // build output
        stats: {
            colors: true,
        },
        entry: {
            app: './app.js'
        },
        output: {
            path: path.resolve('./dist'),
            filename: 'bundle.js',
            publicPath: 'http://localhost:3001/'
        },

        resolve: {
            alias: {
                env: path.join(__dirname, prod ? 'production.js' : 'development.js')
            }
        },

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
            // this links all the vendor code
            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require(manifest)
            }),
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

    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            mangle: {
                except: ['_', '$', 'exports', 'require']
            }
        })
    );
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