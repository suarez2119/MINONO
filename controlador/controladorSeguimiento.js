var dniActual = "";

function iniciarSeguimiento() {
  var cliente = ClienteModelo.sesionActual();
  if (cliente === null) {
    window.location.href = "login.html?volver=seguimiento";
    return;
  }

  VistaComun.iniciar();

  var params = new URLSearchParams(window.location.search);
  var dni = params.get("dni");
  if (dni === null) {
    dni = cliente.dni;
  }
  document.getElementById("dni-busqueda").value = dni;
  consultarPedidos();

  setInterval(refrescarSeguimiento, Reglas.SEGUNDOS_REFRESCO * 1000);
}

function consultarPedidos(evento) {
  if (evento) {
    evento.preventDefault();
  }
  var cliente = ClienteModelo.sesionActual();
  var dni = document.getElementById("dni-busqueda").value.trim();

  if (dni !== cliente.dni) {
    dniActual = "";
    document.getElementById("resultado").innerHTML = "";
    VistaComun.mostrarMensaje("mensajes-seguimiento", "Solo puedes consultar los pedidos de tu cuenta.", "warning");
    return;
  }

  document.getElementById("mensajes-seguimiento").innerHTML = "";
  dniActual = dni;
  mostrarPedidosActuales();
}

function mostrarPedidosActuales() {
  var pedidos = PedidoModelo.buscarPorDni(dniActual);
  if (pedidos.length === 0) {
    VistaSeguimiento.mostrarSinPedidos();
    return;
  }

  var tiempos = [];
  for (var i = 0; i < pedidos.length; i++) {
    tiempos.push(PedidoModelo.tiempoEstimado(pedidos[i]));
  }
  VistaSeguimiento.mostrarPedidos(pedidos, tiempos);
}

function refrescarSeguimiento() {
  if (dniActual !== "") {
    mostrarPedidosActuales();
  }
}

function cancelarPedido(codigo) {
  if (confirm("¿Seguro que quieres cancelar tu pedido?") === false) {
    return;
  }
  var error = PedidoModelo.cancelar(codigo);
  if (error !== "") {
    VistaComun.mostrarMensaje("mensajes-seguimiento", error, "warning");
  }
  mostrarPedidosActuales();
}

document.addEventListener("DOMContentLoaded", iniciarSeguimiento);
