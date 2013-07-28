#!/usr/bin/env node

var express = express = require('express')
  ,	app = express()
  , server = require('http').createServer(app)
  , userId = 'Facebook:1360862615'
  , raspID = '1234567890'
  , io = require('socket.io-client')
  , socket = io.connect('http://picamera.cloudapp.net', {
    	port: 3000
	})
  , onConnected = function () { 
		console.log("socket connected");
		socket.emit('register', { userid: userId, raspid: raspID });
	};

   app.configure(function(){
        app.set('views', './lib/views');
        app.set('view engine', 'ejs');
		app.set('view options', { layout: false });
        app.use(express.bodyParser());
        app.use(express.methodOverride());
        app.use(express.static(__dirname + '/public'));
        app.use(app.router);
        app.enable("jsonp callback");
    })

    app.configure('development', function(){
       app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
        // app.use(express.logger({ format: ':method :url' }));
    });

server.listen(3000);

app.get('/', function (req, res) {
  res.sendfile('views/index.html');
});

socket.on('connect', onConnected);
