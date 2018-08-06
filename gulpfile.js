/*

    Gulpfile de exemplo para algumas ações clássicas de otimização.

*/


var gulp = require('gulp');
var $ = require('gulp-load-plugins')({rename: {'gulp-rev-delete-original':'revdel', 'gulp-if': 'if', 'gulp-babel': 'babel'}});



/* Tasks base */
gulp.task('copy', function() {
    return gulp.src(['site/assets/{img,font}/**/*', 'site/app.yaml', 'site/**/**.json', 'site/workers/**/*.js'], {base: 'site'})
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function(cb) {
    const del = require('del');
    del(['dist/**/*'], cb);
    return gulp.src('dist/', {read: false})
    // return gulp.src('dist/', {read: false})
    //     .pipe($.clean());
});



/* Minificação */
gulp.task('minify-js', function() {
  return gulp.src('site/assets/js/**/*.js')
    .pipe($.babel({
        presets: [['es2015', { modules: false }]],
    }))
    .pipe($.uglify())
    .pipe(gulp.dest('dist/assets/js/'))
});

gulp.task('minify-css', function() {
  return gulp.src('site/**/*.css')
    .pipe($.cssnano({safe: true}))
    .pipe(gulp.dest('dist/'))
});

gulp.task('minify-html', function() {
  return gulp.src('site/**/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
});



/* Concatenação */
gulp.task('useref', function () {
    return gulp.src('site/index.html')
        .pipe($.useref())
        .pipe($.if('*.html', $.inlineSource()))
        .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
        .pipe($.if('*.js', 
            $.babel({
                presets: [['es2015', { modules: false }]],
            })
        ))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano({safe: true})))
        .pipe(gulp.dest('dist'));
});



/* Imagens */
gulp.task('imagemin', function() {
    return gulp.src('site/assets/img/*')
        .pipe($.imagemin({
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ]
        }))
        .pipe(gulp.dest('dist/assets/img'));
});



/* Revisão de arquivos */
gulp.task('rev', function(){
  return gulp.src(['dist/**/*.{css,js,jpg,jpeg,png,svg,json}'])
    .pipe($.rev())
    .pipe($.revdel())
    .pipe(gulp.dest('dist/'))
    .pipe($.rev.manifest())
    .pipe(gulp.dest('dist/'))
})

gulp.task('revreplace', ['rev'], function(){
  return gulp.src(['dist/index.html', 'dist/app.yaml', 'dist/**/*.worker.js', 'dist/**/**.json','dist/**/*.css'])
    .pipe($.revReplace({
        manifest: gulp.src('dist/rev-manifest.json'),
        replaceInExtensions: ['.html', '.yaml', '.js', '.css', '.json']
    }))
    .pipe(gulp.dest('dist/'));
});

/* Configurações de PWA */
gulp.task('pwa', () => {
    // copy folder with scripts
    var path = require('path');
    var swPrecache = require('sw-precache');
    var rootDir = 'dist';

    swPrecache.write(
        path.join(rootDir, 'sw.worker.js'),
        {  
            staticFileGlobs: [rootDir + '/**/*.{js,html,css,png,jpg,jpeg,gif,svg,eot,ttf,woff,woff2}'],
            stripPrefix: rootDir,
            // importScripts: ['fileToImport.js']
        },
        () => {
            console.log('Criado com sucesso!')
        }
    );
});


/* Alias */
gulp.task('minify', ['minify-js', 'minify-css', 'minify-html']);
gulp.task('build', $.sequence(['minify-js', 'minify-css', 'imagemin'], 'useref', 'revreplace'));
gulp.task('default', $.sequence('clean', 'copy', 'build'));


