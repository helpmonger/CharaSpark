var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({
    lazy: true
});

var port = process.env.PORT || config.defaultPort;

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
  var templateCache = '.tmp/' + config.templateCache.file;
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
    .pipe(gulp.dest(config.build + config.img));
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
  log(config.templateCache.file);
  log(config.templateCache.options);
  log(config.temp);
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



gulp.task('serve', function(){
  var isDev = true;

 var nodeOptions = {
    script: config.nodeServer,
    delayTime: 1,
    env: {
      'PORT': port,
      'NODE_ENV': 'dev'
    },
    watch: [config.server]
  };

   return $.nodemon(nodeOptions)
    .on('restart', function(ev) {
      log('*** nodemon restarted');
      log('files changed on restart:\n' + ev);
      setTimeout(function() {
        browserSync.notify('reloading now ...');
        browserSync.reload({
          stream: false
        });
      }, config.browserReloadDelay);
    })
    .on('start', function() {
      log('*** nodemon started');
      startBrowserSync(isDev);
    })
    .on('crash', function() {
      log('*** nodemon crashed: script crashed for some reason');
    })
    .on('exit', function() {
      log('*** nodemon exited cleanly');
    });

});

function startBrowserSync(isDev) {
  if (args.nosync || browserSync.active) {
    return;
  }

  log('Starting browser-sync on port ' + port);

 
    gulp.watch([config.less, config.js, config.html], ['templatecache', browserSync.reload])
      .on('change', function(event) {
        // changeEvent(event);
      });
  

  var options = {
    proxy: 'localhost:' + port,
    port: 3000,
    files: isDev ? [
      config.client + '**/*.*',
      '!' + config.less,
      config.temp + '**/*.css'
    ] : [],
    ghostMode: {
      clicks: true,
      location: false,
      forms: true,
      scroll: true
    },
    injectChanges: true,
    logFileChanges: true,
    logLevel: 'debug',
    logPrefix: 'gulp-patterns',
    notify: true,
    reloadDelay: 0 //1000
  };

  browserSync(options);
}


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

