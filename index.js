

$(document).ready(function () {
    
    checkLoggedUser();

});

function checkLoggedUser() {
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
    
}






function login() {


     inputEmail = document.getElementById("inputEmail").value;
     inputPassword = document.getElementById("inputPassword").value;



    $.ajax({
        url:'http://localhost:3000/api/v1/users/show',
        type:'GET',
        dataType:'json',
        contentType : "application/json",
        data:{
            username: inputEmail,
            password: inputPassword
        },
        success:function(data){
            if (data.status === 200) {
                sessionStorage.setItem("user", data.user)
                window.location.href = "index.html";
            } else if(data.status === 400){
                alert("El usuario o la contraseña son incorrectas")
            }
        },
        error:function(data){
            console.log(data)
        }
    });

}

function register() {
    var inputName = document.getElementById("inputName").value;
    var inputEmail = document.getElementById("inputEmailRegister").value;
    var inputPassword = document.getElementById("inputPasswordRegister").value;

    $.ajax({
        url:'http://localhost:3000/api/v1/users',
        type:'POST',
        dataType:'json',
        contentType : "application/json",
        data: JSON.stringify({
            fullname: inputName,
            username: inputEmail,
            password: inputPassword
        }),
        success:function(data){
            if (data.status === 200) {
                alert("El usuario con el correo: " + inputEmail + " se ha registrado con éxito")
                window.location.href = "index.html";
            } else if(data.status === 400){
                alert("Ocurió algún fallo en el proceso de registro")
            }
        },
        error:function(data){
            console.log(data)
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
        var inputEmail = document.getElementById("email").value;
        if(inputNombre == '' || inputDate == ''|| inputPhone == '' || inputEmail == '' || inputHour == '') {
            alert("Debe rellenar el campo nombre antes de continuar");
            return;
        }
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
            return;
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


