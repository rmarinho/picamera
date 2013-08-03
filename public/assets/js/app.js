$(function() {
    var client = new WindowsAzure.MobileServiceClient('https://picamera.azure-mobile.net/', 'mGiSqeXTFjXdWinsCDkZYYZxJHoIEF50'),
        todoItemTable = client.getTable('raspberrys'),
        picameraRequestObject = {
                macAddress: '',
                boxName: '',
                boxDescription: '',
                userID: '',
                token: ''
        };

    function refreshAuthDisplay() {
        var isLoggedIn = client.currentUser !== null;
    
    }

    function logIn() {
        client.login("facebook").then(refreshAuthDisplay, function (error) {
            alert(error);
        });
    }

    function registerPiCamera() {
        picameraRequestObject.boxName = $('#boxName').val();
        picameraRequestObject.boxDescription = $('#boxDescription').val();
        picameraRequestObject.userID = client.currentUser.userId;
        picameraRequestObject.token = client.currentUser.mobileServiceAuthenticationToken;
        $.ajax({
                    'url': 'api/picamera',
                    'type' : 'PUT',
                    'headers' : {'Content-Type' : 'application/json'},
                    'data' : JSON.stringify(picameraRequestObject),
                    'processData' : false,
                    'success' : function(data){
                        console.log( data );
                    },
                    'error': function(jqXHR, data){
                        console.log( data );
                        console.log( '<div style="color:red;font-weight:bold;">' + 
                                'Failed to DELETE the settop box. See server logs for problem.</div>');
                    },
                    'dataType' : 'text'
        });  
    }


    function logOut() {
        client.logout();
        refreshAuthDisplay();
        $('#summary').html('<strong>You must login to access data.</strong>');
    }


    // On page init, fetch the data and set up event handlers
    $(function () {
        refreshAuthDisplay();
        
        $("#btnRegister").click(logIn);
        $("#btnSubmitRegister").click(registerPiCamera);
        
    });
});