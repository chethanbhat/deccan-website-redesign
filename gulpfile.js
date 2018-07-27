const gulp = require('gulp');
const bs = require('browser-sync').create();
const pug = require('gulp-pug');
const stylus = require('gulp-stylus')
const minifyCSS = require('gulp-csso');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');

// Static server
gulp.task('browser-sync', function () {
    bs.init({
        server: {
            baseDir: "build"
        }
    });
});

gulp.task('compile-html', function () {
    gulp.src('src/templates/**/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build'));
})

gulp.task('compile-css', function () {
    gulp.src('src/css/*.styl')
        .pipe(stylus())
        .pipe(minifyCSS())
        .pipe(gulp.dest('build/css'));
    gulp.src('src/css/*.css')
        .pipe(gulp.dest('build/css'));
});

gulp.task('compile-js', function () {
    gulp.src('src/js/*.js')
        // .pipe(sourcemaps.init())
        // .pipe(concat('index.min.js'))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'))
});

gulp.task('compile-image', () =>
    gulp.src('src/images/**/*.*')
    // .pipe(imagemin())
    .pipe(gulp.dest('build/images'))
);

const watchHtml = gulp.watch('src/templates/*.pug', ['compile-html']);
watchHtml.on('change', bs.reload);

const watchCSS = gulp.watch('src/css/*.styl', ['compile-css']);
watchCSS.on('change', bs.reload);

const watchJS = gulp.watch('src/js/*.js', ['compile-js']);
watchJS.on('change', bs.reload);

const watchImages = gulp.watch('src/images/*', ['compile-image']);
watchImages.on('change', bs.reload);

gulp.task('default', ['compile-html', 'compile-css', 'compile-js', 'compile-image', 'browser-sync']);