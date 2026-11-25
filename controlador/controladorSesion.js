function cerrarSesionCliente() {
  ClienteModelo.cerrarSesion();
  CarritoModelo.vaciar();

  if (window.location.pathname.indexOf("/vista/") !== -1) {
    window.location.href = "../index.html";
  } else {
    window.location.href = "index.html";
  }
}
