const {src, dest, series, parallel} = require('gulp');
const uglify = require('gulp-uglify')
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const htmlTask = function(){
  return src('src/*.html').pipe(dest('dist/'));
};
const styleTask = function(){
  return src('src/*.css')
  .pipe(concat('styles.css'))
  .pipe(cleanCSS())
  .pipe(dest('dist/'));
};
const jsTask = function(){
  return src('src/*.js')
  .pipe(uglify())
  .pipe(dest('dist/'));
};
exports.default = parallel(htmlTask, styleTask, jsTask);
