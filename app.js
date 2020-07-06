const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const casesRouter = require('./routes/cases');
const officerRouter = require('./routes/officers');

const app = express();
// view engine setup
mongoose.connect('mongodb+srv://admin:q@cluster0.q1dx0.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useMongoClient: true,
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cases', casesRouter);
app.use('/officers', officerRouter);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
