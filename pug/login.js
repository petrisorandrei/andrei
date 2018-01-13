// When the browser is ready...
$(document).ready(function() {

    $("#contact").submit(function(event) {

        /* stop form from submitting normally */
        event.preventDefault();

        /* get some values from elements on the page: */
        const $form = $(this);
        const password = $form.find('input[name="password"]').val();
        const userName = $form.find('input[name="userName"]').val();
        $.ajax({
            url: '/loginForm',
            method: 'POST',
            contentType: 'application/json',

            data: 
                JSON.stringify({
                    userName: userName,
                    password: password,
                }),
            error: function(err) {
                console.log(err);
            },
            success: function (res) {
                window.location.href = "/index";
            }
        });
    });
    $(function() {
        // validate
        $("#contact").validate({
            // Set the validation rules
            rules: {
                userName: "required",
                password: "required",
                   
            },
            // Specify the validation error messages
            messages: {
                userName: "Please enter a userName",
                password: "Please enter a valid passwordword",
            },
        });
    });
});
