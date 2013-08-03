/*
 * GET home page.
 */
var locals = {_layoutFile: true };
    		
exports.index = function(req, res){
	require('getmac').getMac(function(err,macAddress){
    			if (err)  throw err;
    			console.log("MacAdress: " + macAddress);  
   				
   				locals.date = new Date().toLocaleDateString();
    			locals.macAddress =macAddress;
			    res.render('index.ejs', locals);
	});
};

