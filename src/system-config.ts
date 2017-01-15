declare const System: any;


System.config({
    map:                 {
        '@angular/core':                        'vendor/@angular/core/bundles/core.umd.js',
        '@angular/common':                      'vendor/@angular/common/bundles/common.umd.js',
        '@angular/compiler':                    'vendor/@angular/compiler/bundles/compiler.umd.js',
        '@angular/platform-browser':            'vendor/@angular/platform-browser/bundles/platform-browser.umd.js',
        '@angular/platform-browser-dynamic':    'vendor/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
        '@angular/router':                      'vendor/@angular/router/bundles/router.umd.js',
        '@angular/forms':                       'vendor/@angular/forms/bundles/forms.umd.js',

        'rxjs':     'vendor/rxjs',
        'main':     'main.js'
    },
    defaultJSExtensions: true
});

const map: any = {
    'icons': 'icons',
    'mockjs': 'vendor/mockjs/dist',
    'kendo':  'vendor/kendo-ui-core/js',
    'jquery': 'vendor/jquery/dist',
    'lodash': 'vendor/lodash',
    'faker':  'vendor/faker/build/build/locales/zh_CN/',

};

/** User packages configuration. */
const packages: any = {
    'app':          {main: 'index',         defaultExtension: 'js'},
    'ahri':         {main: 'index',         defaultExtension: 'js'},
    'demos':        {main: 'index',         defaultExtension: 'js'},
    'mockjs':       {main: 'mock',          defaultExtension: 'js'},
    'jquery':       {main: 'jquery',        defaultExtension: 'js'},
    'rxjs':         {main: 'Rx',            defaultExtension: 'js'},
    'faker':        {main: 'faker.zh_CN',   defaultExtension: 'js'},
    'lodash':       {main: 'index',         defaultExtension: 'js'},
    '@awayjs/core': {main: 'index',         defaultExtension: 'js'}
};

// Apply the user's configuration.
System.config({map, packages});
