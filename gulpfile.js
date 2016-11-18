var gulp = require('gulp'),
    wiredep = require('wiredep').stream,
    inject = require('gulp-inject'),
    gulpif = require('gulp-if'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    browserSync = require('browser-sync').create(),
    templateCache = require('gulp-angular-templatecache'),
    clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src(['./tmp', './dist'], { read: false })
        .pipe(clean());
});

gulp.task('templates', function () {
    return gulp.src(['./src/**/*.html', '!./src/index.html'])
        .pipe(templateCache('templates.js', { standalone: true, module: 'templates' }))
        .pipe(gulp.dest('./tmp'));
});

gulp.task('scripts', function () {
    return gulp.src(["./src/**/*.js"])
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./tmp')
        );
});

gulp.task('styles', function () {
    return gulp.src(["./src/**/*.css"])
        .pipe(gulp.dest('./tmp'));
});

gulp.task('inject', ['scripts', 'styles', 'templates'], function () {
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
        // .pipe(gulpif('**/*.js', uglify()))
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
        },
        port: 8269
    });

    gulp.watch(["./src/**/*.{html,htm,css,js}"], ['watch']);
});

