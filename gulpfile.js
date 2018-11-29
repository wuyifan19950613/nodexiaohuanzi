const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const plumber = require('gulp-plumber');
const imagemin = require('gulp-imagemin');
const spritesmith = require('gulp.spritesmith');
const reload = browserSync.reload;
const distDir = './public';
const srcDir = './client';

// sass转换css格式及压缩
gulp.task('sass', () => {
  return gulp.src([srcDir + '/css/*.scss'])
    .pipe(plumber())
    //.pipe(sourcemaps.init()) // 控制台css显示方式
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(distDir + '/css'))
    .pipe(reload({
      stream: true
    }));
});

// css copy
gulp.task('css', function() {
  return gulp.src([srcDir + '/css/*.css'])
    .pipe(gulp.dest(distDir + '/css'))
    .pipe(reload({
      stream: true
    }));
});

// sprite打包（开发模式）
gulp.task('dev_sprite', function() {
  return gulp.src([srcDir + '/images/icon/*']) //需要合并的图片地址
    .pipe(spritesmith({
      imgName: '../images/sprite.png', //保存合并后图片的地址
      cssName: '../css/sprite.css', //保存合并后对于css样式的地址
      padding: 5, //合并时两个图片的间距
      algorithm: 'binary-tree', //注释1
    }))
    .pipe(gulp.dest(distDir + '/images/'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('copy', function() {
  return gulp.src([srcDir + '/images/**/'])
    .pipe(gulp.dest(distDir + '/images/'))
    .pipe(reload({
      stream: true
    }));
});

// html拷贝及压缩
gulp.task('html', () => {
  var htmlminOptions = {
    //removeComments: true,               //清除HTML注释
    //collapseWhitespace: true,           //压缩HTML
    //collapseBooleanAttributes: true,    //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    ///removeScriptTypeAttributes: true,   //删除<script>的type="text/javascript"
    //removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    //minifyJS: false,                    //压缩页面JS
    minifyCSS: false //压缩页面CSS
  };
  return gulp.src(srcDir + '/*.html')
    // .pipe(plumber())
    // .pipe(pug({pretty:true}))
    // .pipe(htmlmin(htmlminOptions))
    .pipe(gulp.dest(distDir))
    .pipe(reload({
      stream: true
    }));
});

// 启动服务
gulp.task('server', ['dev_sprite', 'sass', 'copy','css', 'html'], () => {
  browserSync.init({
    server: distDir
  });
  // 监听改变
  // gulp.watch(srcDir + '/js/**/*', ['babel']);
  gulp.watch(srcDir + '/css/**/*.scss', ['sass']);
  gulp.watch(srcDir + '/css/**/*.css', ['css']);
  gulp.watch(srcDir + '/**/*.html', ['html']);
  gulp.watch(srcDir + '/images/*', ['copy']);
  // gulp.watch(srcDir + '/h-ui/**', ['copylayer']);
  // gulp.watch(srcDir + '/h/**', ['h']);

});
