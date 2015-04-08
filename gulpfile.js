var fs          = require('fs');

var gulp        = require('gulp'),
    mustache    = require('gulp-mustache-plus');

var es          = require('event-stream');

var http        = require('http'),
    connect     = require('connect'),
    serveStatic = require('serve-static');

var app = connect().use(serveStatic(__dirname));

gulp.task('build', function () {
  var patterns = fs.readdirSync('./patterns/none').map(function (filename) {
    return {
      name: filename.split('.').shift(),
      value: fs.readFileSync('./patterns/none/' + filename, { encoding: 'utf8' }).replace(/\n/g, ' ')
    };
  });

  return gulp.src('./src/*.mustache')
    .pipe(mustache({ patterns: patterns }, { extension: '.js' }))
    .pipe(gulp.dest('.'));
});

gulp.task('serve', function () {
  http.createServer(app).listen(8000);
});

gulp.task('positioned', function () {
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

  var paths = [
    { name: 'app-dev', value: 'M 18,50.5 A 7.5,7.5 0 0 1 10.5,58 7.5,7.5 0 0 1 3,50.5 7.5,7.5 0 0 1 10.5,43 7.5,7.5 0 0 1 18,50.5 Z m 20,0 A 7.5,7.5 0 0 1 30.5,58 7.5,7.5 0 0 1 23,50.5 7.5,7.5 0 0 1 30.5,43 7.5,7.5 0 0 1 38,50.5 Z m 20,0 A 7.5,7.5 0 0 1 50.5,58 7.5,7.5 0 0 1 43,50.5 7.5,7.5 0 0 1 50.5,43 7.5,7.5 0 0 1 58,50.5 Z m 0,-40 A 7.5,7.5 0 0 1 50.5,18 7.5,7.5 0 0 1 43,10.5 7.5,7.5 0 0 1 50.5,3 7.5,7.5 0 0 1 58,10.5 Z m -20,0 A 7.5,7.5 0 0 1 30.5,18 7.5,7.5 0 0 1 23,10.5 7.5,7.5 0 0 1 30.5,3 7.5,7.5 0 0 1 38,10.5 Z m -20,0 A 7.5,7.5 0 0 1 10.5,18 7.5,7.5 0 0 1 3,10.5 7.5,7.5 0 0 1 10.5,3 7.5,7.5 0 0 1 18,10.5 Z m 0,20 A 7.5,7.5 0 0 1 10.5,38 7.5,7.5 0 0 1 3,30.5 7.5,7.5 0 0 1 10.5,23 7.5,7.5 0 0 1 18,30.5 Z m 40,0 A 7.5,7.5 0 0 1 50.5,38 7.5,7.5 0 0 1 43,30.5 7.5,7.5 0 0 1 50.5,23 7.5,7.5 0 0 1 58,30.5 Z m -20,0 A 7.5,7.5 0 0 1 30.5,38 7.5,7.5 0 0 1 23,30.5 7.5,7.5 0 0 1 30.5,23 7.5,7.5 0 0 1 38,30.5 Z m 2.5,-30 0,59.5 m -20,-59.5 0,59.5 m -20,-19.5 59.5,0 m -59.5,-20 59.5,0 m 0,-20 -59.5,0 0,59.5', line_cap: 'square' },
    { name: 'business-process', value: 'm 30.5,53 0,7.5 m 7.5,0 c 0,-4.3 3.5,-7.5 7.5,-7.5 4,0 7.5,3 7.5,7.5 M 60.5,53 C 56.5,53 53,49.5 53,45.5 53,41.2 56.5,38 60.5,38 m 0,-15 C 56.5,23 53,19.5 53,15.5 53,11.2 56.5,8 60.5,8 m 0,-7.5 -7.5,0 C 53,4.5 49.5,8 45.5,8 41.5,8 38,4.5 38,0.5 l -15,0 C 23,4.5 19.5,8 15.5,8 11.5,8 8,4.5 8,0.5 l -7.5,0 0,7.5 C 4.5,8 8,11 8,15.5 8,19.5 4.5,23 0.5,23 l 0,15 c 4,0 7.5,3 7.5,7.5 0,4 -3.5,7.5 -7.5,7.5 l 0,7.5 m 7.5,0 c 0,-4.3 3.5,-7.5 7.5,-7.5 4,0 7.5,3 7.5,7.5 m 15,-15 15,0 m -45,0 15,0 m 30,-15 c 0,4 -3.5,7.5 -7.5,7.5 -4,0 -7.5,-3.5 -7.5,-7.5 0,-4.3 3.5,-7.5 7.5,-7.5 4,0 7.5,3 7.5,7.5 z m -15,-15 c 0,4 -3.5,7.5 -7.5,7.5 -4,0 -7.5,-3.5 -7.5,-7.5 0,-4.3 3.5,-7.5 7.5,-7.5 4,0 7.5,3 7.5,7.5 z m 0,30 c 0,4 -3.5,7.5 -7.5,7.5 -4,0 -7.5,-3.5 -7.5,-7.5 0,-4.3 3.5,-7.5 7.5,-7.5 4,0 7.5,3 7.5,7.5 z m 0,-30 15,0 m -45,0 15,0 m 0,15 15,0 m -37.5,0 7.5,0 m 22.5,-7.5 0,15 m 0,-37.5 0,7.5 m 15,30 0,15 m 0,-45 0,15 m -30,15 0,15 m 0,-45 0,15 M 23,30.5 C 23,34.5 19.5,38 15.5,38 11.5,38 8,34.5 8,30.5 8,26.2 11.5,23 15.5,23 c 4,0 7.5,3 7.5,7.5 z m 30,0 7.5,0', line_cap: 'square' },
    { name: 'cloud-dev', value: 'M 30.5,0 C 30.5,4.1 27.1,7.5 23,7.5 18.9,7.5 15.5,4.1 15.5,0 m 0,60 c 0,-4.1 3.4,-7.5 7.5,-7.5 4.1,0 7.5,3.4 7.5,7.5 m -15,-50 c 0,4.14 -3.36,7.5 -7.5,7.5 C 3.858,17.5 0.5,14.14 0.5,10 0.5,5.858 3.858,2.5 8,2.5 c 4.14,0 7.5,3.358 7.5,7.5 z m 29.33,0 c 0,4.14 -3.36,7.5 -7.5,7.5 -4.14,0 -7.5,-3.36 -7.5,-7.5 0,-4.142 3.36,-7.5 7.5,-7.5 4.14,0 7.5,3.358 7.5,7.5 z M 30.5,20 c 0,4.14 -3.36,7.5 -7.5,7.5 -4.14,0 -7.5,-3.36 -7.5,-7.5 0,-4.14 3.36,-7.5 7.5,-7.5 4.14,0 7.5,3.36 7.5,7.5 z m 0,20 c 0,4.14 -3.36,7.5 -7.5,7.5 -4.14,0 -7.5,-3.36 -7.5,-7.5 0,-4.14 3.36,-7.5 7.5,-7.5 4.14,0 7.5,3.36 7.5,7.5 z m 14,20 c 0,-4.1 3.4,-7.5 7.5,-7.5 4.1,0 7.5,3.4 7.5,7.5 m 0,-60 C 59.5,4.1 56.1,7.5 52,7.5 47.9,7.5 44.5,4.1 44.5,0 m 15,20.5 c 0,4.14 -3.36,7.5 -7.5,7.5 -4.14,0 -7.5,-3.36 -7.5,-7.5 0,-4.14 3.36,-7.5 7.5,-7.5 4.14,0 7.5,3.36 7.5,7.5 z m 0,20 c 0,4.14 -3.36,7.5 -7.5,7.5 -4.14,0 -7.5,-3.36 -7.5,-7.5 0,-4.14 3.36,-7.5 7.5,-7.5 4.14,0 7.5,3.36 7.5,7.5 z M 15.5,30 c 0,4.14 -3.36,7.5 -7.5,7.5 -4.142,0 -7.5,-3.36 -7.5,-7.5 0,-4.14 3.358,-7.5 7.5,-7.5 4.14,0 7.5,3.36 7.5,7.5 z m 29.33,0 c 0,4.14 -3.36,7.5 -7.5,7.5 -4.14,0 -7.5,-3.36 -7.5,-7.5 0,-4.14 3.36,-7.5 7.5,-7.5 4.14,0 7.5,3.36 7.5,7.5 z m 0,20 c 0,4.14 -3.36,7.5 -7.5,7.5 -4.14,0 -7.5,-3.36 -7.5,-7.5 0,-4.14 3.36,-7.5 7.5,-7.5 4.14,0 7.5,3.36 7.5,7.5 z M 15.5,50 c 0,4.14 -3.36,7.5 -7.5,7.5 -4.142,0 -7.5,-3.36 -7.5,-7.5 0,-4.14 3.358,-7.5 7.5,-7.5 4.14,0 7.5,3.36 7.5,7.5 z M 8,0 8,2.5 m 0,15 0,5 m 0,15 0,5 m 0,15 0,2.5 m 29.33,-60 0,2.5 m 0,15 0,5 m 0,15 0,5 m 0,15 0,2.5 M 23,7.5 l 0,5 m 0,15 0,5 m 0,15 0,5 m 29,-45 0,5.5 m 0,15 0,5 m 0,15 0,4.5', line_cap: 'square' },
    { name: 'cloud-infrastructure', value: 'M 60,10 A 10,10 0 0 0 50,0 10,10 0 0 0 40,10 10,10 0 0 0 50,20 10,10 0 0 0 60,10 Z M 40,10 A 10,10 0 0 0 30,0 10,10 0 0 0 20,10 10,10 0 0 0 30,20 10,10 0 0 0 40,10 Z M 20,10 A 10,10 0 0 0 10,0 10,10 0 0 0 0,10 10,10 0 0 0 10,20 10,10 0 0 0 20,10 Z M 60,30 A 10,10 0 0 0 50,20 10,10 0 0 0 40,30 10,10 0 0 0 50,40 10,10 0 0 0 60,30 Z M 40,30 A 10,10 0 0 0 30,20 10,10 0 0 0 20,30 10,10 0 0 0 30,40 10,10 0 0 0 40,30 Z M 20,30 A 10,10 0 0 0 10,20 10,10 0 0 0 0,30 10,10 0 0 0 10,40 10,10 0 0 0 20,30 Z M 60,50 A 10,10 0 0 0 50,40 10,10 0 0 0 40,50 10,10 0 0 0 50,60 10,10 0 0 0 60,50 Z M 40,50 A 10,10 0 0 0 30,40 10,10 0 0 0 20,50 10,10 0 0 0 30,60 10,10 0 0 0 40,50 Z M 20,50 A 10,10 0 0 0 10,40 10,10 0 0 0 0,50 10,10 0 0 0 10,60 10,10 0 0 0 20,50 Z M 50,0 c 0,5.52 4.5,10 10,10 M 30,0 c 0,5.52 4.5,10 10,10 5.5,0 10,-4.48 10,-10 M 10,0 c 0,5.52 4.5,10 10,10 5.5,0 10,-4.48 10,-10 m 30,10 c -5.5,0 -10,4.5 -10,10 0,5.5 4.5,10 10,10 M 50,20 A 10,10 0 0 0 40,10 10,10 0 0 0 30,20 10,10 0 0 0 40,30 10,10 0 0 0 50,20 Z M 30,20 A 10,10 0 0 0 20,10 10,10 0 0 0 10,20 10,10 0 0 0 20,30 10,10 0 0 0 30,20 Z m 30,10 c -5.5,0 -10,4.5 -10,10 0,5.5 4.5,10 10,10 M 50,40 A 10,10 0 0 0 40,30 10,10 0 0 0 30,40 10,10 0 0 0 40,50 10,10 0 0 0 50,40 Z M 30,40 A 10,10 0 0 0 20,30 10,10 0 0 0 10,40 10,10 0 0 0 20,50 10,10 0 0 0 30,40 Z M 0,10 C 5.52,10 10,5.52 10,0 M 0,30 C 5.52,30 10,25.5 10,20 10,14.5 5.52,10 0,10 M 0,50 C 5.52,50 10,45.5 10,40 10,34.5 5.52,30 0,30 m 60,20 c -5.5,0 -10,4.5 -10,10 m 0,0 C 50,54.5 45.5,50 40,50 34.5,50 30,54.5 30,60 m 0,0 C 30,54.5 25.5,50 20,50 14.5,50 10,54.5 10,60 m 0,0 C 10,54.5 5.52,50 0,50', line_cap: 'square' },
    { name: 'community', value: ' m 25.5,27.5 q 0,0 0,0 M 1,57.5 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 4,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 4,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 4,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 2,-5 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -4,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5,0 q 0,0 0,0 m -4.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -4,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -2,-5 q 0,0 0,0 m 5,0 q 0,0 0,0 m 4.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5,0 q 0,0 0,0 m 4.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 4,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 2,-5 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -4,0 q 0,0 0,0 m -5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -4.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -4.5,0 q 0,0 0,0 m -5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -2,-5 q 0,0 0,0 m 5,0 q 0,0 0,0 m 4.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 4,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 4.5,0 q 0,0 0,0 m 5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m -30,-10 q 0,0 0,0 m 0,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -4,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m 2,5 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5,0 q 0,0 0,0 m 4.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 28,5 q 0,0 0,0 m 2,-5 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -4.5,0 q 0,0 0,0 m -5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -2,-5 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 4,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 2,-5 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -4,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -4,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -4,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 M 1,17 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 4,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 4,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 M 57,17 q 0,0 0,0 m -5.5,0 q 0,0 0,0 M 46,17 q 0,0 0,0 m -5,0 q 0,0 0,0 m -7.5,-5 q 0,0 0,0 M 29,12 q 0,0 0,0 m -5.5,0 q 0,0 0,0 M 18,12 q 0,0 0,0 m -4,0 q 0,0 0,0 m -5.5,0 q 0,0 0,0 M 3,12 q 0,0 0,0 M 1,7 q 0,0 0,0 m 5,0 q 0,0 0,0 m 4.5,0 q 0,0 0,0 M 16,7 q 0,0 0,0 m 5,0 q 0,0 0,0 m 4.5,0 q 0,0 0,0 M 31,7 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 15,0 q 0,0 0,0 M 46,7 q 0,0 0,0 m -5,0 q 0,0 0,0 m -2.5,5 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 m 4,0 q 0,0 0,0 m 5.5,0 q 0,0 0,0 M 57,7 q 0,0 0,0 m 2,-5 q 0,0 0,0 m -5,0 q 0,0 0,0 m -4.5,0 q 0,0 0,0 M 44,2 q 0,0 0,0 m -5.5,0 q 0,0 0,0 m -5,0 q 0,0 0,0 M 29,2 q 0,0 0,0 m -5.5,0 q 0,0 0,0 M 18,2 q 0,0 0,0 m -4,0 q 0,0 0,0 M 8.5,2 q 0,0 0,0 M 3,2 q 0,0 0,0', line_cap: 'square' },
    { name: 'corporate', value: 'M 45,0 30,15 15,0 M 60,22.5 52.5,30 60,37.5 M 60,45 45,30 60,15 M 60,7.5 37.5,30 60,52.5 M 45,60 30,45 15,60 M 60,60 0,0 M 22.5,0 30,7.5 37.5,0 M 7.5,0 30,22.5 52.5,0 M 0,15 15,30 0,45 M 22.5,60 30,52.5 37.5,60 M 7.5,60 30,37.5 52.5,60 M 0,37.5 7.5,30 0,22.5 M 0,52.5 22.5,30 0,7.5 M 0,60 60,0', line_cap: 'square' },
    { name: 'infrastructure', value: 'M 37.5,60 30,52.5 22.5,60 M 37.5,0 30,7.5 22.5,0 M 60,37.5 52.5,30 60,22.5 M 60,45 45,60 M 60,15 45,0 M 0,15 15,0 M 0,45 15,60 M 52.5,0 60,7.5 m 0,45 -7.5,7.5 M 7.5,0 0,7.5 m 0,45 7.5,7.5 M 0,37.5 7.5,30 0,22.5 m 30,0 L 22.5,30 30,37.5 37.5,30 Z M 45,37.5 37.5,45 45,52.5 52.5,45 Z M 15,37.5 7.5,45 15,52.5 22.5,45 Z M 45,7.5 37.5,15 45,22.5 52.5,15 Z M 15,7.5 7.5,15 15,22.5 22.5,15 Z M 45,0 0,45 M 60,15 15,60 M 15,0 60,45 M 0,15 45,60', line_cap: 'square' },
    { name: 'management', value: 'M3.5,56.5l8.1-8.1 M18.4,41.6l8.1-8.1 M33.5,26.5 l8.1-8.1 M48.5,11.5l8.1-8.1 M11.6,11.7L3.4,3.5 M26.6,26.7l-8.2-8.2 M41.5,41.6l-8.1-8.1 M56.5,56.6l-8.1-8.1 M33.4,3.4l8.1,8.1 M56.7,26.7l-8.2-8.2 M56.7,33.3l-8.2,8.2 M41.5,48.5l-8.2,8.2 M18.4,48.4l8.4,8.4 M11.6,41.6l-8.3-8.3 M3.3,26.7l8.2-8.2 M26.6,3.4 l-8.1,8.1 M30,35c2.8,0,5-2.2,5-5s-2.2-5-5-5s-5,2.2-5,5S27.2,35,30,35z M45,20c2.8,0,5-2.2,5-5s-2.2-5-5-5s-5,2.2-5,5 S42.2,20,45,20z M45,50c2.8,0,5-2.2,5-5s-2.2-5-5-5s-5,2.2-5,5S42.2,50,45,50z M15,20c2.8,0,5-2.2,5-5s-2.2-5-5-5s-5,2.2-5,5 S12.2,20,15,20z M15,50c2.8,0,5-2.2,5-5s-2.2-5-5-5s-5,2.2-5,5S12.2,50,15,50z M60,25c-2.8,0-5,2.2-5,5s2.2,5,5,5 M55,0 c0,2.8,2.2,5,5,5 M5,60c0-2.8-2.2-5-5-5 M60,55c-2.8,0-5,2.2-5,5 M0,5c2.8,0,5-2.2,5-5 M0,35c2.8,0,5-2.2,5-5s-2.2-5-5-5 M25,0 c0,2.8,2.2,5,5,5s5-2.2,5-5 M35,60c0-2.8-2.2-5-5-5s-5,2.2-5,5 M45,10 M35,15l-5-5l-5,5l5,5L35,15z M50,30l-5-5l-5,5l5,5L50,30z M20,30l-5-5l-5,5l5,5L20,30z M5,15l-5-5l-5,5l5,5L5,15z M20,0l-5-5l-5,5l5,5L20,0z M50,0l-5-5l-5,5l5,5L50,0z M20,60l-5-5l-5,5l5,5 L20,60z M50,60l-5-5l-5,5l5,5L50,60z M65,15l-5-5l-5,5l5,5L65,15z M65,45l-5-5l-5,5l5,5L65,45z M5,45l-5-5l-5,5l5,5L5,45z M35,45 l-5-5l-5,5l5,5L35,45z', line_cap: 'butt' },
    { name: 'partners', value: 'M 7.5,60 C 7.5,55.7 4,52.5 0,52.5 m 60,0 c -4,0 -7.5,3 -7.5,7.5 M 7.5,0 C 7.5,4.3 4,7.5 0,7.5 m 60,0 c -4,0 -7.5,-3 -7.5,-7.5 m -25,0 C 27.5,4.3 24,7.5 20,7.5 16,7.5 12.5,4.5 12.5,0 m 35,0 C 47.5,4.3 44,7.5 40,7.5 36,7.5 32.5,4.5 32.5,0 m 0,60 c 0,-4.3 3.5,-7.5 7.5,-7.5 4,0 7.5,3 7.5,7.5 M 0,32.5 C 4,32.5 7.5,36 7.5,40 7.5,44.3 4,47.5 0,47.5 M 27.5,40 c 0,4 -3.5,7.5 -7.5,7.5 -4,0 -7.5,-3.5 -7.5,-7.5 0,-4.3 3.5,-7.5 7.5,-7.5 4,0 7.5,3 7.5,7.5 z m 20,0 c 0,4 -3.5,7.5 -7.5,7.5 -4,0 -7.5,-3.5 -7.5,-7.5 0,-4.3 3.5,-7.5 7.5,-7.5 4,0 7.5,3 7.5,7.5 z M 60,47.5 C 56,47.5 52.5,44 52.5,40 52.5,35.7 56,32.5 60,32.5 M 0,12.5 C 4,12.5 7.5,16 7.5,20 7.5,24.3 4,27.5 0,27.5 M 27.5,20 c 0,4 -3.5,7.5 -7.5,7.5 -4,0 -7.5,-3.5 -7.5,-7.5 0,-4.3 3.5,-7.5 7.5,-7.5 4,0 7.5,3 7.5,7.5 z m 20,0 c 0,4 -3.5,7.5 -7.5,7.5 -4,0 -7.5,-3.5 -7.5,-7.5 0,-4.3 3.5,-7.5 7.5,-7.5 4,0 7.5,3 7.5,7.5 z M 60,27.5 C 56,27.5 52.5,24 52.5,20 52.5,15.7 56,12.5 60,12.5 M 12.5,60 c 0,-4.3 3.5,-7.5 7.5,-7.5 4,0 7.5,3 7.5,7.5 M 7.5,47.5 0,40 7.5,32.5 M 12.5,7.48 20,-0.024 27.5,7.5 m 5,45 7.5,7.5 7.5,-7.5 m -20,-5 -15,-15 m -5,-5 L 0,20 7.5,12.5 m 20,40 L 20,60 12.5,52.5 m 20,-5 15,-15 m 5,-5 L 60,20 52.5,12.5 M 7.5,52.5 0,60 m 27.5,-27.5 -15,15 m 35,-35 -15,15 M 60,-0.024 52.5,7.48 m -5,0 L 40,-0.024 32.5,7.5 m 0,5 15,15 m 5,5 7.5,7.5 -7.5,7.5 m -40,-20 15,-15 m -20,15 5,0 0,5 -5,0 z m 20,0 5,0 0,5 -5,0 z m 20,0 5,0 0,5 -5,0 z m 0,-20 5,0 0,5 -5,0 z m -20,0 5,0 0,5 -5,0 z m -20,0 5,0 0,5 -5,0 z m 0,40 5,0 0,5 -5,0 z m 20,0 5,0 0,5 -5,0 z m 20,0 5,0 0,5 -5,0 z m 5,5 7.5,7.5 m -27.5,-27.5 15,15 m -35,-35 15,15 M 0,-0.024 7.5,7.48', line_cap: 'square' },
    { name: 'services', value: 'M 0,30 30,0 M 30,60 60,30 M 0,30 30,60 M 30,0 60,30 M 0,60 60,0 M 0,0 60,60 M 37.5,60 30,52.5 22.5,60 M 37.5,0 30,7.5 22.5,0 M 60,37.5 52.5,30 60,22.5 M 60,45 45,60 M 60,15 45,0 M 0,15 15,0 M 0,45 15,60 M 52.5,0 60,7.5 m 0,45 -7.5,7.5 M 7.5,0 0,7.5 m 0,45 7.5,7.5 M 0,37.5 7.5,30 0,22.5 m 30,0 L 22.5,30 30,37.5 37.5,30 Z M 45,37.5 37.5,45 45,52.5 52.5,45 Z M 15,37.5 7.5,45 15,52.5 22.5,45 Z M 45,7.5 37.5,15 45,22.5 52.5,15 Z M 15,7.5 7.5,15 15,22.5 22.5,15 Z M 45,0 0,45 M 60,15 15,60 M 15,0 60,45 M 0,15 45,60', line_cap: 'square' },
    { name: 'storage', value: 'm 58,60 2,-2 M 18,0 16,2 M 38,0 36,2 M 58,0 56,2 m 4,6 -4,4 m 4,6 -4,4 m 4,16 -4,4 M 6,52 -2,60 M 46,12 36,22 M 6,12 0,18 M 6,32 0,38 M 26,12 16,22 M 26,32 16,42 M 46,32 36,42 m -10,10 -8,8 m 28,-8 -8,8 M 60,48 48,60 M 60,28 28,60 M 56,12 8,60 M 48,0 0,48 m 46,-6 10,0 0,10 -10,0 z m -20,0 10,0 0,10 -10,0 z m -20,0 10,0 0,10 -10,0 z m 40,-20 10,0 0,10 -10,0 z m -20,0 10,0 0,10 -10,0 z M 6,22 16,22 16,32 6,32 Z M 28,0 0,28 M 46,2 56,2 56,12 46,12 Z M 26,2 36,2 36,12 26,12 Z M 6,2 16,2 16,12 6,12 Z M 8,0 0,8', line_cap: 'square' }
  ];

  var streams = [];

  paths.forEach(function (path) {
    colors.forEach(function (color) {
      var stream = gulp.src('./positioned-source/*.svg')
        .pipe(mustache({ color: color.value, path: path.value, line_cap: path.line_cap }, { extension: '.svg' }))
        .pipe(gulp.dest('./positioned-patterns/' + path.name + '/' + color.name));

      streams.push(stream);
    })
  });

  return es.merge.apply(null, streams);
})

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
    var stream = gulp.src('./patterns/*.svg')
      .pipe(mustache({ color: color.value }, { extension: '.svg' }))
      .pipe(gulp.dest('./patterns/' + color.name));

    streams.push(stream);
  });

  return es.merge.apply(null, streams);
});
