# grunt-html-val

> Validate HTML5 the simple way

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html-val --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html-val');
```

## The "html_val" task

### Overview
In your project's Gruntfile, add a section named `html_val` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  html_val: {
    default: {
      src: ['**/*.html']
    },
  },
})
```

### Options

#### options.imageAlt
Type: `Boolean`
Default value: `true`

Validates the alt attribute of `img` tags

#### options.imageHeight
Type: `Boolean`
Default value: `true`

Validates the height attribute of `img` tags

#### options.imageWidth
Type: `Boolean`
Default value: `true`

Validates the width attribute of `img` tags

#### options.anchorTitle
Type: `Boolean`
Default value: `true`

Validates the title attribute of anchors

#### options.singleQuotes
Type: `Boolean`
Default value: `true`

Validates the single quotes attributes

#### options.scriptUnessaryAttr
Type: `Boolean`
Default value: `true`

Validates the `type` and the `language` attribute of `script` tags

#### options.htmlLang
Type: `Boolean`
Default value: `true`

Validates the `lang` attribute of the `html` tag

#### options.attrUppercase
Type: `Boolean`
Default value: `true`

Validates all attributes uppercase'ness

### Custom Options
In this example, custom options are used to prevent the validator from validating the `lang` attribute of the `<html>` tag and the warnings when using uppercase attributes such as `HREF=""`.

```js
grunt.initConfig({
  html_val: {
    options: {
      attrUppercase: false,
      htmlLang: false,
    },
    src: ['**/*.html']
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
