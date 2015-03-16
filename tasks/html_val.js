/*
 * grunt-html-val
 * https://github.com/moritzmeyer/html-val
 *
 * Copyright (c) 2013 Moritz Meyer
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var htmlparser = require('htmlparser');
  var colors = require('colors');

  var HTML_ATTRIBUTES = ['ACCEPT', 'ACCEPT-CHARSET', 'ACCESSKEY', 'ACTION', 'ALIGN', 'ALT', 'ASYNC', 'AUTOCOMPLETE', 'AUTOFOCUS', 'AUTOPLAY', 'BGCOLOR', 'BUFFERED', 'CHALLENGE', 'CHARSET', 'CHECKED', 'CITE', 'CLASS', 'CODE', 'CODEBASE', 'COLOR', 'COLS', 'COLSPAN', 'CONTENT', 'CONTENTEDITABLE', 'CONTEXTMENU', 'CONTROLS', 'COORDS', 'DATA', 'DATETIME', 'DEFAULT', 'DEFER', 'DIR', 'DIRNAME', 'DISABLED', 'DOWNLOAD', 'DRAGGABLE', 'DROPZONE', 'ENCTYPE', 'FOR', 'FORM', 'HEADERS', 'HEIGHT', 'HIDDEN', 'HIGH', 'HREF', 'HREFLANG', 'HTTP', 'ICON', 'ID', 'ISMAP', 'ITEMPROP', 'KEYTYPE', 'KIND', 'LABEL', 'LANG', 'LANGUAGE', 'LIST', 'LOOP', 'LOW', 'MANIFEST', 'MAX', 'MAXLENGTH', 'MEDIA', 'METHOD', 'MIN', 'MULTIPLE', 'NAME', 'NOVALIDATE', 'OPEN', 'OPTIMUM', 'PATTERN', 'PING', 'PLACEHOLDER', 'POSTER', 'PRELOAD', 'PUBDATE', 'RADIOGROUP', 'READONLY', 'REL', 'REQUIRED', 'REVERSED', 'ROWS', 'ROWSPAN', 'SANDBOX', 'SPELLCHECK', 'SCOPE', 'SCOPED', 'SEAMLESS', 'SELECTED', 'SHAPE', 'SIZE', 'SIZES', 'SPAN', 'SRC', 'SRCDOC', 'SRCLANG', 'START', 'STEP', 'STYLE', 'SUMMARY', 'TABINDEX', 'TARGET', 'TITLE', 'TYPE', 'USEMAP', 'VALUE', 'WIDTH', 'WRAP'];
  var UNNESSARY_SCRIPT_ATTR = ['language', 'type'];

  grunt.registerMultiTask('html_val', 'Validate HTML5 the simple way.', function() {

    var options = this.options({
      imageAlt: true,
      imageWidth: true,
      imageHeight: true,
      anchorTitle: true,
      singleQuotes: true,
      scriptUnessaryAttr: true,
      htmlLang: true,
      attrUppercase: true
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var files = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return {
          path: filepath,
          src: grunt.file.read(filepath)
        };
      });

      var warnings;

      function logMessage(message, additionalInfo) {
        additionalInfo = additionalInfo
          .replace(/(\r\n|\n|\r)/gm,"")
          .replace(/ +(?= )/g,'');

        grunt.log.writeln('x '.red, message, additionalInfo.grey);
      }

      var parseNode = function (node) {

        if(node.name === 'img') {
          if(options.imageAlt && node.attribs.alt === undefined) {
            warnings++;
            logMessage('alt attribute missing', 'image with src "' + node.attribs.src + '"');
          }

          if(options.imageWidth && node.attribs.width === undefined) {
            warnings++;
            logMessage('width attribute missing', 'image with src "' + node.attribs.src + '"');
          }

          if(options.imageHeight && node.attribs.height === undefined) {
            warnings++;
            logMessage('height attribute missing', 'image with src "' + node.attribs.src + '"');
          }
        }

        if(options.anchorTitle && node.name === 'a' && (!node.attribs || node.attribs.title === undefined)) {
          warnings++;
          logMessage('missing title attribute', 'element: "' + node.data + '"');
        }

        if(options.singleQuotes && node.raw.indexOf('class=\'') !== -1) {
          warnings++;
          logMessage('single quotes used', 'element: "' + node.data + '"');
        }

        if(options.scriptUnessaryAttr && node.name === 'script') {
          UNNESSARY_SCRIPT_ATTR.forEach(function (attr) {
            if(node.attribs && node.attribs[attr]) {
              warnings++;
              logMessage('unnessary attribute used', 'attribute: ' + attr + '="' + node.attribs[attr] + '" element: "' + node.data + '"');
            }
          });
        }

        if(options.htmlLang && node.name === 'html' && (!node.attribs || node.attribs.lang === undefined)) {
          warnings++;
          logMessage('lang missing on html tag', 'element: "' + node.data + '"');
        }

        if(options.attrUppercase) {
          for(var attrKey in node.attribs) {
            if(HTML_ATTRIBUTES.indexOf(attrKey) !== -1) {
              warnings++;
              logMessage('uppercase attribute used', 'attribute: ' + attrKey + ' element: "' + node.data + '"');
            }
          }
        }

        if(node.children && node.children.length > 0) {
          node.children.forEach(parseNode);
        }
      };

      var handler = new htmlparser.DefaultHandler(function (error, dom) {
          if (error) {
            grunt.log.writeln('Could not parse file ' + f.src);
          }
          else {
            dom.forEach(function (node) {
              parseNode(node);
            });
          }
      });

      files.forEach(function (file) {
        grunt.verbose.writeln('\nProcessing File: ' + (file.path + '').green + '\n');
        warnings = 0;
        var parser = new htmlparser.Parser(handler);
        parser.parseComplete(file.src);
        if(warnings > 0) {
          grunt.log.writeln('\n' + (warnings + '').red + ' warnings in ' + (file.path + '').bold + '\n');
        }
      });
    });
  });

};
