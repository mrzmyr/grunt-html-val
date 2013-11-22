/*
 * grunt-html-val
 * https://github.com/moritzmeyer/html-val
 *
 * Copyright (c) 2013 Moritz Meyer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Configuration to be run (and then tested).
    html_val: {
      default_options: {
        src: [
          'test/fixtures/invalid.html',
          'test/fixtures/invalid2.html'
        ],
      },
      custom_options: {
        options: {
          imageAlt: false,
          imageWidth: false,
          imageHeight: false,
          anchorTitle: false,
          singleQuotes: false,
          scriptUnessaryAttr: false,
          htmlLang: false,
          attrUppercase: false
        },
        src: [
          'test/fixtures/invalid.html'
        ],
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'html_val', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
