var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    inject = require('gulp-inject'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    // uglify = require('gulp-uglify'),
    // minifyCss = require('gulp-clean-css'),
    browserSync = require('browser-sync').create();

gulp.task('scripts', function () {
    return gulp.src(["./src/**/*.js"])
        .pipe(gulp.dest('./tmp')
        );
});


gulp.task('styles', function () {
    return gulp.src(["./src/**/*.css"])
        .pipe(gulp.dest('./tmp'));
});

gulp.task('inject', ['scripts', 'styles'], function () {
    var sources = gulp.src(["./tmp/**/*.{css,js}"], { read: false });
    return gulp.src('./src/index.html')
        .pipe(wiredep())
        .pipe(inject(sources, {
            ignorePath: '/tmp'
        }))
        .pipe(gulp.dest('./tmp'));
});

gulp.task('useref', ['inject'], function () {
    return gulp.src('./tmp/index.html')
        .pipe(useref())
        // .pipe(gulpif('*.js', uglify()))
        // .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['useref'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('serve', ['useref'], function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch(["./src/**/*.{html,htm,css,js}"], ['watch']);
});

