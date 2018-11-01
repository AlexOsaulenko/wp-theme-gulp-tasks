module.exports = function ( gulp, plugins ) {
	return function () {
		gulp.src( [ config.root.themePath + config.root.themeName + "**/*[.php, .js, .scss, .css, .pot, .xml, .json]" ] )
			.pipe( plugins.replace( config.replace.oldtheme, config.replace.newtheme ) )
			.pipe( plugins.replace( config.replace.OldTheme, config.replace.NewTheme ) )
			.pipe( plugins.replace( config.replace.OLDTHEME, config.replace.NEWTHEME ) )
			.pipe( gulp.dest( config.root.themePath + config.root.themeName ) )
	}
};