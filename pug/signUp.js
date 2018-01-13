// When the browser is ready...
$(document).ready(function() {
    let userName = document.getElementById("userName").value;
    let firstName = document.getElementById("firstName").value
    let phone = document.getElementById("phone").value;
    let lastName = document.getElementById("lastName").value
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value
	$('#contact').on('submit',function(e) { 
        $.ajax({
            url: '/signUpForm',
            type: 'POST',
            contentType: 'application/json',

            data:
                JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    userName: userName,
                    email: email,
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
   
});
