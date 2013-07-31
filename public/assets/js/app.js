$(function() {
    var client = new WindowsAzure.MobileServiceClient('https://picamera.azure-mobile.net/', 'mGiSqeXTFjXdWinsCDkZYYZxJHoIEF50'),
        todoItemTable = client.getTable('raspberrys');

    function refreshAuthDisplay() {
        var isLoggedIn = client.currentUser !== null;
    
    }

    function logIn() {
        client.login("facebook").then(refreshAuthDisplay, function (error) {
            alert(error);
        });
    }


    function logOut() {
        client.logout();
        refreshAuthDisplay();
        $('#summary').html('<strong>You must login to access data.</strong>');
    }


    // On page init, fetch the data and set up event handlers
    $(function () {
        // $('#add-item').hide();
        // refreshAuthDisplay();
        
        // $('#summary').html('<strong>You must login to access data.</strong>');
        $("#btnRegister").click(logIn);
        // $("#logged-in button").click(logOut);
    });
});