const {src, dest, parallel} = require('gulp');
const htmlreplace = require('gulp-html-replace');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const htmlTask = function(){
  return src('src/*.html')
  .pipe(htmlreplace({
    'css': 'style.css'
  }))
  .pipe(dest('dist/'));
};
const styleTask = function(){
  return src('src/*.css')
  .pipe(concat('style.css'))
  .pipe(cleanCSS())
  .pipe(dest('dist/'));
};
const jsTask = function(){
  return src('src/*.js')
  .pipe(uglify())
  .pipe(dest('dist/'));
};
exports.default = parallel(htmlTask, styleTask, jsTask);
