module.exports = function(grunt) {

    var app_paths = {
        root: 'app',
        mainView: 'app/view/index.jade',
        mainStyle: 'app/view/styles/app.scss'
    };

    var tests_paths = {
        root: 'tests',
        unit: 'tests/unit',
        e2e: 'tests/e2e'
    };

    var build_path = {
        root: 'build',
        styles: 'build/css',
        scripts: 'build/js',
        fonts: 'build/fonts',
        images: 'build/img',
        templates: 'build/templates'
    };

    var lib_path = 'bower_components';

    var config_path = 'configs';

    var temp_path = '.tmp';

    var paths = {
        fonts: {
            app: [app_paths.root + '/**/fonts/*.*'],
            lib: [
                lib_path+ '/bootstrap/dist/fonts/*.*'
            ]
        },
        jade: {
            mainViews: [app_paths.mainView],
            templates: [],
            all: [app_paths.root + '/**/*.jade']
        },
        js: {
            lib: {
                src: [
                    lib_path + '/angular/angular.js',
                    lib_path + '/angular-animate/angular-animate.js',
                    'lib/ui-bootstrap-custom-tpls-0.13.0-SNAPSHOT.js'
                ],
                min: [
                    temp_path + '/lib-minified.js',
                    lib_path + '/angular/angular.min.js',
                    lib_path + '/angular-animate/angular-animate.min.js',
                    'lib/ui-bootstrap-custom-tpls-0.13.0-SNAPSHOT.min.js'
                ],
                to_min: []
            },
            app: [
                temp_path + '/config.js',
                app_paths.root + '/**/*.js'
            ]
        },
        sass: {
            mainStyles: [app_paths.mainStyle],
            all: [app_paths.root + '/**/*.scss']
        },
        css: {
            lib: {
                src: [
                    lib_path + '/bootstrap/dist/css/bootstrap.css'
                ],
                min: [
                    temp_path+'/lib-minified.css',
                    lib_path + '/bootstrap/dist/css/bootstrap.min.css'
                ],
                to_min: []
            }
        },
        img: [app_paths.root + '/**/img/*.*'],
        config: {
            dev: [],
            prod: [],
            common: [
                config_path + '/commonConfig.json',
                config_path + '/answers.json',
                config_path + '/questions.json'
            ]
        }
    };

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: {
            temp: {
                options: {
                    force: true
                },
                src: [temp_path+'/**/*.*']
            },
            build: {
                options: {
                    force: true
                },
                src: [build_path.root+'/**/*.*']
            }
        },

        copy: {
            img: {
                expand: true,
                flatten: true,
                src: paths.img,
                dest: build_path.images
            },
            fonts: {
                expand: true,
                flatten: true,
                src: paths.fonts.app.concat(paths.fonts.lib),
                dest: build_path.fonts
            }
        },

        bower: {
            options: {
                targetDir: paths.bower
            },
            install: {
                //just run 'grunt bower:install' and you'll see files from your Bower packages in lib directory
            }
        },

        "merge-json": {
            dev: {
                src: paths.config.dev.concat(paths.config.common),
                dest: temp_path + '/config.json'
            },
            prod: {
                src: paths.config.prod.concat(paths.config.common),
                dest: temp_path + '/config.json'
            }
        },

        ngconstant: {
            options: {
                name: 'appConfig',
                dest: temp_path + '/config.js'
            },
            dev: {
                options: {
                    values: {
                        debug: true
                    }
                }
            },
            prod: {
                options: {
                    values: {
                        debug: false
                    }
                }
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            appSrc: {
                src: paths.js.app,
                dest: temp_path+'/app-script.js'
            },
            libSrc: {
                src: paths.js.lib.to_min,
                dest: temp_path+'/lib-annotated.js'
            }
        },

        uglify: {
            appSrc: {
                src: temp_path+'/app-script.js',
                dest: build_path.scripts+'/app-script.js'
            },
            libSrc: {
                src: temp_path+'/lib-annotated.js',
                dest: temp_path+'/lib-minified.js'
            }
        },

        jade: {
            production: {
                src: paths.jade.mainViews,
                dest: build_path.root,
                options: {
                    client: false,
                    runtime: false
                }
            },
            debug: {
                src: paths.jade.mainViews,
                dest: build_path.root,
                options: {
                    client: false,
                    runtime: false,
                    pretty: true
                }
            },
            productionTemplates: {
                src: paths.jade.templates,
                dest: build_path.templates,
                options: {
                    client: false,
                    runtime: false
                }
            },
            debugTemplates: {
                src: paths.jade.templates,
                dest: build_path.templates,
                options: {
                    client: false,
                    runtime: false,
                    pretty: true
                }
            }
        },

        concat: {

            appSrc: {
                options: {
                    banner: "'use strict';\n\n"
                },
                src: paths.js.app,
                dest: build_path.scripts+'/app-script.js'
            },

            addUseStrict: {
                options: {
                    banner: "'use strict';"
                },
                src: [temp_path+'/app-script.js'],
                dest: temp_path+'/app-script.js'
            },

            libSrc: {
                src: paths.js.lib.src,
                dest: build_path.scripts+'/lib-script.js'
            },
            libSrcMin: {
                src: paths.js.lib.min,
                dest: build_path.scripts+'/lib-script.js'
            },

            libCSS: {
                src: paths.css.lib.src,
                dest: build_path.styles+'/lib-css.css'
            },
            libCSSMin: {
                src: paths.css.lib.min,
                dest: build_path.styles+'/lib-css.css'
            }

        },

        sass: {
            build: {
                src: paths.sass.mainStyles,
                dest: temp_path+'/app-css.css'
            }
        },

        autoprefixer: {
            appCSS: {
                src: temp_path+'/app-css.css',
                dest: build_path.styles+'/app-css.css'
            }
        },

        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            app: {
                src: build_path.styles+'/app-css.css',
                dest: build_path.styles+'/app-css.css'
            },
            lib: {
                src: paths.css.lib.to_min,
                dest: temp_path+'/lib-minified.css'
            }

        },

        watch: {
            options: {
                livereload: true
            },
            appSrc: {
                files: paths.js.app.concat(paths.config.dev).concat(paths.config.common),
                tasks: ['build:debug:config', 'build:debug:sources:app', 'clean:temp']
            },
            views: {
                files: paths.jade.all,
                tasks: ['build:debug:html', 'clean:temp']
            },
            styles: {
                files: paths.sass.all,
                tasks: ['build:debug:styles', 'clean:temp']
            }
        },

        'http-server': {
            devBackground: {
                root: build_path.root,
                port: 8000,
                host: "127.0.0.1",
                showDir : true,
                autoIndex: true,
                runInBackground: true
            },
            dev: {
                root: build_path.root,
                port: 8000,
                host: "127.0.0.1",
                showDir : true,
                autoIndex: true
            }
        },

        karma: {
            options: {
                // point all tasks to karma config file
                configFile: tests_paths.unit + '/karma.conf.js'
            },
            unit: {
                singleRun: true
            }
        },

        protractor: {
            options: {
                configFile: tests_paths.e2e + '/protractor.conf.js',
                noColor: true
            },
            e2e: {
                options: {
                    keepAlive: false
                }
            }
        },

        'jsdoc-ng' : {
            'all' : {
                src: ['lib/blank.js'].concat(paths.js.app),
                dest: 'docs',
                template : 'jsdoc-ng'
            }
        }

    });

    grunt.loadNpmTasks('grunt-npm-install');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-jade');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-merge-json');
    grunt.loadNpmTasks('grunt-ng-constant');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-jsdoc-ng');

    grunt.registerTask('readConfigJSON', function () {
        if (grunt.file.exists(temp_path + "/config.json")) {
            var config = grunt.file.readJSON(temp_path + "/config.json");
            grunt.config.set('ngconstant.dev.options.constants.Config', config);
            grunt.config.set('ngconstant.prod.options.constants.Config', config);
        } else {
            grunt.log.error("file " + temp_path + "/config.json" + " not found");
        }
    });

    grunt.registerTask('build:debug:config', ['merge-json:dev', 'readConfigJSON', 'ngconstant:dev']);
    grunt.registerTask('build:debug:sources:lib', ['concat:libSrc']);
    grunt.registerTask('build:debug:sources:app', ['concat:appSrc']);
    grunt.registerTask('build:debug:sources', ['build:debug:sources:lib', 'build:debug:sources:app']);

    grunt.registerTask('build:debug:styles:lib', ['concat:libCSS']);
    grunt.registerTask('build:debug:styles:app', ['sass:build', 'autoprefixer:appCSS']);
    grunt.registerTask('build:debug:styles:fonts', ['copy:fonts']);
    grunt.registerTask('build:debug:styles', ['build:debug:styles:lib', 'build:debug:styles:app', 'build:debug:styles:fonts']);

    grunt.registerTask('build:debug:images', ['copy:img']);

    grunt.registerTask('build:debug:html', ['jade:debug', 'jade:debugTemplates']);

    grunt.registerTask('build:production:config', ['merge-json:prod', 'readConfigJSON', 'ngconstant:prod']);
    grunt.registerTask('build:production:sources:lib', ['ngAnnotate:libSrc', 'uglify:libSrc', 'concat:libSrcMin']);
    grunt.registerTask('build:production:sources:app', ['ngAnnotate:appSrc', 'concat:addUseStrict', 'uglify:appSrc']);
    grunt.registerTask('build:production:sources', ['build:production:sources:lib', 'build:production:sources:app']);

    grunt.registerTask('build:production:styles:lib', ['cssmin:lib', 'concat:libCSSMin']);
    grunt.registerTask('build:production:styles:app', ['sass:build', 'autoprefixer:appCSS', 'cssmin:app']);
    grunt.registerTask('build:production:styles:fonts', ['copy:fonts']);
    grunt.registerTask('build:production:styles', ['build:production:styles:lib', 'build:production:styles:app', 'build:production:styles:fonts']);

    grunt.registerTask('build:production:images', ['copy:img']);

    grunt.registerTask('build:production:html', ['jade:production', 'jade:productionTemplates']);

    grunt.registerTask('build:debug', 'Concat files to public directory',
        ['clean', 'build:debug:config', 'build:debug:sources', 'build:debug:styles', 'build:debug:images', 'build:debug:html', 'clean:temp']);

    grunt.registerTask('build:production', 'Uglify, minify and Concat files to public directory',
        ['clean', 'build:production:config', 'build:production:sources', 'build:production:styles', 'build:production:images', 'build:production:html', 'clean:temp']);

    grunt.registerTask('run', ['build:debug', 'http-server:devBackground', 'watch']);

    grunt.registerTask('docs', ['jsdoc-ng:all']);

    grunt.registerTask('unit-test', ['build:debug:config', 'karma:unit', 'clean:temp']);

    grunt.registerTask('e2e-test', ['http-server:devBackground', 'protractor:e2e']);

    // Default task(s).
    grunt.registerTask('default', ['npm-install', 'docs', 'build:production', 'http-server:dev']);


};