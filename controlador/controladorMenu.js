var productoActual = null;
var categoriaActual = "Todas";
var modalProducto = null;

function iniciarMenu() {
  VistaComun.iniciar();
  modalProducto = new bootstrap.Modal(document.getElementById("modal-producto"));

  var cliente = ClienteModelo.sesionActual();
  VistaMenu.mostrarSesion(cliente);
  if (cliente !== null) {
    document.getElementById("dni-inicio").value = cliente.dni;
  }

  filtrarProductos();
  VistaMenu.mostrarMini();
}

function filtrarProductos() {
  var texto = document.getElementById("buscador").value;
  var lista = ProductoModelo.filtrar(texto, categoriaActual);
  VistaMenu.mostrarProductos(lista);
}

function filtrarCategoria(categoria) {
  categoriaActual = categoria;
  VistaMenu.marcarCategoria(categoria);
  filtrarProductos();
}

function abrirDetalle(id) {
  if (ClienteModelo.sesionActual() === null) {
    window.location.href = "vista/login.html?volver=inicio";
    return;
  }
  productoActual = ProductoModelo.buscarPorId(id);
  VistaMenu.mostrarDetalle(productoActual);
  recalcularPrecio();
  modalProducto.show();
}

function leerOpciones() {
  var datos = {
    cantidad: parseInt(document.getElementById("opcion-cantidad").value),
    tamano: "",
    leche: "",
    azucar: "",
    extras: [],
    observacion: document.getElementById("opcion-observacion").value.trim()
  };

  var tamano = document.getElementById("opcion-tamano");
  if (tamano !== null) {
    datos.tamano = tamano.value;
  }
  var leche = document.getElementById("opcion-leche");
  if (leche !== null) {
    datos.leche = leche.value;
  }
  var azucar = document.getElementById("opcion-azucar");
  if (azucar !== null) {
    datos.azucar = azucar.value;
  }

  var checks = document.getElementsByClassName("opcion-extra");
  for (var i = 0; i < checks.length; i++) {
    if (checks[i].checked) {
      datos.extras.push(checks[i].value);
    }
  }
  return datos;
}

function recalcularPrecio() {
  var datos = leerOpciones();
  var cantidad = datos.cantidad;
  if (isNaN(cantidad) || cantidad < 1) {
    cantidad = 1;
  }
  var unitario = ProductoModelo.calcularPrecio(productoActual, datos.tamano, datos.leche, datos.extras);
  VistaMenu.mostrarPrecio(unitario * cantidad);
}

function agregarAlCarrito() {
  var datos = leerOpciones();

  if (isNaN(datos.cantidad) || datos.cantidad < 1) {
    VistaComun.mostrarMensaje("mensajes-modal", "Escribe una cantidad válida (mínimo 1).", "warning");
    return;
  }

  var item = {
    productoId: productoActual.id,
    nombre: productoActual.nombre,
    cantidad: datos.cantidad,
    tamano: datos.tamano,
    leche: datos.leche,
    azucar: datos.azucar,
    extras: datos.extras,
    observacion: datos.observacion,
    precioUnitario: ProductoModelo.calcularPrecio(productoActual, datos.tamano, datos.leche, datos.extras)
  };

  var error = CarritoModelo.agregar(item);
  if (error !== "") {
    VistaComun.mostrarMensaje("mensajes-modal", error, "warning");
    return;
  }

  modalProducto.hide();
  VistaMenu.mostrarMini();
  VistaComun.mostrarMensaje("mensajes", item.nombre + " se agregó a tu carrito.", "success");
}

function cambiarCantidadMini(idLinea, cambio) {
  var error = CarritoModelo.cambiarCantidad(idLinea, cambio);
  if (error !== "") {
    VistaComun.mostrarMensaje("mensajes", error, "warning");
  }
  VistaMenu.mostrarMini();
}

function quitarMini(idLinea) {
  CarritoModelo.quitar(idLinea);
  VistaMenu.mostrarMini();
}

document.addEventListener("DOMContentLoaded", iniciarMenu);
