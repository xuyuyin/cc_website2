var gulp = require('gulp');
var postcss = require('gulp-postcss');
var less = require('gulp-less');

var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');

gulp.task('css', function () {
    var processors = [
        autoprefixer,
        cssnano
    ];
    return gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(postcss(processors))
        .pipe(gulp.dest("./dist"));
})