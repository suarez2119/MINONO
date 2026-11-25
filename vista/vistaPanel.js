var VistaPanel = {
  mostrarCola: function (pedidos, codigosNuevos) {
    var pendientes = "";
    var preparacion = "";
    var listos = "";
    var nPendientes = 0;
    var nPreparacion = 0;
    var nListos = 0;

    for (var i = 0; i < pedidos.length; i++) {
      var p = pedidos[i];
      var esNuevo = codigosNuevos.indexOf(p.codigo) !== -1;
      var tarjeta = this.crearTarjeta(p, esNuevo);

      if (p.estado === "Pendiente") {
        pendientes += tarjeta;
        nPendientes++;
      } else if (p.estado === "En preparación") {
        preparacion += tarjeta;
        nPreparacion++;
      } else if (p.estado === "Listo para entrega") {
        listos += tarjeta;
        nListos++;
      }
    }

    var vacio = '<p class="text-center small">No hay pedidos.</p>';
    if (pendientes === "") { pendientes = vacio; }
    if (preparacion === "") { preparacion = vacio; }
    if (listos === "") { listos = vacio; }

    document.getElementById("cola-pendiente").innerHTML = pendientes;
    document.getElementById("cola-preparacion").innerHTML = preparacion;
    document.getElementById("cola-listo").innerHTML = listos;
    document.getElementById("cuenta-pendiente").textContent = nPendientes;
    document.getElementById("cuenta-preparacion").textContent = nPreparacion;
    document.getElementById("cuenta-listo").textContent = nListos;
  },

  crearTarjeta: function (p, esNuevo) {
    var html = '<article class="card tarjeta-pedido';
    if (esNuevo) {
      html += " nuevo";
    }
    html += '"><div class="card-body">';
    html += '<h4 class="codigo-pedido h5">' + p.codigo + "</h4>";
    html += '<p class="mb-1"><strong>' + VistaComun.limpiar(p.cliente.nombre) + "</strong></p>";
    html += '<p class="mb-1 small">' + p.modalidad + " · " + VistaComun.hora(p.fecha) + "</p>";

    html += '<ul class="small ps-3">';
    for (var i = 0; i < p.items.length; i++) {
      var it = p.items[i];
      html += "<li>" + it.cantidad + " x " + VistaComun.limpiar(it.nombre);
      var detalle = VistaComun.textoOpciones(it);
      if (detalle !== "") {
        html += '<br><span class="text-body-secondary">' + VistaComun.limpiar(detalle) + "</span>";
      }
      if (it.observacion !== "") {
        html += '<br><em>Nota: ' + VistaComun.limpiar(it.observacion) + "</em>";
      }
      html += "</li>";
    }
    html += "</ul>";

    html += '<p class="small mb-2">Pago: <strong>' + p.metodoPago + "</strong> · Total " + VistaComun.soles(p.total);
    if (p.metodoPago === "Efectivo" && p.montoEfectivo !== null) {
      html += "<br>Paga con " + VistaComun.soles(p.montoEfectivo) + " (vuelto " + VistaComun.soles(PedidoModelo.vuelto(p)) + ")";
    }
    html += "</p>";

    if (p.estado === "Pendiente") {
      html += '<button class="btn btn-minono btn-sm w-100" onclick="avanzarPedido(\'' + p.codigo + '\')">Empezar a preparar</button>';
    }
    if (p.estado === "En preparación") {
      html += '<button class="btn btn-minono btn-sm w-100" onclick="avanzarPedido(\'' + p.codigo + '\')">Marcar como listo</button>';
    }
    if (p.estado === "Listo para entrega") {
      html += '<button class="btn btn-minono btn-sm w-100" onclick="avanzarPedido(\'' + p.codigo + '\')">Cobrar y marcar entregado</button>';
      var minutos = PedidoModelo.minutosDesdeListo(p);
      if (minutos >= Reglas.MINUTOS_PARA_ANULAR) {
        html += '<button class="btn btn-outline-danger btn-sm w-100 mt-2" onclick="anularPedido(\'' + p.codigo + '\')">Anular (sin recoger hace ' + minutos + " min)</button>";
      }
    }

    html += "</div></article>";
    return html;
  },

  mostrarAvisoNuevo: function (codigo) {
    VistaComun.mostrarMensaje("aviso-nuevo", "Llegó un pedido nuevo: " + codigo, "warning");
    setTimeout(function () {
      document.getElementById("aviso-nuevo").innerHTML = "";
    }, 8000);
  }
};
