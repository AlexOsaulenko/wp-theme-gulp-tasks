module.exports = function (gulp, plugins) {
	return function () {
		gulp.src(config.root.themePath + config.root.themeName + config.rtl.source )
			.pipe( plugins.plumber( {
				errorHandler: plugins.notify.onError( {
					title: "SASS error", message: onError
				} )
			} ) )
			.pipe(plugins.rtlcss())
			.pipe( plugins.rename( config.rtl.styleFileName ) )
			.pipe(gulp.dest(config.root.themePath + config.root.themeName + config.rtl.path ))
	};
};

var onError = function (error) {
	return error.messageOriginal ?
		"File: " + error.file +
		"\rAt: " + error.line + error.column +
		"\r" + error.messageOriginal :
		error;
};