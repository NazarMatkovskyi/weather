let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

let rootRouter = require('./routes/root');
let weatherRouter = require('./routes/api/weather');

let app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api/weather', weatherRouter);
app.use('*', rootRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // return the error message
  res
    .status(err.status || 500)
    .type('json')
    .send({
      message: err.message,
      error: req.app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;
