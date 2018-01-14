// When the browser is ready...
$(document).ready(function() {
	$('#contact').on('submit',function(e) { 
        let userName = document.getElementById("userName").value;
        let firstName = document.getElementById("firstName").value
        let phone = document.getElementById("phone").value;
        let lastName = document.getElementById("lastName").value
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value
        let radioButtons = document.getElementsByName('receiveEmails');
        let receiveEmails;
    
        for (var i = 0; i < radioButtons.length; i++) {
            if(radioButtons[i].checked)
                receiveEmails = radioButtons[i].value;
        }
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
                    receiveEmails
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
