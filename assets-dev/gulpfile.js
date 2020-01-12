// Gulp Vars
var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');



// onError Message
var onError = function(error) {
	notify({
		title: 'Gulp Task Error',
		message: 'Check the console'
	}).write(error);
	console.log(error.toString());
	this.emit('end');
}



// JavaScript Concat and Uglify
gulp.task('javascript', gulp.series( function() {
	return gulp.src([
		'js/addons/**',
		'js/main.js'
	])
		.pipe(plumber({errorHandle: onError}))
		.pipe(concat('main.min.js'))
		.on('error', onError)
		.pipe(gulp.dest('../assets/js'))

		// Uglify
		.pipe(uglify())
		.on('error', onError)
		.pipe(gulp.dest('../assets/js'))

		// Notify
		.pipe(notify({
			title: 'Gulp Task Completed',
			message: 'JavaScript has been compiled'
		}))

		// LiveReload
		.pipe(livereload());
}));



// SASS Compile and Autoprefixer
gulp.task('style', gulp.series( function() {
	return gulp.src('sass/style.scss')
		.pipe(plumber({errorHandle: onError}))
		.pipe(sass({outputStyle: 'compressed'}))
		.on('error', onError)
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('css'))

		// Autoprefixer
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 5 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('../assets/css'))

		// Notify
		.pipe(notify({
			title: 'Gulp Task Completed',
			message: 'Styles have been compiled'
		}))

		// LiveReload
		.pipe(livereload());
}));


// Build All
gulp.task('build', gulp.series('style', 'javascript'));



// Watch
gulp.task('default', gulp.series( function() {
		livereload.listen();
		gulp.watch('sass/**/*.scss', gulp.series(['style'])); // Watch SCSS
		gulp.watch('js/**/*.js', gulp.series(['javascript'])); // Watch JS
	}
));
