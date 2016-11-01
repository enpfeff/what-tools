/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";
const gulp = require('gulp');
const webpack = require('webpack-stream');
const gutil = require('gulp-util');
const PRODUCTION = 'production';

const tasks = {
    build: (watch) => {
        const config = getConfig(isProd(), watch);

        return gulp.src('./app.js')
            .pipe(webpack(config))
            .pipe(gulp.dest('./dist/'))
    }
};

function getConfig(isProd, watch = false) {
    const configFactory = require('./config/webpack.config');
    return configFactory(isProd, watch);
}

function isProd() {
    const UI_ENV = process.env.UI_ENV;
    const isProd = UI_ENV === PRODUCTION;

    if(isProd) gutil.log(gutil.colors.red('---- Production Enabled ----'));
    return isProd;
}

gulp.task('build', () => tasks.build(false));
gulp.task('dev', () => tasks.build(true));

gulp.task('default',() => tasks.build(false));


