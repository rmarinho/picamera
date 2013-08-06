

var request = require('request');
var API = 'https://picamera.azure-mobile.net/client/MobileServices.Web-1.0.0.min.js';
var theclient;
var MobileServiceClient;


exports.init = function(credentials,callback) {
  if (theclient) {
    callback(null, theclient);
  } else {
  		request(API, function (err, res, body) {
   	   		if (!err) {
      			global.window = {};
      			global.eval(body);
      			MobileServiceClient = global.WindowsAzure.MobileServiceClient,
 		        theclient = new MobileServiceClient('https://picamera.azure-mobile.net/', 'mGiSqeXTFjXdWinsCDkZYYZxJHoIEF50');
    			if(credentials){
    				theclient.currentUser = {
    								userId: credentials.userID,
    								mobileServiceAuthenticationToken: credentials.token
					};
				}
				var raspberrys = theclient.getTable('Raspberrys');
				raspberrys.read().then(function (results) {
						console.log(results);
   				});
    		}
      		callback(err, theclient);
    	});

   
   }
};

