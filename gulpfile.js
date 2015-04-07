var fs          = require('fs');

var gulp        = require('gulp'),
    mustache    = require('gulp-mustache-plus');

var es          = require('event-stream');

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

gulp.task('colorize', function () {
  var colors = [
    { name: 'none', value: 'none' },
    { name: 'red', value: 'hsl(0, 100%, 30%)' },
    { name: 'yellow', value: 'hsl(42, 100%, 54%)' },
    { name: 'blue', value: 'hsl(206, 68%, 59%)' },
    { name: 'blue-mid', value: 'hsl(206, 54%, 39%)' },
    { name: 'green', value: 'hsl(79, 100%, 42%)' },
    { name: 'green-mid', value: 'hsl(79, 100%, 38%)' },
    { name: 'green-dark', value: 'hsl(79, 100%, 24%)' },
    { name: 'grey', value: 'hsl(0, 0%, 30%)' },
    { name: 'grey-light', value: 'hsl(0, 0%, 69%)' },
    { name: 'navy', value: 'hsl(201, 100%, 14%)' }
  ];
  var streams = [];

  colors.forEach(function (color) {
    var colorStream = gulp.src('./patterns/*.svg')
      .pipe(mustache({ color: color.value }, { extension: '.svg' }))
      .pipe(gulp.dest('./patterns/' + color.name));

    streams.push(colorStream);
  });

  return es.merge.apply(null, streams);
});