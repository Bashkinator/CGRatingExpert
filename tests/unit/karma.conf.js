module.exports = function(config){
    config.set({
        basePath : '../../',

        files : [
            /* Libs */
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            /* App */
            'app/**/*.js',
            /* Tests */
            'tests/unit/**/*.js'
        ],

        autoWatch : false,

        frameworks: ['jasmine'],

        browsers : ['PhantomJS'],

        reporters: ['nested', 'coverage'],

        preprocessors: {
            'app/**/*.js' : 'coverage'
        },

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-ie-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-nested-reporter',
            'karma-coverage'
        ],

        nestedReporter: {
            color: {
                should: 'red',
                browser: 'yellow'
            },
            icon: {
                failure: '✘ ',
                indent: 'ட ',
                browser: ''
            }
        },

        coverageReporter: {
            type : 'html',
            dir : 'tests/unit/out/coverage'
        }

    });
};
