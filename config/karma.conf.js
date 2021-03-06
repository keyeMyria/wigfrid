// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            // require('karma-mocha-reporter'),
            // require('karma-coverage')
        ],
        customLaunchers: {
            // chrome setup for travis CI using chromium
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },
        files: [
            {pattern: 'dist/vendor/core-js/client/core.js', included: true, watched: false},
            {pattern: 'dist/vendor/zone.js/dist/zone.js', included: true, watched: false},
            {pattern: 'dist/vendor/reflect-metadata/Reflect.js', included: true, watched: false},
            {pattern: 'dist/vendor/systemjs/dist/system-polyfills.js', included: true, watched: false},
            {pattern: 'dist/vendor/systemjs/dist/system.src.js', included: true, watched: false},
            {pattern: 'dist/vendor/zone.js/dist/async-test.js', included: true, watched: false},
            {pattern: 'dist/vendor/zone.js/dist/fake-async-test.js', included: true, watched: false},

            {pattern: 'config/karma-test-shim.js', included: true, watched: true},

            // Distribution folder.
            {pattern: 'dist/**/*', included: false, watched: true}
        ],
        exclude: [
            // Vendor packages might include spec files. We don't want to use those.
            'dist/vendor/**/*.spec.js'
        ],
        preprocessors: {
            // 'dist/ahri/**/*': ['coverage']
        },
        reporters: [
            'progress',
            // 'mocha',
            // 'coverage'
        ],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,

        // //mocha reporter
        // mochaReporter: {
        //     colors: {
        //         success: 'blue',
        //         info: 'bgGreen',
        //         warning: 'cyan',
        //         error: 'bgRed'
        //     },
        //     symbols: {
        //         success: '',
        //         info: '#',
        //         warning: '!',
        //         error: 'x'
        //     }
        // }
    });
};
