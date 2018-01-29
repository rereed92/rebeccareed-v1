const gulp = require('gulp');

const handlebars = require('gulp-compile-handlebars');

const rename = require('gulp-rename');
const prettyUrl = require('gulp-pretty-url');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

const modernizr = require('gulp-modernizr');

const del = require('del');
const runSequence = require('run-sequence');

const browserSync = require('browser-sync').create();

const paths = {
    src: {
        sass: 'src/styles/**/*.scss',
        css: 'src/styles/css',
        pages: 'src/templates/pages/**/*.hbs',
        partials: 'src/templates/partials',
        scripts: 'src/scripts/**/*.js'
    },
    dist: {
        css: 'dist/css',
        scripts: 'dist/scripts'
    }
};

gulp.task('sass', () => {
    return gulp.src(paths.src.sass)
        .pipe(sass())
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('html', () => {
    return gulp.src(paths.src.pages)
        .pipe(handlebars({}, {
            ignorePartials: true,
            batch: [paths.src.partials],
            helpers : {
                eq : function(a, b, options) {
                    if(a === b) return options.fn(this);
                    else return options.inverse(this);
                }
            }
        }))
        .pipe(rename({
            extname: '.html'
        }))
        .pipe(prettyUrl())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('modernizr', () => {
    return gulp.src(paths.src.scripts)
        .pipe(modernizr())
        .pipe(gulp.dest(paths.dist.scripts))
});

gulp.task('clean:dist', () => {
    return del.sync('dist');
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
});

gulp.task('default', (callback) => {
    runSequence(['modernizr', 'sass', 'html', 'browserSync', 'watch'],
        callback
    )
});

gulp.task('watch', ['clean:dist', 'browserSync', 'modernizr', 'sass', 'html'], () => {
    gulp.watch(paths.src.sass, ['sass']);
    gulp.watch(paths.src.pages, ['html']); 
    gulp.watch(paths.src.partials, ['html']); 
});

gulp.task('build', (callback) => {
    runSequence('clean:dist', 
        ['modernizr', 'sass', 'html'],
        callback
    )
});