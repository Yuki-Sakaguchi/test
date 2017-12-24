// plugins
var gulp = require('gulp'),
    pug = require('gulp-pug'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    typescript = require('gulp-typescript'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    server = require('gulp-webserver'),
    imagemin = require('gulp-imagemin'),
    imageminPngquant = require('imagemin-pngquant');


// path
var path = {
    source: './src',
    public: './public'
};


/**
 * pugのコンパイル
 */
gulp.task('pug', function() {
    gulp.src(path.source + '/pug/pages/**/*.pug')
    .pipe(plumber({
        errorHandler: function(err) {
            console.log(err.messageFormatted);
            return this.emit('end');
        }
    }))
    .pipe(pug({pretty: '    '}))
    .pipe(gulp.dest(path.public));
});


/**
 * webpack（jsのモジュール管理）
 */
gulp.task('js', function() {
  gulp.src(path.source + '/js/**/*.js')
  .pipe(plumber({
      errorHandler: function(err) {
          console.log(err.messageFormatted);
          return this.emit('end');
      }
  }))
  .pipe(gulp.dest(path.public + '/js/'));
});


/**
 * scssのコンパイル
 */
gulp.task('scss', function() {
    var supportBrowser = ['> 1% in JP'],
        postcssPlugins = [
            // require('doiuse')(supportBrowser),
            require('autoprefixer')(supportBrowser),
            require('postcss-sorting')
        ];

    gulp.src(path.source + '/scss/**/*.scss')
    .pipe(plumber({
        errorHandler: function(err) {
            console.log(err.messageFormatted);
            return this.emit('end');
        }
    }))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(postcss(postcssPlugins))
    .pipe(gulp.dest(path.public + '/css/'));
});


/**
 * imageの圧縮
 */
gulp.task('imagemin', function() {
    gulp.run('imagemin-jpg');
    gulp.run('imagemin-png');
});

gulp.task('imagemin-jpg', function() {
    // jpg, gif, svg, ico
    gulp.src(path.source + '/images/**/*.+(jpg|gif|svg|ico)')
    .pipe(imagemin({
        optimizationLevel: 7
    }))
    .pipe(gulp.dest(path.public + '/images/'));
});

gulp.task('imagemin-png', function() {
    // png
    gulp.src(path.source + '/images/**/*.png')
   .pipe(imagemin(
       [imageminPngquant({
           quality: '70-95',
           speed: 4
        })]
    ))
    .pipe(imagemin())
    .pipe(gulp.dest(path.public + '/images/'));
});


/**
 * webserverの起動
 */
gulp.task('webserver', function() {
    gulp.src(path.public)
    .pipe(server({
        // livereload: true, // 自動更新
        open: true // 自動でブラウザで開く
    }));
});


/**
 * watch
 */
gulp.task('watch', function() {
    gulp.watch(path.source + '/pug/**/*.pug', ['pug']);
    gulp.watch(path.source + '/js/**/*.js', ['js']);
    gulp.watch(path.source + '/scss/**/*.scss', ['scss']);
});


/**
 * default
 *   サーバを立ち上げて、ファイルの監視をする
 */
gulp.task('default', ['webserver', 'watch']);
