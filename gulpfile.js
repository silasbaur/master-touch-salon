const { src, dest, parallel, watch } = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
 
sass.compiler = require('node-sass');

const cssDir = 'assets/css/**/*.scss';
const jsDir = 'assets/js/**/*.js';
const outputDir = '.tmp';

function css() {
    return src(cssDir)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(outputDir))
}

function js() {
    return src(jsDir)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('application.js'))
        .pipe(dest(outputDir))
}

function watchFiles() {
    watch(cssDir, css);
    watch(jsDir, js);
}

exports.css = css;
exports.js = js;
exports.default = parallel(css, js, watchFiles);
exports.build = parallel(css, js);