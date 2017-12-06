'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
//var webserver = require('gulp-webserver');


gulp.task('browserSync', function() {
  browserSync.init({
    browser: "google chrome",
    https: true,
    middleware: function (req, res, next) {
      res.setHeader('Access-Control-Allow-Origin', '*');
      next();
    }
  })
})


gulp.task('sass', function() {
  return gulp.src(process.env.INIT_CWD +'/styles/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(process.env.INIT_CWD+'/styles/'))
    .pipe(browserSync.reload({ 
      stream: true
    }));
})

gulp.task('watch', function () {
  gulp.watch(
      process.env.INIT_CWD  +'/styles/style.scss',
    ['sass']);
  //gulp.watch(process.env.INIT_CWD +'/**/**/**/script.js').on("change", browserSync.reload);
});

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync'], 'watch',
    callback
  )
})
