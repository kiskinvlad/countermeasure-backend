const CONFIG = require('./config/config').CONFIG;
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

const passport = require('passport');
const bodyParser = require('body-parser');
const models = require('./models');
/**
 * View engine
 */
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
/**
 * Javascript web token encryption middleware
 */
app.set('secret', CONFIG.jwt_encryption);
/**
 * Express main configuration
 */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
/**
 * Passport configuration
 */
// Passport session secret
app.use(passport.initialize());
app.use(passport.session());
/**
 * Static dir
 */
app.use(express.static(path.join(__dirname, 'public')));
/**
 * Enable cors middleware
 */
app.use(cors());
/**
 * Users router.
 */
app.use('/users', usersRouter);
/**
 * Synchronization between sequelize and database
 */
//Sync Database
models.sequelize.sync().then(function() {

    console.log('Database working')

}).catch(function(err) {

    console.log(err, 'Something went wrong with the Database Update!')

});
/**
 * Default router. Secured by auth
 */
app.use('/', indexRouter);
/**
 * Redirect to index as a fallback when no routes match
 */
app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
/**
 * 404
 */
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});
/**
 * Default error handler
 */
// error handler
app.use(function(err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
