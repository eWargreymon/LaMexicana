/*
$(function () {
  $('#datetimepicker1').datetimepicker();
});
*/



$(document).ready(function () {
    if (sessionStorage.length > 0) {
        $("li:has('a'):contains('Login')").remove();
        $(".navbar-nav").append('<li class="nav-item"><a class="nav-link" href="index.html" onclick="logOut();">Log out</a></li>');
    }
    console.log(getUserLogged());

});

function login() {

    var inputUsername = document.getElementById("inputEmail").value;
    var inputPassword = document.getElementById("inputPassword").value;
    $.getJSON("./users.json", function (json) {


        console.log("Prueba");

        for (var user in json) {
            if (json.hasOwnProperty(user)) {
                if (json[user].username === inputUsername && json[user].password === inputPassword) {
                    saveUser(inputUsername);
                    window.location.href = "index.html";
                    break
                } else {
                    alert("Usuario o contraseña incorrecto, inténtelo de nuevo");
                    break
                }
            }
        }
    });

    console.log(inputUsername);

}

function register() {
    var inputName = document.getElementById("inputName").value;
    var inputEmail = document.getElementById("inputEmailRegister").value;
    var inputPassword = document.getElementById("inputPasswordRegister").value;
    $.getJSON("./users.json", function (json) {


        var reigstrado = 0;

        // JSON
        var newUser =
            {
                "fullname": inputName,
                "username": inputEmail,
                "password": inputPassword
            };


        for (var user in json) {
            if (json.hasOwnProperty(user)) {
                if (json[user].username === inputEmail) {
                    reigstrado++;
                }
            }
        }
        if (reigstrado === 0) {
            saveUser(newUser);
            window.location.href = "index.html";
        } else {
            alert("Este correo ya se encuentra registrado");
        }
    });
}


function saveUser(userInfo) {
    sessionStorage.setItem("user", JSON.stringify(userInfo));
}

function getUserLogged() {
    return JSON.parse(sessionStorage.getItem("user").valueOf());
}

function logOut() {
    sessionStorage.clear();
}


