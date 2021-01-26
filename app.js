var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 서버
// socket 생성
io = require('socket.io')();

io.on('connection', (socket) => {
  console.log('클라이언트와 연결 됨');

  socket.on('disconnect', () => {
    console.log('클라이언트와 연결이 해제 됨');
  });

  // socket.on('이벤트', (data) => {
  //   console.log(data);
  // });

  // 1
  // socket.on('chat message', (msg) => {
  //   console.log('message: ' + msg);
  // });

  // 2
  // socket.on('chat message', (msg) => {
  //   io.emit('chat message', msg);
  // });

});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
