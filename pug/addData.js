// When the browser is ready...
$(document).ready(function() {

    $("#contact").submit(function() {
        
        /* stop form from submitting normally */
        event.preventDefault();

        /* get some values from elements on the page: */
        const $form = $(this);
        let message = document.getElementById("message").value;

        $.ajax({
            url: '/addDataForm',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                message
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

