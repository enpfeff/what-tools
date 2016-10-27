/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";
const webpack = require('webpack');

module.exports = {
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
    watch: true,
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