/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 * @copyright Copyright (c) 2016 NETSCOUT
 */
"use strict";
const gulp = require('gulp');
const webpack = require('webpack-stream');

const tasks = {
    build: () => {

    }
};

gulp.task('default', () => {
    return gulp.src('./app.js')
        .pipe(webpack(require('./config/webpack.config')))
        .pipe(gulp.dest('./dist/'))
});


