const gulp = require('gulp');
const less = require('gulp-less');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const ejs = require('gulp-ejs');
const gutil = require('gulp-util');
const concat = require('gulp-concat');
const flatten = require('gulp-flatten');

// Автоперезагрузка при изменении файлов в папке `dist`:
// Принцип: меняем файлы в `/src`, они обрабатываются и переносятся в `dist` и срабатывает автоперезагрузка.
// Это таск нужен только при локальной разработке.
gulp.task('livereload', () => {
    browserSync.create();

browserSync.init({
    server: {
        baseDir: 'dist'
    },
    browser: 'google chrome',
    files: [
        'dist/**/*.*'
    ]
});
});

gulp.task('styles', () => {
    gulp.src('src/*.less')
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(concat("main.css"))
    .pipe(gulp.dest('./dist'));
});

gulp.task('img', () => {
    gulp.src(['src/blocks/**/img/*.*', 'src/img/*.*'],{base:'src'})
    .pipe(flatten({includeParents: 0}))
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('js', () => {
    gulp.src(['src/blocks/**/*.js', 'src/*.js'],{base:'src'})
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('html', () => {
    gulp.src('src/index.ejs')
    .pipe(ejs().on('error', gutil.log))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./dist'));
});

// Отслеживание изменений в файлах, нужно только при локальной разработке
gulp.task('watch', () => {
gulp.watch(['src/*.less', 'src/blocks/**/*.less'], ['styles']);
gulp.watch(['src/*.ejs', 'src/blocks/**/*.ejs'], ['html']);
gulp.watch(['src/img/*.*', 'src/blocks/**/img/*.*'], ['img']);
gulp.watch(['src/*.js', 'src/blocks/**/*.js'], ['js']);
});

gulp.task('default', ['styles', 'html', 'img', 'js', 'livereload', 'watch']);
gulp.task('prod', ['styles', 'html', 'img', 'js']);
