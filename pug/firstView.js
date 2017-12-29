$(document).ready(function() {
    $('.login').click(function() {
        login();
    });
    $('.signUp').click(function() {
        signUp();
    });
})

function login() {
    $.ajax({
        url: '/login',
        method: 'GET',
        error: function(err) {
            console.log(err);
        },
        success: function (res) {
            window.location.href = "/login";
        }
    })
}

function signUp() {
    $.ajax({
        url: '/signUp',
        method: 'GET',
        error: function(err) {
            console.log(err);
        },
        success: function (res) {
            window.location.href = "/signUp";
        }
    })
}

