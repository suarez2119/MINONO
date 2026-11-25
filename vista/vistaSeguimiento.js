var VistaSeguimiento = {
  mostrarSinPedidos: function () {
    document.getElementById("resultado").innerHTML =
      '<div class="alert alert-warning" role="alert">No encontramos pedidos con este DNI. Cuando hagas uno, aparecerá aquí.</div>';
  },

  mostrarPedidos: function (pedidos, tiempos) {
    var html = "";
    for (var i = 0; i < pedidos.length; i++) {
      html += this.crearTarjeta(pedidos[i], tiempos[i]);
    }
    document.getElementById("resultado").innerHTML = html;
  },

  crearTarjeta: function (pedido, minutos) {
    var html = '<article class="card mb-4"><div class="card-body">';
    html += '<p class="mb-1">Código de tu pedido</p>';
    html += '<p class="codigo-grande">' + pedido.codigo + "</p>";

    var terminado = (pedido.estado === "Cancelado" || pedido.estado === "Anulado");

    if (pedido.estado === "Listo para entrega") {
      html += '<div class="aviso-listo" role="alert">¡Tu pedido está listo! Acércate a caja a pagar y recogerlo.</div>';
    }

    if (pedido.estado === "Cancelado") {
      html += '<div class="alert alert-secondary" role="alert">Cancelaste este pedido.</div>';
    }
    if (pedido.estado === "Anulado") {
      html += '<div class="alert alert-secondary" role="alert">Este pedido fue anulado porque no se recogió a tiempo.</div>';
    }

    if (terminado === false) {
      html += this.crearPasos(pedido.estado);
      if (pedido.estado === "Pendiente" || pedido.estado === "En preparación") {
        html += '<p class="text-center">Tiempo estimado: <strong>' + minutos + " minutos</strong></p>";
      }
    }

    html += "<h2 class=\"h5\">Detalle</h2><ul>";
    for (var i = 0; i < pedido.items.length; i++) {
      var it = pedido.items[i];
      html += "<li";
      if (terminado) {
        html += ' class="completada"';
      }
      html += ">" + it.cantidad + " x " + VistaComun.limpiar(it.nombre);
      var detalle = VistaComun.textoOpciones(it);
      if (detalle !== "") {
        html += '<br><span class="small">' + VistaComun.limpiar(detalle) + "</span>";
      }
      html += "</li>";
    }
    html += "</ul>";
    html += "<p><strong>Modalidad:</strong> " + pedido.modalidad + "<br>";
    html += "<strong>Método de pago:</strong> " + pedido.metodoPago + " (se paga con el personal)<br>";
    html += "<strong>Total:</strong> " + VistaComun.soles(pedido.total) + "</p>";

    if (pedido.estado === "Pendiente") {
      html += '<button class="btn btn-outline-danger" onclick="cancelarPedido(\'' + pedido.codigo + '\')">Cancelar pedido</button>';
    }

    html += "</div></article>";
    return html;
  },

  crearPasos: function (estado) {
    var posicion = ESTADOS.indexOf(estado);
    var html = '<ol class="pasos">';
    for (var i = 0; i < ESTADOS.length; i++) {
      var clase = "paso";
      if (estado === "Entregado" || i < posicion) {
        clase = clase + " hecho";
      } else if (i === posicion) {
        clase = clase + " actual";
      }
      html += '<li class="' + clase + '">' + ESTADOS[i] + "</li>";
    }
    html += "</ol>";
    return html;
  }
};
