const project   = require('./package.json');
const gulp      = require('gulp');
const replace   = require('gulp-replace');
const postcss   = require('gulp-postcss');
const cssimport = require('postcss-import');
const cssnext   = require('postcss-cssnext');
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

gulp.task('css', () => {
  let now = new Date();

  return gulp.src(conf.src.css)
    .pipe(postcss([
      cssimport(),
      cssnext({
        "autoprefixer": {
          "browsers": conf.browsers
        }
      }),
      cssnano({
        "autoprefixer": false
      })
    ]))
    .pipe(replace('{{timestamp}}', now.toString()))
    .pipe(replace('{{version}}', project.version))
    .pipe(gulp.dest(conf.dest.css));
});

gulp.task('js', () => {
  return gulp.src(conf.src.js)
    .pipe(uglify({
      "output": {
        "comments": "some"
      }
    }))
    .pipe(concat('main.js', {
      "newLine": "\r\n\r\n"
    }))
    .pipe(gulp.dest(conf.dest.js));
});

gulp.task('img', () => {
  return gulp.src(conf.src.img)
    .pipe(imagemin({
      'optimizationLevel': 5,
      'interlaced': true
    }))
    .pipe(gulp.dest(conf.dest.img));
});

gulp.task('watch-css', () => {
  return gulp.watch(conf.watch.css, ['css']);
});

gulp.task('watch-js', () => {
  return gulp.watch(conf.watch.js, ['js']);
});

gulp.task('watch', ['watch-css', 'watch-js']);

gulp.task('default', ['css', 'js', 'img']);
