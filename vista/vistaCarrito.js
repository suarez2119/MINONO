var VistaCarrito = {
  mostrarCarrito: function (items, total) {
    var contenedor = document.getElementById("tabla-carrito");

    if (items.length === 0) {
      contenedor.innerHTML = '<p>Tu carrito está vacío.</p><a href="../index.html#catalogo" class="btn btn-minono">Ir al catálogo</a>';
      return;
    }

    var html = '<div class="table-responsive"><table class="table align-middle">';
    html += "<thead><tr><th>Producto</th><th>Cantidad</th><th>Subtotal</th><th><span class=\"visually-hidden\">Quitar</span></th></tr></thead><tbody>";

    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      html += "<tr>";
      html += "<td><strong>" + VistaComun.limpiar(it.nombre) + "</strong>";
      html += '<br><span class="small">' + VistaComun.limpiar(VistaComun.textoOpciones(it)) + "</span>";
      if (it.observacion !== "") {
        html += '<br><span class="small fst-italic">Nota: ' + VistaComun.limpiar(it.observacion) + "</span>";
      }
      html += '<br><span class="small">' + VistaComun.soles(it.precioUnitario) + " c/u</span></td>";
      html += '<td class="text-nowrap">';
      html += '<button class="btn btn-sm btn-outline-secondary" aria-label="Quitar una unidad" onclick="cambiarCantidad(\'' + it.idLinea + '\', -1)">-</button> ';
      html += "<strong>" + it.cantidad + "</strong> ";
      html += '<button class="btn btn-sm btn-outline-secondary" aria-label="Agregar una unidad" onclick="cambiarCantidad(\'' + it.idLinea + '\', 1)">+</button>';
      html += "</td>";
      html += "<td>" + VistaComun.soles(it.precioUnitario * it.cantidad) + "</td>";
      html += '<td><button class="btn btn-sm btn-outline-danger" onclick="quitarProducto(\'' + it.idLinea + '\')">Quitar</button></td>';
      html += "</tr>";
    }

    html += "</tbody></table></div>";
    html += '<p class="fs-4 text-end">Total: <span class="precio">' + VistaComun.soles(total) + "</span></p>";
    html += '<button class="btn btn-outline-danger" onclick="vaciarCarrito()">Vaciar carrito</button>';
    contenedor.innerHTML = html;
  },

  mostrarResumen: function (datos, items, total) {
    var html = "<p><strong>Cliente:</strong> " + VistaComun.limpiar(datos.nombre) + " (DNI " + VistaComun.limpiar(datos.dni) + ")</p>";
    html += "<p><strong>Modalidad:</strong> " + datos.modalidad + "</p>";
    html += "<p><strong>Método de pago:</strong> " + datos.metodoPago;
    if (datos.metodoPago === "Efectivo") {
      html += " (pagas con " + VistaComun.soles(datos.monto) + ")";
    }
    html += "</p><ul>";
    for (var i = 0; i < items.length; i++) {
      html += "<li>" + items[i].cantidad + " x " + VistaComun.limpiar(items[i].nombre);
      var detalle = VistaComun.textoOpciones(items[i]);
      if (detalle !== "") {
        html += '<br><span class="small">' + VistaComun.limpiar(detalle) + "</span>";
      }
      if (items[i].observacion !== "") {
        html += '<br><span class="small fst-italic">Nota: ' + VistaComun.limpiar(items[i].observacion) + "</span>";
      }
      html += "</li>";
    }
    html += "</ul>";
    html += '<p class="fs-5">Total a pagar: <span class="precio">' + VistaComun.soles(total) + "</span></p>";
    document.getElementById("resumen-cuerpo").innerHTML = html;
  },

  mostrarConfirmacion: function (pedido) {
    document.getElementById("zona-pedido").classList.add("d-none");
    document.getElementById("confirmacion").classList.remove("d-none");
    document.getElementById("codigo-confirmado").textContent = pedido.codigo;

    var html = "<ul>";
    for (var i = 0; i < pedido.items.length; i++) {
      html += "<li>" + pedido.items[i].cantidad + " x " + VistaComun.limpiar(pedido.items[i].nombre) + "</li>";
    }
    html += "</ul>";
    html += "<p><strong>Modalidad:</strong> " + pedido.modalidad + "<br>";
    html += "<strong>Método de pago:</strong> " + pedido.metodoPago + "<br>";
    html += "<strong>Total:</strong> " + VistaComun.soles(pedido.total) + "</p>";
    document.getElementById("resumen-confirmado").innerHTML = html;

    document.getElementById("enlace-seguimiento").href = "seguimiento.html";
  }
};
