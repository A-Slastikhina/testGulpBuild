
//подключение модулей
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const del = require('del')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require ('gulp-uglify')

//пути к изначальным файлам и пути мест назначения
const paths = {
    styles: {
        src: 'src/styles/**/*.sass',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/scripts/**/*.js',
        dest: 'dist/js/'
    }
}

//задача по очистке каталога
function clean () {
    return del(['dist'])
}

//задача для обработки стилей//
function styles () {
    return gulp.src(paths.styles.src)
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(rename({
            basename: 'main',
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.styles.dest))
}

function scripts (){
    return gulp.src(paths.scripts.src,{
        sourcemaps: true
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest))
}

function watch() {
    gulp.watch(paths.styles.src, styles)
    gulp.watch(paths.scripts.src, scripts)
}

const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)


exports.clean = clean
exports.styles = styles
exports.watch = watch
exports.build = build
exports.default = build
exports.scripts = scripts