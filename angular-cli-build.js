// Angular-CLI build configuration
// This file lists all the node_modules files that will be used in a build
// Also see https://github.com/angular/angular-cli/wiki/3rd-party-libs

/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function (defaults) {
    return new Angular2App(defaults, {
        vendorNpmFiles: [
            'systemjs/dist/system-polyfills.js',
            'systemjs/dist/system.src.js',
            'zone.js/dist/**/*.+(js|js.map)',
            'core-js/**/*.+(js|js.map)',
            'reflect-metadata/**/*.+(ts|js|js.map)',
            'rxjs/**/*.+(js|js.map)',
            '@angular/**/*.+(js|js.map)',
            'mockjs/dist/*.js',
            'moment/min/*.js',
            'redux/dist/redux.(js|min.js)',

            '@awayjs/core/dist/**/*.+(js|d.ts)',

            'lodash/*.js',

            // 'kendo-ui-core/js/**/*.js',
            'jquery/dist/jquery.js',
            'faker/build/build/locales/zh_CN/faker.zh_CN.js',

            'web-animations-js/*.js',
            'mutationobserver-shim/**/*.js',
            '@webcomponents/**/*.js',

            'prismjs/**/*.+(js|css)',
            'font-awesome/**/*.css',




            'uuid/*.js'
        ]
    });
};
