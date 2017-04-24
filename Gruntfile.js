module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            server: {
                options: {
                    base: 'dist/',
                    keepalive: false
                }
            }
        },

        copy: {
            main: {
                files: [
                    {
                        src: 'src/index.html',
                        dest: 'dist/index.html'
                    }
                ]
            }
        },

        less: {
            main: {
                files: [
                    {
                        src: 'src/css/main.less',
                        dest: 'dist/css/main.css'
                    }
                ]
            }
        },

        webpack: {
            main: {
                entry: './src/js/main.js',
                output: {
                    path: 'dist/js',
                    filename: 'main.js'
                },
                failOnError: false,
                debug: true,
                devtool: 'inline-source-map',
                module: {
                    loaders: [
                        {
                            test: /\.js$/,
                            include: /src\/js\//,
                            loader: 'babel-loader'
                        }
                    ]
                }
            }
        },

        karma: {
            test: {
                options: {
                    files: ['test/**/*.js'],
                    browsers: ['PhantomJS'],
                    singleRun: true
                }
            }
        },

        watch: {
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['webpack']
            },
            css: {
                files: ['src/css/**/*.less'],
                tasks: ['less']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['copy']
            }
        }

    });

    grunt.registerTask('build', ['copy', 'less', 'webpack']);
    grunt.registerTask('default', ['build', 'connect', 'watch']);

};
