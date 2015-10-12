/*jslint node: true */
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    karma = require('karma').server,
    stylish = require('jshint-stylish'),
    connect = require('gulp-connect'),
    url = require('url'),
    shell = require('gulp-shell'),
    sass = require('gulp-sass');

var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var dom = require('gulp-html-replace');
var ngHtml2js = require("gulp-ng-html2js");
var ngmin = require('gulp-ng-annotate');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var packagejson = require('./package.json');
var streamqueue = require('streamqueue');
var rimraf = require('rimraf');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var stylish = require('jshint-stylish');
var domSrc = require('gulp-dom-src');

var MAIN_STYLE_SRC = 'app.scss';

var JS_SRC = ['partial/**/*.js', 'directive/**/*.js', 'service/**/*.js', 'filter/**/*.js'];
var STYLE_SRC = [MAIN_STYLE_SRC, 'partial/**/*.scss', 'directive/**/*.scss', 'styles/**/*.scss'];
var TMPL_SRC = ['partial/**/*.html', 'directive/**/*.html'];
var DIST_DEST = '../ae/';

var htmlminOptions = {
  removeComments: true,
  conservativeCollapse: true,
  keepClosingSlash: true,
  preserveLineBreaks: true
};

/**
 * Run test once and exit
 */
gulp.task('testall', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    browsers: ['Chrome', 'PhantomJS']
  }, done);
});

gulp.task('test', function(done) {
  // karma.start({
  //   configFile: __dirname + '/karma.conf.js',
  //   singleRun: true
  // }, done);
});

gulp.task('testdebug', function (done) {
  karma.start({
    configFile: __dirname + '/karma.conf.js',
    browsers: ['Chrome']
  }, done);
});

gulp.task('jshint', ['test'], function() {
  return gulp.src(JS_SRC)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish));
});

gulp.task('serve', function() {
  connect.server({
    livereload: true,
    port: 3000
  });
});

gulp.task('html', function () {
  gulp.src(TMPL_SRC)
    .pipe(connect.reload());
});

gulp.task('sass', function () {
  gulp.src(MAIN_STYLE_SRC)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('clean', function() {
    rimraf.sync('dist');
});

gulp.task('css', ['clean'], function() {
    return gulp.src('app.scss')
        .pipe(sass())
        .pipe(cssmin({keepSpecialComments: 0}))
        .pipe(rename('webapp.full.css'))
        .pipe(gulp.dest(DIST_DEST+'css'));
});

gulp.task('js', ['clean'], function() {

    var templateStream = gulp.src(['!node_modules/**','!index.html','!_SpecRunner.html','!.grunt/**','!dist/**','!bower_components/**','**/*.html'])
        .pipe(htmlmin(htmlminOptions))
        .pipe(ngHtml2js({
            moduleName: packagejson.name
        }));

    var jsStream = domSrc({file:'index.html',selector:'script[data-build!="exclude"]',attribute:'src'});

    var combined = streamqueue({ objectMode: true });

    combined.queue(jsStream);
    combined.queue(templateStream);

    return combined.done()
        .pipe(concat('webapp.full.js'))
        .pipe(ngmin())
        // .pipe(uglify())
        .pipe(gulp.dest(DIST_DEST+'js'));
});

gulp.task('indexHtml', ['clean'], function() {
    return gulp.src('index.html')
        .pipe(dom({
            'css': {
              src: '/css/webapp.full.css',
              tpl: '<link rel="stylesheet" href="%s" />'
            },
            'js': '/js/webapp.full.js'
        }))
        .pipe(htmlmin(htmlminOptions))
        .pipe(rename('webapp.html'))
        .pipe(gulp.dest(DIST_DEST+'dj/templates'));
});

gulp.task('images', ['clean'], function(){
    return gulp.src('img/**')
        .pipe(imagemin())
        .pipe(gulp.dest(DIST_DEST+'img'));
});

gulp.task('watch', function() {
  gulp.watch(TMPL_SRC, ['test', 'jshint', 'html']);
  gulp.watch(STYLE_SRC, ['test', 'sass', 'html']);
  gulp.watch(JS_SRC, ['test', 'jshint', 'html']);
});

gulp.task('build', ['clean', 'css', 'js', 'indexHtml', 'images']);

gulp.task('default', ['test', 'jshint', 'serve', 'watch']); //gulp
