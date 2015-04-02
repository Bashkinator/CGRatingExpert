exports.config = {

    seleniumServerJar: '../../node_modules/protractor/selenium/selenium-server-standalone-2.45.0.jar',
    chromeDriver: '../../node_modules/protractor/selenium/chromedriver',

    allScriptsTimeout: 11000,

    specs: [
        '*.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:8000/',

    framework: 'jasmine',

    onPrepare: function() {
        var SpecReporter = require('jasmine-spec-reporter');
        // add jasmine spec reporter
        jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
    },

    jasmineNodeOpts: {
        silent: true,
        defaultTimeoutInterval: 30000
    }
};
