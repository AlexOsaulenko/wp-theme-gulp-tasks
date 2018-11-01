module.exports = function ( gulp, plugins ) {
	return function () {
		gulp.src( config.root.themePath + config.root.themeName + config.sass.source )
			.pipe( plugins.plumber( {
				errorHandler: plugins.notify.onError( {
					title: "Sass compile error", message: onError
				} )
			} ) )
			.pipe( plugins.sourcemaps.init( {
				loadMaps: true,
				largeFile: true,
				identityMap: true
			} ) )
			.pipe( plugins.sass( { outputStyle: "expanded", linefeed: "lf" } ) )
			.pipe( plugins.autoprefixer( [ 'last 2 versions' ] ) )
			.pipe( plugins.notify( 'Sass compiled' ) )
			.pipe( plugins.sourcemaps.write( "./" ) )
			.pipe( plugins.lec( { eolc: 'CRLF', encoding: 'utf8' } ) )
			.pipe( plugins.if( config.sass.minify, plugins.minify() ) )
			.pipe( gulp.dest( config.root.themePath + config.root.themeName ) )
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