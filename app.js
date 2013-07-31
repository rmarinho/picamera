
var express = express = require('express')
  , engine = require('ejs-locals')
  ,	app = express()
  , userId = 'Facebook:1360862615'
  , raspID = '1234567890'
  , macAdd =''
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
        app.use(express.methodOverride());
        app.use(express.static(__dirname + '/public'));
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

    app.use( function(err, req, res, next) {
        res.render('500.ejs', { locals: { error: err }, status: 500 });
    });

    server = app.listen(port);

    socket.on('connect', onConnected);
    return app;
}
