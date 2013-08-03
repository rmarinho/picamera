
var express = require('express')
  , engine = require('ejs-locals')
  ,	app = express()
  , routes = require('./routes')
  , api = require('./routes/api')
  , locals = {_layoutFile: true }
  , io = require('socket.io-client')
  , socket = io.connect('http://picamera.cloudapp.net', {	port: 3000 })
  , onConnected = function () { 
		  console.log("socket connected");
		  socket.emit('register', { userid: userId, raspid: raspID, macAddress: macAdd });
	};
exports.init =function(port){

   app.configure(function(){
        app.set('views', __dirname + '/views');
        app.set('view engine', 'ejs');
	      app.use(express.bodyParser());
        app.use(express.logger('dev'));
        app.use(express.methodOverride());
        app.use(express.cookieParser('thepicamerasecret'));
        app.use(express.session());
        app.use(express.static(__dirname + '/public'));
        app.use(require('stylus').middleware(__dirname + '/public'));
        app.use(app.router);
        app.enable("jsonp callback");
    })

    app.engine('ejs', engine);

    app.configure('development', function(){
       app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
        // app.use(express.logger({ format: ':method :url' }));
    });

    app.configure('production', function(){
       app.use(express.errorHandler()); 
    });


    app.get('/', routes.index);

    app.put('/api/picamera', api.addpi);
    app.delete('/api/picamera', api.removepi);

    app.use( function(err, req, res, next) {
        res.render('500.ejs', { locals: { error: err }, status: 500 });
    });

    /* The 404 Route (ALWAYS Keep this as the last route) */
    app.get('/*', function(req, res){
      res.render('404.ejs', locals);
    });

    server = app.listen(port);
    console.log("Intiliazing socket");
    socket.on('connect', onConnected);
    return app;
}
