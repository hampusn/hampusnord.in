const project   = require('./package.json');
const { series, parallel, src, dest, watch } = require('gulp');
const replace   = require('gulp-replace');
const postcss   = require('gulp-postcss');
const cssVars   = require('postcss-css-variables');
const customMedia = require('postcss-custom-media');
const cssimport = require('postcss-import');
const presetenv = require('postcss-preset-env');
const cssnano   = require('cssnano');
const path      = require('path');
const uglify    = require('gulp-uglify');
const concat    = require('gulp-concat');
const imagemin  = require('gulp-imagemin');

const conf = {
  "watch": {
    "css": "./assets/src/css/**/*.css",
    "js": "./assets/src/js/**/*.js"
  },
  "src": {
    "css": "./assets/src/css/main.css",
    "js": ["./assets/src/js/vendor/*.js", "./assets/src/js/utils/*.js", "./assets/src/js/modules/*.js", "./assets/src/js/main.js"],
    "img": "./assets/src/img/*.{jpg,jpeg,png,gif,svg}"
  },
  "dest": {
    "css": "./assets/build/css",
    "js": "./assets/build/js",
    "img": "./assets/build/img"
  },
  "browsers": ['> 1%', 'Last 2 versions', 'IE 10']
};

const css = function css () {
  let now = new Date();

  return src(conf.src.css, { allowEmpty: true })
    .pipe(postcss([
      cssimport(),
      customMedia(),
      cssVars(),
      presetenv({
        "stage": 3,
        "browsers": conf.browsers
      }),
      cssnano({
        "autoprefixer": false
      })
    ]))
    .pipe(replace('{{timestamp}}', now.toString()))
    .pipe(replace('{{version}}', project.version))
    .pipe(dest(conf.dest.css));
};

const js = function js () {
  return src(conf.src.js, { allowEmpty: true })
    .pipe(uglify({
      "output": {
        "comments": "some"
      }
    }))
    .pipe(concat('main.js', {
      "newLine": "\r\n\r\n"
    }))
    .pipe(dest(conf.dest.js));
};

const img = function img () {
  return src(conf.src.img, { allowEmpty: true })
    .pipe(imagemin({
      'optimizationLevel': 5,
      'interlaced': true
    }))
    .pipe(dest(conf.dest.img));
};

const watchCss = function watchCss () {
  return watch(conf.watch.css, series(css));
};

const watchJs = function watchJs () {
  return watch(conf.watch.js, series(js));
};

exports.watch = parallel(watchCss, watchJs);
exports.default = parallel(css, js, img);
