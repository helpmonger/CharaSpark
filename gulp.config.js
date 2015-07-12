module.exports = function() {
    var client = './www/';
    var temp = client + '.tmp/';
    // var clientApp = client + 'js/';
    var config = {

        // all js to vet
        alljs: [
            client + 'js/*.js',
            client + 'controllers/**/*.js',
        ],
        allBuild: [
            './build/js/*.js'
        ],
        build: client + 'build/',
        client: client,
        css: client + 'css/*.css',
        fonts: client + 'lib/font-awesome/fonts/*.*',
        html: client + 'views/**/*.html',
        htmltemplates: client + 'templates/**/*.html',
        images: client + 'img/**/*.*',
        index: client + 'index.html',
        js: [
            client + 'js/*.js',
            client + 'controllers/**/*.js',
            '!' + client + '**/*.spec.js'
        ],
        less: client + 'styles/styles.less',
        // src: ['./www/lib/braintree-angular/dist/*.js'],


        //the following settings determine the gulp-inject
        //paths for our custom .js files

        addRootSlash: false,
        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: client + 'lib/',
        },

        temp: temp,

                /**
         * template cache
         */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app.core',
                standAlone: false,
                root: client + 'templates/'
            }
        },
    };

    config.getWiredepDefaultOptions = function() {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    config.getGulpInjectDefaultOptions = function() {
        var options = {
            ignorePath: config.ignorePath,
            addRootSlash: config.addRootSlash,
        };
        return options;
    };

    return config;
};
