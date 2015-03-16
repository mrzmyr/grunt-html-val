'use strict';

module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js'
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

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

    nodeunit: {
      tests: ['test/*_test.js'],
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('default', ['jshint']);
};
