function irAMiPedido() {
  if (ClienteModelo.sesionActual() === null) {
    window.location.href = "vista/login.html?volver=inicio";
  } else {
    window.location.href = "vista/seguimiento.html";
  }
}

function buscarPedidoPorDni(evento) {
  evento.preventDefault();
  var dni = document.getElementById("dni-inicio").value.trim();

  if (/^[0-9]{8}$/.test(dni) === false) {
    VistaComun.mostrarMensaje("mensajes-inicio", "Escribe tu DNI de 8 números.", "warning");
    return;
  }

  if (ClienteModelo.sesionActual() === null) {
    window.location.href = "vista/login.html?volver=inicio";
  } else {
    window.location.href = "vista/seguimiento.html?dni=" + dni;
  }
}
