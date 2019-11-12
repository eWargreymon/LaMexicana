/*
$(function () {
  $('#datetimepicker1').datetimepicker();
});
*/

function getUser ()
{
  $.getJSON("./users.json", function (json) {
    var inputUsername = document.getElementById("username").value;
    var inputPassword = document.getElementById("password").value;

    for(var user in json) {
      if (json.hasOwnProperty(user)) {
        if (json[user].username === inputUsername && json[user].password === inputPassword) {
          alert("El usuario " + json[user].username + " ha iniciado sesión con exito");
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
