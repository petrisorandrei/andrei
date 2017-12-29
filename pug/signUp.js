// When the browser is ready...
$(document).ready(function() {

    $("#contact").submit(function() {

        /* stop form from submitting normally */
        event.preventDefault();

        /* get some values from elements on the page: */
        const $form = $(this);

        const firstName = $form.find('input[name="firstName"]').val();
        const lastName = $form.find('input[name="lastName"]').val();
        const phone = $form.find('input[name="phone"]').val();
        const email = $form.find('input[name="email"]').val();
        const password = $form.find('input[name="password"]').val();
        
        $.ajax({
            url: '/signUpSend',
            type: 'POST',
            contentType: "application/json; charset=utf-8",
            data:
                JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    email: email,
                    password: password,
                }),
            error: function(err) {
                console.log(err);
            },
            success: function (res) {
                window.location.href = "/view";
            }
        });
    });
    $(function() {
        // validate
        $("#contact").validate({
            // Set the validation rules
            rules: {
                firstName: "required",
                lastName: "required",
                
                email: {
                    required: true,
                    email: true
                },
                phone: "required",
                password: "required",
                   
            },
            // Specify the validation error messages
            messages: {
                firstName: "Please enter your firstName",
                lastName: "Please enter your lastName",
                email: "Please enter a valid email address",
                phone: "Please enter your phone number",
                password: "Please enter a valid passwordword",
            },
            // // submit handler
            // submitHandler: function(form) {
            // form.submit();
            // $(".message").show();
            // $(".message").fadeOut(4500);
            // }
        });
    });
});
