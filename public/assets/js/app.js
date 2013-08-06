$(function() {
    var client = new WindowsAzure.MobileServiceClient('https://picamera.azure-mobile.net/', 'mGiSqeXTFjXdWinsCDkZYYZxJHoIEF50'),
        raspberrys = client.getTable('raspberrys'),
        picameraRequestObject = {
                boxMacAddress: '',
                name: '',
                boxDescription: '',
                token: '',
                active: true
        };

    function refreshAuthDisplay() {
       
        var isLoggedIn = client.currentUser !== null;
        if(isLoggedIn){
            $('#register').fadeOut('fast', function(){
                $('#connect').fadeIn('fast');
            });
        }
    }

    function logIn() {
        client.login("facebook").then(refreshAuthDisplay, function (error) {
            alert(error);
        });
    }

    function registerPiCamera() {
        picameraRequestObject.name = $('#boxName').val();
        picameraRequestObject.boxDescription = $('#boxDescription').val();
        picameraRequestObject.token = client.currentUser.mobileServiceAuthenticationToken;
        picameraRequestObject.boxMacAddress =  $('#macaddress').text();
       
        raspberrys.insert(picameraRequestObject).then(function(e){
            refreshAuthDisplay();
            $('#registerModal').modal('hide');

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