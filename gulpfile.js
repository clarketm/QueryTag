var gulp = require('gulp'),
    rename = require("gulp-rename"),
    del = require('del'),
    js = require('gulp-uglify'),
    css = require('gulp-clean-css'),
    replace = require('gulp-replace'),
    bump = require("gulp-bump");


gulp.task('img', ['clean'], function () {
    return gulp.src('./src/stable/img/*.png')
        .pipe(gulp.dest('./dist/img/'));
});

gulp.task('json', ['clean'], function () {
    return gulp.src('./src/stable/data/categories.json')
        .pipe(gulp.dest('./dist/data/'));
});

gulp.task('css', ['clean'], function () {
    return gulp.src(['./src/stable/css/querytag.css', './src/stable/css/querytag-theme.css'])
        .pipe(gulp.dest('./dist/css/'))
        .pipe(css())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/css/'))
        .pipe(gulp.dest('./src/stable/css/'));
});

gulp.task('js', ['clean'], function () {
    return gulp.src(['./src/stable/js/querytag.js'])
        .pipe(gulp.dest('./dist/js/'))
        .pipe(js({output: {comments: /^!|@preserve|@license|@cc_on/i}}))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./dist/js/'))
        .pipe(gulp.dest('./src/stable/js/'));
});

gulp.task('bump', ['bump-js', 'bump-css'], function(){
    return gulp.src(['./bower.json', './package.json'])
        .pipe(bump())
        .pipe(gulp.dest('./'));
});

gulp.task('bump-js', function () {
    return gulp.src(['src/stable/js/querytag.js'])
        .pipe(replace(/(v\d\.\d\.)(\d)/g, function (matches, match1, match2) {
            return match1 + (Number(match2)+1);
        }))
        .pipe(gulp.dest('src/stable/js/'))
        .on('end', function () {
            gulp.start('js');
        });
});

gulp.task('bump-css', function () {
    gulp.src(['src/stable/css/querytag.css', 'src/stable/css/querytag-theme.css'])
        .pipe(replace(/(v\d\.\d\.)(\d)/g, function (matches, match1, match2) {
            return match1 + (Number(match2) + 1);
        }))
        .pipe(gulp.dest('src/stable/css/'))
        .on('end', function () {
            gulp.start('css');
        });
});

gulp.task('clean', function () {
    return del(['dist/js']);
});

gulp.task('build', ['img', 'json', 'js', 'css']);

gulp.task('default', ['build']);



