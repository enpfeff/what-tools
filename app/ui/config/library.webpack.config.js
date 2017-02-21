/**
 * Created by enpfeff on 2/20/17.
 */
const path = require('path');
const webpack = require('webpack');
const _ = require('lodash');

function init(isProd) {
    let config = {
        resolve: {
            root: [path.resolve("./assets/js")],
            extensions: ['', '.json', '.js']
        },

        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ],

        entry: {
            // These should be the names of folders in node_modules
            vendor: [
                'angular',
                'lodash',
                "angular-ui-router",
                "angular-ui-router.statehelper",
                "angular-aria",
                "angular-animate",
                "angular-material",
                "angular-cookies"
            ]
        },

        devtool: "source-map",

        output: {
            filename: '[name].bundle.js',
            path: './dist/',

            // The name of the global variable which the library's
            // require() function will be assigned to
            library: '[name]_lib'
        },

        plugins: [
            new webpack.DllPlugin({
                // The path to the manifest file which maps between
                // modules included in a bundle and the internal IDs
                // within that bundle
                path: 'dist/[name]-manifest.json',
                // The name of the global variable which the library's
                // require function has been assigned to. This must match the
                // output.library option above
                name: '[name]_lib'
            })
        ]
    };

    if(isProd) return productionConfig(config);

    return config;
}

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

module.exports = init;