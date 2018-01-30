const gulp = require('gulp');

const handlebars = require('gulp-compile-handlebars');

const rename = require('gulp-rename');
const prettyUrl = require('gulp-pretty-url');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

const modernizr = require('gulp-modernizr');
const uglify = require('gulp-uglify');
const minify = require('gulp-uglify');

const del = require('del');
const runSequence = require('run-sequence');

const browserSync = require('browser-sync').create();

const paths = {
    src: {
        sass: 'src/styles/**/*.scss',
        fonts: 'src/fonts/**',
        pages: 'src/templates/pages/**/*.hbs',
        partial: 'src/templates/partials',
        partials: 'src/templates/partials/**/*.hbs',
        scripts: 'src/scripts/**/*.js'
    },
    dist: {
        css: 'dist/css',
        fonts: 'dist/fonts',
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
            batch: [paths.src.partial],
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
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.scripts))
});

gulp.task('copy:fonts', function() {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dist.fonts));
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

gulp.task('watch', ['clean:dist', 'browserSync', 'modernizr', 'copy:fonts', 'sass', 'html'], () => {
    gulp.watch(paths.src.sass, ['sass']);
    gulp.watch(paths.src.pages, ['html']); 
    gulp.watch(paths.src.partials, ['html']); 
});

gulp.task('build', (callback) => {
    runSequence('clean:dist', 
        ['modernizr', 'copy:fonts', 'sass', 'html'],
        callback
    )
});