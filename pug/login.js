

$(function(){
	$('#contact').on('submit',function() { 
        let userName = document.getElementById("userName").value;
        let password = document.getElementById("password").value
        
        $.ajax({
            url: '/loginForm',
            method: 'POST',
            contentType: 'application/json',

            data: 
                JSON.stringify({
                    userName,
                    password,
                }),
            error: function(err) {
                alert("Invalid userName or password!");
                // console.log(err);
            },
            success: function (res) {
                window.location.href = "/index";
            }
        });
	});
});
