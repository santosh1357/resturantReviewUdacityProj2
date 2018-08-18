var gulp = require('gulp');
var sass = require('gulp-sass');
var bs = require('browser-sync').create();
var reload = bs.reload;

gulp.task('styles', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'))
        .pipe(bs.reload({stream:true}));
});

gulp.task('serve', ['styles'], function() {
     bs.init({
            port: 8000,
            server: "./"
        });

    gulp.watch('./sass/*.scss', ['styles']);
    gulp.watch('./css/*.css').on('change', reload);
    gulp.watch("*.html").on('change', reload);
});

gulp.task('default', ['serve']);