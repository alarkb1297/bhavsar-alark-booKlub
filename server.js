require('dotenv').config();
var app = require('./express');
var express = app.express;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

var passport      = require('passport');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');

//TODO : Put this in a session env.process variable
app.use(session({
    secret: 'put this in a session variable',
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require("./test/app");

app.listen(process.env.PORT || 3000);