var fs          = require('fs');

var gulp        = require('gulp'),
    mustache    = require('gulp-mustache-plus');

var http        = require('http'),
    connect     = require('connect'),
    serveStatic = require('serve-static');

var app = connect().use(serveStatic(__dirname));

gulp.task('build', function () {
  var patterns = fs.readdirSync('./patterns').map(function (filename) {
    return {
      name: filename.split('.').shift(),
      value: fs.readFileSync('./patterns/' + filename, { encoding: 'utf8' }).replace(/\n/g, ' ')
    };
  });

  return gulp.src('./src/*.mustache')
    .pipe(mustache({ patterns: patterns }, { extension: '.js' }))
    .pipe(gulp.dest('.'));
});

gulp.task('serve', function () {
  http.createServer(app).listen(8000);
});




