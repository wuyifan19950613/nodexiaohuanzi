var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var admin = require('./routes/admin');
var wechat = require('./routes/wechat');
var ejs = require("ejs");
var app = express();
var mystorage = require('./public/js/localStorage');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 使用ejs模板 （替换为html文件）
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
wechat(app);
app.use(function(req, res, next){
  var user = req.cookies.user;
  var originalUrl = req.originalUrl;
  if(originalUrl !== '/admin/login' && originalUrl !== '/admin/register' && user == undefined || originalUrl !== '/admin/login' && originalUrl !== '/admin/register' && user == 'null') {
    return res.redirect('/admin/login');//页面重定向；
  }
  next()
})
admin(app);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
