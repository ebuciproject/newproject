var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    del = require('del');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
    notify: false
  });
});

gulp.task('sass', function() {
  return gulp.src('src/sass/**/*.sass')
    .pipe(sass({outputStyles: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['sass', 'browser-sync'], function() {
  gulp.watch('src/**/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
  gulp.watch('src/sass/**/*.sass', ['sass']);
});

gulp.task('clear', function() {
  del.sync('design');
});

gulp.task('build', ['sass', 'clear'], function() {
  var html = gulp.src('src/**/*.html').pipe(gulp.dest('design'));
  var css = gulp.src('src/css/**/*.css').pipe(gulp.dest('design/css'));
  var libs = gulp.src('src/libs/**/*.*').pipe(gulp.dest('design/libs'));
  var img = gulp.src('src/img/**/*.*').pipe(gulp.dest('design/img'));
});