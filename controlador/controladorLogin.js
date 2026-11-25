function destinoDespuesDeLogin() {
  var params = new URLSearchParams(window.location.search);
  var volver = params.get("volver");
  if (volver === "carrito") {
    return "carrito.html";
  }
  if (volver === "seguimiento") {
    return "seguimiento.html";
  }
  return "../index.html";
}

function iniciarSesion(evento) {
  evento.preventDefault();
  var usuario = document.getElementById("usuario").value.trim();
  var clave = document.getElementById("clave").value;

  if (usuario === "" || clave === "") {
    VistaComun.mostrarMensaje("mensajes-login", "Escribe tu DNI (o usuario) y tu contraseña.", "warning");
    return;
  }

  var persona = PersonalModelo.iniciarSesion(usuario, clave);
  if (persona !== null) {
    window.location.href = "panel.html";
    return;
  }

  var cliente = ClienteModelo.iniciarSesion(usuario, clave);
  if (cliente === null) {
    VistaComun.mostrarMensaje("mensajes-login", "DNI o contraseña incorrectos. Revisa los datos e inténtalo otra vez.", "danger");
    return;
  }

  window.location.href = destinoDespuesDeLogin();
}

function registrarse(evento) {
  evento.preventDefault();
  var datos = {
    nombres: document.getElementById("reg-nombres").value.trim(),
    apellidos: document.getElementById("reg-apellidos").value.trim(),
    dni: document.getElementById("reg-dni").value.trim(),
    clave: document.getElementById("reg-clave").value,
    repetir: document.getElementById("reg-repetir").value
  };

  var errores = ClienteModelo.validarRegistro(datos);
  if (errores.length > 0) {
    VistaComun.mostrarErrores("mensajes-registro", errores);
    return;
  }

  ClienteModelo.registrar(datos);
  ClienteModelo.iniciarSesion(datos.dni, datos.clave);
  window.location.href = destinoDespuesDeLogin();
}

function mostrarRegistro() {
  document.getElementById("zona-login").classList.add("d-none");
  document.getElementById("zona-registro").classList.remove("d-none");
}

function mostrarLogin() {
  document.getElementById("zona-registro").classList.add("d-none");
  document.getElementById("zona-login").classList.remove("d-none");
}

document.addEventListener("DOMContentLoaded", function () {
  VistaComun.iniciar();
});
