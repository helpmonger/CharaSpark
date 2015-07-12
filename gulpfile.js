var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({
    lazy: true
});

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('wiredep', function() {
    log('Wire up the bower css js and our app js into the html');
    var wiredepOptions = config.getWiredepDefaultOptions();
    var gulpInjectDefaultOptions = config.getGulpInjectDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(wiredepOptions))
        .pipe($.inject(gulp.src(config.css, {
            read: false
        }), gulpInjectDefaultOptions))
        .pipe($.inject(gulp.src(config.js, {
            read: false
        }), gulpInjectDefaultOptions))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'templatecache'], function() {
    log('Wire up the app css into the html, and call wiredep ');

    var gulpInjectDefaultOptions = config.getGulpInjectDefaultOptions();
    
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css, {
            read: false
        }), gulpInjectDefaultOptions))
        .pipe(gulp.dest(config.client));
});

gulp.task('optimize', ['inject', 'fonts', 'images'], function() {
  log('Optimizing the javascript, css, html');

  var assets = $.useref.assets({
    searchPath: './www'
  });
  var templateCache = config.temp + config.templateCache.file;
  var cssFilter = $.filter('**/*.css');
  var jsFilter = $.filter('**/*.js');

  log('The templateCache is: ' + templateCache);
  return gulp
    .src(config.index)
    .pipe($.plumber())
    .pipe($.inject(
      gulp.src(templateCache, {
        read: false
      }), {
        starttag: '<!-- inject:templates:js -->'
      }))
    .pipe(assets)
    .pipe(cssFilter)
    // .pipe($.csso())
    .pipe(cssFilter.restore())
    .pipe(jsFilter)
    // .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(config.build));
});


gulp.task('fonts', ['clean-fonts'], function() {
  log('Copying fonts');

  return gulp
    .src(config.fonts)
    .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', ['clean-images'], function() {
  log('Copying and compressing the images');

  return gulp
    .src(config.images)
    .pipe($.imagemin({
      optimizationLevel: 4
    }))
    .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('clean', function(done) {
  var delconfig = [].concat(config.build, config.temp);
  log('Cleaning: ' + $.util.colors.blue(delconfig));
  del(delconfig, done);
});

gulp.task('clean-fonts', function(done) {
  clean(config.build + 'fonts/**/*.*', done);
});

gulp.task('clean-images', function(done) {
  clean(config.build + 'images/**/*.*', done);
});

gulp.task('clean-styles', function(done) {
  clean(config.temp + '**/*.css', done);
});

gulp.task('clean-code', function(done) {
  var files = [].concat(
    config.temp + '**/*.js',
    config.build + '**/*.html',
    config.build + 'js/**/*.js'
  );
  clean(files, done);
});


gulp.task('templatecache', ['clean-code'], function() {
  log('Creating AngularJS $templateCache');

  return gulp
    .src(config.htmltemplates)
    .pipe($.minifyHtml({
      empty: true
    }))
    .pipe($.angularTemplatecache(
      config.templateCache.file,
      config.templateCache.options
    ))
    .pipe(gulp.dest(config.temp));
});


function clean(path, done) {
  log('Cleaning: ' + $.util.colors.blue(path));
  del(path, done);
}



function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

