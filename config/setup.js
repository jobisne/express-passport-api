const http = require('http');
const debug = require('debug');
const app = require('express')();
//
//const express = require(); require express 
//const app = express();buid the app or call express

const routes = require('../components');
const bodyParser = require('body-parser');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');

const logDirectory = path.join(__dirname, 'logs');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

// create a rotating write stream
var accessLogStream = rfs('access.log', {
  interval: '1d', // rotate daily
  path: logDirectory
})

// setup the logger
app.use(logger('combined', {stream: accessLogStream}))
// const logger = require('debug')('queencake-api:app');
//
// app.use(logger('dev', {
// 	stream: fs.createWriteStream('access.log', {'flags': 'a'})
// }));

app.use(bodyParser.json()); //for passing application
app.use(bodyParser.urlencoded({ extended: true }));//for parsing application/x-www-form-urlencoded


app.use('/', routes);//mount the specified middleware function or funtions at the specified path:the middleware function is executed when the base of the requested path matches path.

app.use((req, res, next) => res.status(404).json({ message: 'Page Not Found'})); //mount a middle function function locally

module.exports = app;
