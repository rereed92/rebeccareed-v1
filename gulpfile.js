const gulp = require('gulp');

const handlebars = require('gulp-compile-handlebars');

const rename = require('gulp-rename');
const prettyUrl = require('gulp-pretty-url');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');

const modernizr = require('gulp-modernizr');
const babelify   = require('babelify');
const browserify = require('gulp-browserify')
const uglify = require('gulp-uglify');
const minify = require('gulp-uglify');

const svgSprite = require('gulp-svg-sprite');

const del = require('del');
const runSequence = require('run-sequence');

const browserSync = require('browser-sync').create();

const paths = {
    src: {
        sass: 'src/styles/**/*.scss',
        fonts: 'src/fonts/**',
        images: 'src/images/**',
        sprites: 'src/sprites/**/*.svg',
        pages: 'src/templates/pages/**/*.hbs',
        partial: 'src/templates/partials',
        partials: 'src/templates/partials/**/*.hbs',
        scripts: 'src/scripts/**/*.js'
    },
    dist: {
        css: 'dist/css',
        fonts: 'dist/fonts',
        images: 'dist/images',
        sprites: 'dist/sprite',
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

gulp.task('scripts', () => {
    return gulp.src('src/scripts/main.js')
        .pipe(browserify({
            includeGlobals: false,
            transform: ['babelify'],
        }))
        .pipe(minify())
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('sprite', () => {
    return gulp.src(paths.src.sprites)
        .pipe(svgSprite({
            mode: {
                symbol: {
                    dest: '.',
                    inline: true
                }
            },
            shape: {
                id: {separator: '-'},
                transform: ['svgo']
            }
        }))
        .pipe(gulp.dest(paths.dist.sprites))
});

gulp.task('modernizr', () => {
    return gulp.src(paths.src.scripts)
        .pipe(modernizr())
        .pipe(uglify())
        .pipe(gulp.dest(paths.dist.scripts))
});

gulp.task('copy-fonts', function() {
    return gulp.src(paths.src.fonts)
        .pipe(gulp.dest(paths.dist.fonts));
});

gulp.task('copy-images', function() {
    return gulp.src(paths.src.images)
        .pipe(gulp.dest(paths.dist.images));
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
    runSequence(['modernizr', 'sass', 'html', 'browserSync', 'watch', 'scripts'],
        callback
    )
});

gulp.task('watch', ['clean:dist', 'browserSync', 'modernizr', 'copy-fonts', 'copy-images', 'sprite', 'sass', 'html', 'scripts'], () => {
    gulp.watch(paths.src.sass, ['sass']);
    gulp.watch(paths.src.pages, ['html']); 
    gulp.watch(paths.src.partials, ['html']); 
    gulp.watch(paths.src.scripts, ['scripts']);
    gulp.watch(paths.src.sprites, ['sprite']);
    gulp.watch(paths.src.fonts, ['copy-fonts']);
    gulp.watch(paths.src.images, ['copy-images']);
});

gulp.task('build', (callback) => {
    runSequence('clean:dist', 
        ['modernizr', 'copy-fonts', 'copy-images', 'sprite', 'sass', 'html', 'scripts'],
        callback
    )
});