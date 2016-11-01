/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";
const _ = require('lodash');
const webpack = require('webpack');

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
        loaders: [{
            test: /\.js$/,
            loader: ['ng-annotate', 'nginject?deprecate', "babel-loader?presets[]=es2015,cacheDirectory"]
        }],
        plugins: [
            // Sets global variables
            new webpack.ProvidePlugin({
                _: 'lodash',
                angular: 'angular'
            }),
        ]
    };

    if(prod) return productionConfig(config);

    return config;
}

function productionConfig(config) {
    const OMIT = ['devtool', 'watch', 'output.publicPath'];

    return _.omit(config, OMIT);
}

module.exports = webpackConfig;