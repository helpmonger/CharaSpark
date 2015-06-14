module.exports = function() {
    var client = './www/';
    // var clientApp = client + 'js/';
    var config = {

        // all js to vet
        alljs: [
            './www/js/*.js',
            './www/controllers/**/*.js',
        ],
        client: client,
        css: client + 'css/*.css',
        index: client + 'index.html',
        js: [
            client + 'js/*.js',
            client + 'controllers/**/*.js',
            '!' + client + '**/*.spec.js'
        ],
        // src: ['./www/lib/braintree-angular/dist/*.js'],

        // less: client + 'styles/styles.less',

        //the following settings determine the gulp-inject
        //paths for our custom .js files

        addRootSlash: false,
        ignorePath: '/www',
        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './www/lib/',
        }
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
