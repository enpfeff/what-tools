/**
 * @module what-tools
 * @since 10/16/16
 * @author Ian Pfeffer
 */
"use strict";
const gulp = require('gulp');
const clean = require('gulp-clean');
const webpackGulp = require('webpack-stream');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const webpack = require('webpack');
const minifyCSS = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const libraryConfig = require('./config/library.webpack.config');

const assetConfig = require('./config/assets.config');
const PRODUCTION = 'production';

const tasks = {
    vendor: (done) => {
        webpack(libraryConfig(isProd()), function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log("[webpack]", stats.toString({}));
            done();
        });
    },
    build: () => {
        const config = getConfig(isProd(), '../dist/vendor-manifest.json');

        return gulp.src('./app.js')
            .pipe(webpackGulp(config))
            .pipe(gulp.dest('./dist/'))
    },
    clean: () => {
        const CLEAN = ['./dist'];
        return gulp.src(CLEAN, {read: false})
            .pipe(clean());

    },
    css: () => {
        return gulp.src(assetConfig.CSS)
            .pipe(autoprefixer('last 2 versions'))
            .pipe(minifyCSS())
            .pipe(concat('vendor.min.css'))
            .pipe(gulp.dest('./dist/'));
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

// used in both development and production builds
gulp.task('clean', tasks.clean);
gulp.task('vendor', ['clean'], (done) => {
    tasks.css();
    tasks.vendor(() => done());
});

// only used in prod build
gulp.task('build', ['vendor', 'clean'], tasks.build);
gulp.task('default', ['build']);