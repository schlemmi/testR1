//
var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var history = require('connect-history-api-fallback');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var apiRouter = require('./routes/api');
var app = express();

console.log('ENV:', process.env)
//console.log('env key sort', Object.keys(process.env).sort())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', apiRouter);

app.get('/admin', (req, res, next) => {
  console.log('in admin')
  res.render('admin', { title: 'ti', msg: 'hhhmmm' })
})

app.use(history());  // this after /api. or it breaks gets in /api
app.use(express.static(path.join(__dirname, 'public'))); // unused?
//app.use(express.static(path.join(__dirname, '../v_app1/dist')));
app.use(express.static(path.join(__dirname, 'v_dist')));
//app.use('/', indexRouter);
//app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
console.log('err', err)
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
