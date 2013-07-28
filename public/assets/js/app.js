$(function() {
    var client = new WindowsAzure.MobileServiceClient('https://picamera.azure-mobile.net/', 'mGiSqeXTFjXdWinsCDkZYYZxJHoIEF50'),
        todoItemTable = client.getTable('raspberrys');

    function refreshTodoItems() {
        var query = todoItemTable.where(function () {
            return (this.active === false && this.createdAt !== null);
        });


        query.read().then(function (todoItems) {
            var listItems = $.map(todoItems, function (item) {
                return $('<li>')
                    .attr('data-todoitem-id', item.id)
                    .append($('<button class="item-delete">Delete</button>'))
                    .append($('<input type="checkbox" class="item-complete">')
                        .prop('checked', item.active))
                    .append($('<div>').append($('<input class="item-text">').val(item.name))
                       .append($('<span class="raspid">'
                        + item.raspId
                        + '</span>'))
                    .append($('<span class="timestamp">'
                        + (item.createdAt && item.createdAt.toDateString() + ' '
                        + item.createdAt.toLocaleTimeString() || '')
                        + '</span>')));


            });


            $('#todo-items').empty().append(listItems).toggle(listItems.length > 0);
            $('#summary').html('<strong>' + todoItems.length + '</strong> item(s)');
        });


    }

    function getTodoItemId(formElement) {
        return Number($(formElement).closest('li').attr('data-todoitem-id'));
    }

    // Handle insert
    // $('#add-item').submit(function (evt) {
    //     var textbox = $('#new-item-text'),
    //         itemText = textbox.val();
    //     if (itemText !== '') {
    //         todoItemTable.insert({ name: itemText, active: false })
    //             .then(refreshTodoItems, function (error) {
    //                 alert(JSON.parse(error.request.responseText).error);
    //             });
    //     }
    //     textbox.val('').focus();
    //     evt.preventDefault();
    // });

    // // Handle update
    // $(document.body).on('change', '.item-text', function() {
    //     var newText = $(this).val();
    //     todoItemTable.update({ id: getTodoItemId(this), name: newText });
    // });

    // $(document.body).on('change', '.item-complete', function() {
    //     var isActive = $(this).prop('checked');
    //     todoItemTable.update({ id: getTodoItemId(this), active: isActive }).then(refreshTodoItems);
    // });

    // // Handle delete
    // $(document.body).on('click', '.item-delete', function () {
    //     todoItemTable.del({ id: getTodoItemId(this) }).then(refreshTodoItems);
    // });

    // On initial load, start by fetching the current data
    function refreshAuthDisplay() {
        var isLoggedIn = client.currentUser !== null;
        debugger;
        var user = client.currentUser;
    
    }

    function logIn() {
        client.login("facebook").then(refreshAuthDisplay, function (error) {
            alert(error);
        });



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