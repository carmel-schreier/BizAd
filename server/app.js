var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const headers = require('./middleware/headers');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adsRouter = require('./routes/ads');
var servicesRouter = require('./routes/services');
var userServicesRouter = require('./routes/userServices');
const auth = require('./middleware/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(headers);
//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/ads', auth, adsRouter);
app.use('/services', auth, servicesRouter);
app.use('/user-services', auth, userServicesRouter);

module.exports = app;