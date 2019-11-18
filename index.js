$(function () {
    $('#datetimepicker1').datetimepicker();
});


$(document).ready(function () {

    if (sessionStorage.length > 0) {
        $("li:has('a'):contains('Login')").remove();
        $(".navbar-nav").append('<li class="nav-item"><a class="nav-link" href="index.html" onclick="logOut();">Log out</a></li>');

        //console.log(getUserLogged());

        var user = JSON.parse(sessionStorage.getItem("user"));
        for (var i = 0; i < user.reservations.length; i++) {
            var username = user.fullname;
            var people = user.reservations[i].personas;
            var useremail = user.username;
            var date = user.reservations[i].date;
            var observation = user.reservations[i].observation;
            var phone = user.reservations[i].phone;

            $(".card-body").each(function () {
                $(this).append('<h5>Mis reservas</h5>');
                $(this).append("<li>Nombre de usuario: " + username + "</li>");
                $(this).append("<li>Email: " + useremail + "</li");
                $(this).append("<li>Nº personas: " + people + "</li>");
                $(this).append("<li>Fecha: " + date + "</li>");
                $(this).append("<li>Teléfono: " + phone + "</li>");
                $(this).append("<li>Comentarios: " + observation + "</li>");
            });
        }
    } else {
        $("#reservationInfo").each(function () {
            $(this).append('<h5>Mis reservas</h5>');
            $(this).append("<li>Aun no tiene reservas" + "</li>");

        });
    }
});


function login() {

    var inputUsername = document.getElementById("inputEmail").value;
    var inputPassword = document.getElementById("inputPassword").value;
    $.getJSON("./users.json", function (json) {


        console.log("Prueba");


        for (var user in json) {
            if (json.hasOwnProperty(user)) {
                if (json[user].username === inputUsername && json[user].password === inputPassword) {
                    newUser = json[user];
                    saveUser(newUser);
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


function reservation() {


    if (sessionStorage.getItem('user') != null) {
        var inputNombre = document.getElementById("name").value;
        var inputPersonas = document.getElementById("number").value;
        var inputPhone = document.getElementById("phone").value;
        var inputDate = document.getElementById("date").value;
        var inputHour = document.getElementById("time").value;
        var inputObservation = document.getElementById("comments").value;
        alert("Reserva realizada con éxito para la fecha: " + inputDate);
        var user1 = JSON.parse(sessionStorage.getItem("user"));

        user1['reservations'].push({
            "personas": inputPersonas,
            "phone": inputPhone,
            "date": "Fecha: " + inputDate + " hora:" + inputHour,
            "observation": inputObservation
        });

        saveUser(user1);
        window.location.href = "index.html";
        //saveUser(user);

    } else {
        if (confirm('Para hacer una revera debe estar registrado, ¿ Desea hacerlo ?.')) {
            location.href = "login.html";
        }

    }

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


