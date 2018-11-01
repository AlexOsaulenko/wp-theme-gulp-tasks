var fs = require( 'fs' );
var gulp = require( 'gulp' );
var plugins = require( 'gulp-load-plugins' )( {
	rename: {
		'gulp-line-ending-corrector': 'lec',
		'gulp-clean-css': 'minify',
	}
} );

global.bs = require( 'browser-sync' );
global.config = JSON.parse( fs.readFileSync( './gulp/config/config.json' ) );

function getTask( task ) {
	return require( './gulp/tasks/' + task )( gulp, plugins );
}

gulp.task( 'sass', getTask( 'sass' ) );
gulp.task( 'replace', getTask( 'newtheme' ) );
gulp.task( 'sass-skin', getTask( 'sass-skin' ) );
gulp.task( 'css-rtl', getTask( 'css-rtl' ) );

gulp.task( 'default-skin', [ 'sass-skin' ], function () {
	bs.init( config.browserSync );
	gulp.watch( config.root.themePath + config.root.themeName + config.skin.path + config.skin.name + config.skin.watch, [ 'sass-skin' ] );
} );

gulp.task( 'default', [ 'sass' ], function () {
	bs.init( config.browserSync );
	gulp.watch( config.root.themePath + config.root.themeName + config.sass.watch, [ 'sass' ] );
} );




