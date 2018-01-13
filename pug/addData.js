// When the browser is ready...
$(document).ready(function() {

    $("#contact").submit(function() {
        
        /* stop form from submitting normally */
        event.preventDefault();

        /* get some values from elements on the page: */
        const $form = $(this);

        const data1 = $form.find('input[name="data1"]').val();
        const data2 = $form.find('input[name="data2"]').val();
        const data3 = $form.find('input[name="data3"]').val();
        const data4 = $form.find('input[name="data4"]').val();
        const data5 = $form.find('input[name="data5"]').val();
        console.log("SAA"); 
        $.ajax({
            url: '/addDataForm',
            type: 'POST',
            contentType: 'application/json',

            // contentType: "application/json; charset=utf-8",
            data:
                JSON.stringify({
                    data1, data2, data3, data4, data5
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

