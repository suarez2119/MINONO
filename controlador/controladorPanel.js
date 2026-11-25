var codigosConocidos = null;

function iniciarPanel() {
  var sesion = PersonalModelo.sesionActual();
  if (sesion === null) {
    window.location.href = "login.html";
    return;
  }

  VistaComun.iniciar();

  if (sesion.rol === "Administrador") {
    document.getElementById("tab-cola").disabled = true;
    new bootstrap.Tab(document.getElementById("tab-dashboard")).show();
  } else {
    document.getElementById("tab-dashboard").disabled = true;
  }

  document.getElementById("nombre-personal").textContent = sesion.usuario + " (" + sesion.rol + ")";
  actualizarPanel();
  setInterval(actualizarPanel, Reglas.SEGUNDOS_REFRESCO * 1000);
}

function actualizarPanel() {
  var nuevos = buscarPedidosNuevos();
  VistaPanel.mostrarCola(PedidoModelo.listarActivos(), nuevos);
  VistaDashboard.mostrar(PedidoModelo.estadisticas(), PedidoModelo.listarHoy());

  if (nuevos.length > 0) {
    VistaPanel.mostrarAvisoNuevo(nuevos[nuevos.length - 1]);
    sonar();
  }
}

function buscarPedidosNuevos() {
  var todos = PedidoModelo.listar();
  var codigos = [];
  var nuevos = [];

  for (var i = 0; i < todos.length; i++) {
    codigos.push(todos[i].codigo);
    if (codigosConocidos !== null && codigosConocidos.indexOf(todos[i].codigo) === -1) {
      nuevos.push(todos[i].codigo);
    }
  }
  codigosConocidos = codigos;
  return nuevos;
}

function sonar() {
  try {
    var contexto = new (window.AudioContext || window.webkitAudioContext)();
    var oscilador = contexto.createOscillator();
    oscilador.type = "sine";
    oscilador.frequency.value = 880;
    oscilador.connect(contexto.destination);
    oscilador.start();
    setTimeout(function () {
      oscilador.stop();
    }, 300);
  } catch (e) {
  }
}

function avanzarPedido(codigo) {
  var pedido = PedidoModelo.buscarPorCodigo(codigo);

  if (pedido.estado === "Listo para entrega") {
    var mensaje = "¿Ya cobraste " + VistaComun.soles(pedido.total) + " (" + pedido.metodoPago + ") y entregaste el pedido " + codigo + "?";
    if (confirm(mensaje) === false) {
      return;
    }
  }
  PedidoModelo.avanzar(codigo);
  actualizarPanel();
}

function anularPedido(codigo) {
  if (confirm("¿Anular el pedido " + codigo + " porque no fue recogido?") === false) {
    return;
  }
  var error = PedidoModelo.anular(codigo);
  if (error !== "") {
    VistaComun.mostrarMensaje("aviso-nuevo", error, "warning");
  }
  actualizarPanel();
}

function cerrarSesion() {
  PersonalModelo.cerrarSesion();
  window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", iniciarPanel);
