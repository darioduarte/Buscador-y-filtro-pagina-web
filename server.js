const http = require('http');
const express = require('express');
const path = require('path');

var indexRouter = require('./routes/index');

var app = express();

var port = process.env.PORT || '3000';
app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);

var server = http.createServer(app);

server.listen(port);
