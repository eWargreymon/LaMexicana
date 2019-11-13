/*
$(function () {
  $('#datetimepicker1').datetimepicker();
});
*/

$(document).ready(function () {
  if(sessionStorage.length > 0) {
    $("li:has('a'):contains('Login')").remove();
    $(".navbar-nav").append('<li class="nav-item"><a class="nav-link" href="index.html" onclick="logOut();">Log out</a></li>');
  }

});

function getUser() {
    $.getJSON("./users.json", function (json) {
        var inputUsername = document.getElementById("username").value;
        var inputPassword = document.getElementById("password").value;

        for (var user in json) {
            if (json.hasOwnProperty(user)) {
                if (json[user].username === inputUsername && json[user].password === inputPassword) {
                    alert("El usuario " + json[user].username + " ha iniciado sesión con exito");
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
}


function saveUser(userName) {
    sessionStorage.setItem("user", userName)
}

function getUserLogged() {
    alert("El usario registrado es: " + sessionStorage.getItem("user").valueOf());
}

function logOut() {
    sessionStorage.clear();
}
