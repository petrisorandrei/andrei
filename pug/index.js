$(document).ready(function() {
    $('.login').click(function() {
        login();
    });
    $('.signUp').click(function() {
        signUp();
    });
    $('.logOut').click(function() {
        logOut();
    });
    $('.addData').click(function() {
        addData();
    });
    $('.home').click(function() {
        home();
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

function logOut() {
    $.ajax({
        url: '/logOut',
        method: 'GET',
        error: function(err) {
            console.log(err);
        },
        success: function (res) {
            window.location.href = "/logOut";
        }
    })
}

function addData() {
    $.ajax({
        url: '/addData',
        method: 'GET',
        error: function(err) {
            alert("Log in first");
            console.log("/////////////");
            window.location.href = "/index";
        },
        success: function (res) {
            window.location.href = "/addData";
        }
    })
}

function home() {
    $.ajax({
        url: '/index',
        method: 'GET',
        error: function(err) {
            console.log(err);
        },
        success: function (res) {
            window.location.href = "/index";
        }
    })
}