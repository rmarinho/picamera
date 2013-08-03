

var request = require('request');
var API = 'https://picamera.azure-mobile.net/client/MobileServices.Web-1.0.0.min.js';
var theclient;



exports.init = function(callback) {
	debugger;
  if (theclient) {
    callback(null, theclient);
  } else {
  		request(API, function (err, res, body) {
   	   		if (!err) {
      			global.window = {};
      			global.eval(body);
 		        theclient = new global.WindowsAzure.MobileServiceClient('https://picamera.azure-mobile.net/', 'mGiSqeXTFjXdWinsCDkZYYZxJHoIEF50');
    		}
      		callback(err, theclient);
    	});

   
   }
};

