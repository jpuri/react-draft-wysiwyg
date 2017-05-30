var gulp = require('gulp');

var files = ['index.js', 'test/*.js', 'gulpfile.js'];

gulp.task('lint', function (done) {
	var eslint = require('gulp-eslint');

	return gulp.src(files)
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError()).on('error', done);
});

gulp.task('test', function (done) {
	var mocha = require('gulp-mocha');

	return gulp.src('test/*.js', { read: false })
		.pipe(mocha()).on('error', done);
});

gulp.task('default', ['lint', 'test']);

gulp.task('watch', function() {
	gulp.watch(files, ['lint', 'test']);
});
