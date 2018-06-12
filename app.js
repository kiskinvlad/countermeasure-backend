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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('secret', CONFIG.jwt_encryption);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Passport session secret
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/users', usersRouter);

app.use(function(req, res, next) {

    let token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['Authorization'] || req.headers['authorization'];
    if (!token)  {
        return;
    }
    token = token.split(' ')[1];
    if (token) {
        jwt.verify(token, app.get('secret'), function(err, decoded) {
            if (err) {
                console.log(err);

                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                req.decoded = decoded;
                next();
            }
        });

    } else {
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }
});

//Sync Database
models.sequelize.sync().then(function() {

    console.log('Database working')

}).catch(function(err) {

    console.log(err, 'Something went wrong with the Database Update!')

});
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

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
