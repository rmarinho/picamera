

  var picameraRequestObject = {
                macAddress: '',
                boxName: '',
                boxDescription: '',
                userID: '',
                token: ''
        }
        , client
        , raspberrys
        ;

exports.addpi = function(req, res){
	//TODO: check for guys having fun, 
	
	require('getmac').getMac(function(err,macAddress){
		if (err)  
		    res.json({ registered: false });;
		//check the macaddress

		picameraRequestObject.macAddress = macAddress;
		picameraRequestObject.boxName = req.body.boxName;
		picameraRequestObject.boxDescription = req.body.boxDescription;
		picameraRequestObject.userID = req.body.userID;
		//validate the token 
		picameraRequestObject.token = req.body.token;
    	
		if(!client){
				
			require('../Lib/MobileServiceClient').init(picameraRequestObject,
        		function(e,c){
        			client = c;
					
   					res.json({ registered: true });
   				});
		}
		else
		{
			res.json({ registered: false });
		}

    	
    });

	
}

exports.removepi = function(req,res){

}