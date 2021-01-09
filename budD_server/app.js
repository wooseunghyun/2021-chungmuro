var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var diaryRouter = require('./routes/diary');
var diary_frontRouter = require('./routes/diary_front');

var sequelize = require('./models').sequelize;

var app = express();

sequelize.sync({
  force: false  //true: 테이블이 있는 경우 삭제하고 다시 작성 / false: 기존 테이블 삭제x 새 테이블이 작성되면 삭제됨
});  //서버 실행시 시퀄라이저가 mysql을 연결시켜 줌

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/diary', diaryRouter);
app.use('/diary_front', diary_frontRouter);

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
