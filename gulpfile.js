const gulp = require('gulp');

var webpackStream = require('webpack-stream');
var webpack = require('webpack');
const sass = require('gulp-sass')(require('node-sass'));
const autoprefixer = require('gulp-autoprefixer');
const ejs = require("gulp-ejs");

const plumber = require('gulp-plumber');
const pleeease = require('gulp-pleeease');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');

const browserSync = require('browser-sync');
const htmlbeautify = require("gulp-html-beautify");
const fs = require('fs');

// setting
const assets_dir = {
    css: './docs/assets/css/',
    js: './docs/assets/js/',
    img: './docs/assets/img/',
};
const src_file = {
    ejs: './src/ejs/**/*.ejs',
    excl_ejs: '!./src/ejs/_include/**/*.ejs',
    scss: './src/scss/*.scss',
    js: './src/js/**/*.js',
    img: './docs/assets/img/**/*.+(jpg|jpeg|png|gif)',
    svg: './docs/assets/img/**/*.svg'
};

const errorHandler = function(error) {
    console.log('ERROR!(+_+)');
    console.log(error.message);
}

const webpackConfig = require('./webpack.config');

// for Js
function js_compile(){
  return webpackStream(webpackConfig, webpack)
  .pipe(plumber({
        errorHandler: errorHandler
    }))
  .pipe(uglify())
  .pipe(gulp.dest(assets_dir.js)); 
};
exports.task = js_compile;

// for sass
function sass_compile(){
    return gulp
        .src(src_file.scss)
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(sass())
        .pipe(pleeease())
        .pipe(autoprefixer())
        .pipe(gulp.dest(assets_dir.css));
}
exports.task = sass_compile;

// for ejs
function ejs_compile(){    
    return gulp
        .src([src_file.ejs, src_file.excl_ejs])
        .pipe(ejs())
        .pipe(plumber({
            errorHandler: errorHandler
        }))
        .pipe(rename({
            basename: 'index', //ファイル名
            extname: '.html' //拡張子
        }))
        .pipe(htmlbeautify({
            "indent_size": 2,
            "indent_char": " ",
            "max_preserve_newlines": 0,
            "preserve_newlines": false,
            "extra_liners": [],
          }))
        .pipe(gulp.dest("./docs"));
};
exports.task = ejs_compile;

// for dev
function serve(done) {
    browserSync({
        server: {
            baseDir: './docs'
        },
        port: 3000

        // プロキシ指定
        // proxy: 'http://●●/',
        // Host: '●●.com',
        // open: 'external'
    });
    done();
}
exports.task = serve;

function reload(done){
    browserSync.reload();
    done();
}
exports.task = reload;

function watch(done){
    gulp.watch(src_file.js, gulp.series(js_compile, reload));
    gulp.watch(src_file.scss, gulp.series(sass_compile, reload));
    gulp.watch(src_file.ejs, gulp.series(ejs_compile, reload));
    gulp.watch(src_file.img), gulp.series(reload);
    gulp.watch(src_file.svg), gulp.series(reload);
    done();
};
exports.task = watch;

// default
gulp.task('default', gulp.parallel(serve, watch));
