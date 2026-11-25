var datosPedido = null;
var modalResumen = null;

function iniciarCarrito() {
  var cliente = ClienteModelo.sesionActual();
  if (cliente === null) {
    window.location.href = "login.html?volver=carrito";
    return;
  }

  VistaComun.iniciar();
  modalResumen = new bootstrap.Modal(document.getElementById("modal-resumen"));

  document.getElementById("nombre").value = cliente.nombres + " " + cliente.apellidos;
  document.getElementById("dni").value = cliente.dni;

  mostrarCarritoActual();
}

function mostrarCarritoActual() {
  VistaCarrito.mostrarCarrito(CarritoModelo.obtener(), CarritoModelo.total());
  VistaComun.actualizarInsignia();
}

function cambiarCantidad(idLinea, cambio) {
  var error = CarritoModelo.cambiarCantidad(idLinea, cambio);
  if (error !== "") {
    VistaComun.mostrarMensaje("mensajes-carrito", error, "warning");
  }
  mostrarCarritoActual();
}

function quitarProducto(idLinea) {
  CarritoModelo.quitar(idLinea);
  mostrarCarritoActual();
}

function vaciarCarrito() {
  if (confirm("¿Seguro que quieres vaciar el carrito?")) {
    CarritoModelo.vaciar();
    mostrarCarritoActual();
  }
}

function mostrarCampoMonto() {
  var pago = document.getElementById("metodo-pago").value;
  document.getElementById("grupo-monto").classList.toggle("d-none", pago !== "Efectivo");
}

function leerDatos() {
  var datos = {
    nombre: ClienteModelo.sesionActual().nombres + " " + ClienteModelo.sesionActual().apellidos,
    dni: ClienteModelo.sesionActual().dni,
    telefono: document.getElementById("telefono").value.trim(),
    modalidad: "",
    metodoPago: document.getElementById("metodo-pago").value,
    monto: parseFloat(document.getElementById("monto").value)
  };

  var opciones = document.getElementsByName("modalidad");
  for (var i = 0; i < opciones.length; i++) {
    if (opciones[i].checked) {
      datos.modalidad = opciones[i].value;
    }
  }
  return datos;
}

function revisarPedido(evento) {
  evento.preventDefault();
  var datos = leerDatos();
  var items = CarritoModelo.obtener();
  var total = CarritoModelo.total();

  var errores = PedidoModelo.validar(datos, items, total);
  if (errores.length > 0) {
    VistaComun.mostrarErrores("mensajes-carrito", errores);
    window.scrollTo(0, 0);
    return;
  }

  document.getElementById("mensajes-carrito").innerHTML = "";
  datosPedido = datos;
  VistaCarrito.mostrarResumen(datos, items, total);
  modalResumen.show();
}

function confirmarPedido() {
  var items = CarritoModelo.obtener();
  var total = CarritoModelo.total();

  var errores = PedidoModelo.validar(datosPedido, items, total);
  if (errores.length > 0) {
    modalResumen.hide();
    VistaComun.mostrarErrores("mensajes-carrito", errores);
    return;
  }

  var pedido = PedidoModelo.crear(datosPedido, items, total);
  CarritoModelo.vaciar();
  modalResumen.hide();
  VistaComun.actualizarInsignia();
  VistaCarrito.mostrarConfirmacion(pedido);
  window.scrollTo(0, 0);
}

document.addEventListener("DOMContentLoaded", iniciarCarrito);
