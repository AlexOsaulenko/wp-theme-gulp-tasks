module.exports = function ( gulp, plugins ) {
	return function () {
		gulp.src( config.root.themePath + config.root.themeName + config.skin.path + config.skin.name + config.skin.source )
			.pipe( plugins.plumber( {
				errorHandler: plugins.notify.onError( {
					title: "Skin scss error", message: onError
				} )
			} ) )
			.pipe( plugins.sourcemaps.init( {
				loadMaps: true,
				largeFile: true,
				identityMap: true
			} ) )
			.pipe( plugins.sass( { outputStyle: "expanded", linefeed: "lf" } ) )
			.pipe( plugins.autoprefixer( [ 'last 2 versions' ] ) )
			.pipe( plugins.notify( 'Skin scss complete' ) )
			.pipe( plugins.sourcemaps.write( "./" ) )
			.pipe( plugins.lec( { eolc: 'CRLF', encoding: 'utf8' } ) )
			.pipe( plugins.if( config.sass.minify, plugins.minify() ) )
			.pipe( plugins.rename( config.skin.styleFileName ) )
			.pipe( gulp.dest( config.root.themePath + config.root.themeName + config.skin.path + config.skin.name ) )
			.pipe( bs.stream() );
	};
};

var onError = function ( error ) {
	return error.messageOriginal ?
		"File: " + error.file +
		"\rAt: " + error.line + error.column +
		"\r" + error.messageOriginal :
		error;
};