var VistaMenu = {
  mostrarProductos: function (lista) {
    var contenedor = document.getElementById("lista-productos");
    contenedor.innerHTML = "";

    if (lista.length === 0) {
      contenedor.innerHTML = '<p class="text-center">No encontramos productos con ese nombre. Prueba con otra palabra.</p>';
      return;
    }

    for (var i = 0; i < lista.length; i++) {
      var p = lista[i];

      var columna = document.createElement("div");
      columna.className = "col-sm-6 col-xl-4 mb-4";

      var imagen = "";
      if (p.imagen !== "") {
        imagen = '<img src="ImagenesMenu/' + p.imagen + '" alt="' + p.nombre + '">';
      }

      var html = '<article class="card h-100 producto-card">';
      html += '<div class="producto-img">' + imagen + "</div>";
      html += '<div class="card-body d-flex flex-column">';
      html += '<div class="d-flex justify-content-between align-items-start gap-2">';
      html += '<h3 class="producto-nombre">' + p.nombre + "</h3>";
      html += '<span class="precio producto-precio">' + VistaComun.soles(p.precio) + "</span>";
      html += "</div>";
      html += "<p>" + p.descripcion + "</p>";
      html += '<div class="d-flex justify-content-between align-items-end mt-auto">';
      html += '<span class="badge text-bg-success">Disponible</span>';
      html += '<button class="btn btn-minono btn-mas" onclick="abrirDetalle(' + p.id + ')" aria-label="Agregar ' + p.nombre + ' al carrito">+</button>';
      html += "</div></div></article>";

      columna.innerHTML = html;
      contenedor.appendChild(columna);
    }
  },

  marcarCategoria: function (categoria) {
    var botones = document.getElementsByClassName("btn-categoria");
    for (var i = 0; i < botones.length; i++) {
      if (botones[i].getAttribute("data-categoria") === categoria) {
        botones[i].classList.add("activa");
      } else {
        botones[i].classList.remove("activa");
      }
    }
  },

  mostrarDetalle: function (p) {
    document.getElementById("modal-titulo").textContent = p.nombre;
    document.getElementById("modal-descripcion").textContent = p.descripcion;
    document.getElementById("mensajes-modal").innerHTML = "";
    document.getElementById("opcion-cantidad").value = 1;
    document.getElementById("opcion-observacion").value = "";

    var html = "";
    var i;

    if (p.opciones.tamano) {
      html += '<div class="mb-3"><label for="opcion-tamano" class="form-label">Tamaño</label>';
      html += '<select id="opcion-tamano" class="form-select" onchange="recalcularPrecio()">';
      for (i = 0; i < TAMANOS.length; i++) {
        html += "<option>" + TAMANOS[i].nombre + "</option>";
      }
      html += "</select></div>";
    }

    if (p.opciones.leche) {
      html += '<div class="mb-3"><label for="opcion-leche" class="form-label">Tipo de leche</label>';
      html += '<select id="opcion-leche" class="form-select" onchange="recalcularPrecio()">';
      for (i = 0; i < LECHES.length; i++) {
        html += "<option>" + LECHES[i].nombre + "</option>";
      }
      html += "</select></div>";
    }

    if (p.opciones.azucar) {
      html += '<div class="mb-3"><label for="opcion-azucar" class="form-label">Nivel de azúcar</label>';
      html += '<select id="opcion-azucar" class="form-select">';
      for (i = 0; i < AZUCARES.length; i++) {
        html += "<option";
        if (AZUCARES[i] === "Normal") {
          html += " selected";
        }
        html += ">" + AZUCARES[i] + "</option>";
      }
      html += "</select></div>";
    }

    if (p.opciones.extras.length > 0) {
      html += '<fieldset class="mb-3"><legend class="form-label fs-6">Extras</legend>';
      for (i = 0; i < p.opciones.extras.length; i++) {
        var extra = p.opciones.extras[i];
        html += '<div class="form-check">';
        html += '<input class="form-check-input opcion-extra" type="checkbox" id="extra' + i + '" value="' + extra.nombre + '" onchange="recalcularPrecio()">';
        html += '<label class="form-check-label" for="extra' + i + '">' + extra.nombre + " (+" + VistaComun.soles(extra.extra) + ")</label>";
        html += "</div>";
      }
      html += "</fieldset>";
    }

    document.getElementById("modal-opciones").innerHTML = html;
  },

  mostrarPrecio: function (valor) {
    document.getElementById("modal-precio").textContent = "Total: " + VistaComun.soles(valor);
  },

  mostrarMini: function () {
    var items = CarritoModelo.obtener();
    var html = "";

    if (items.length === 0) {
      html = '<p class="small">Aún no agregaste productos.</p>';
    }

    for (var i = 0; i < items.length; i++) {
      var it = items[i];
      html += '<div class="mini-item">';
      html += "<strong>" + VistaComun.limpiar(it.nombre) + "</strong>";
      var detalle = VistaComun.textoOpciones(it);
      if (detalle !== "") {
        html += '<br><span class="small">' + VistaComun.limpiar(detalle) + "</span>";
      }
      html += '<div class="d-flex justify-content-between align-items-center mt-1">';
      html += '<span class="text-nowrap">';
      html += '<button class="btn btn-sm btn-outline-secondary" aria-label="Quitar una unidad" onclick="cambiarCantidadMini(\'' + it.idLinea + '\', -1)">-</button> ';
      html += "<strong>" + it.cantidad + "</strong> ";
      html += '<button class="btn btn-sm btn-outline-secondary" aria-label="Agregar una unidad" onclick="cambiarCantidadMini(\'' + it.idLinea + '\', 1)">+</button>';
      html += "</span>";
      html += "<span>" + VistaComun.soles(it.precioUnitario * it.cantidad) + "</span>";
      html += "</div>";
      html += '<button class="btn btn-sm btn-outline-danger mt-2" onclick="quitarMini(\'' + it.idLinea + '\')">Quitar</button>';
      html += "</div>";
    }

    document.getElementById("mini-lista").innerHTML = html;
    document.getElementById("mini-total").textContent = VistaComun.soles(CarritoModelo.total());
  },

  mostrarSesion: function (cliente) {
    var saludo = document.getElementById("saludo");
    var salir = document.getElementById("btn-salir");
    var zonaCarrito = document.getElementById("zona-carrito");
    var zonaCatalogo = document.getElementById("zona-catalogo");

    if (cliente === null) {
      saludo.classList.add("d-none");
      salir.classList.add("d-none");
      zonaCarrito.classList.add("d-none");
      zonaCatalogo.className = "col-lg-12";
    } else {
      saludo.textContent = "Hola, " + cliente.nombres;
      saludo.classList.remove("d-none");
      salir.classList.remove("d-none");
      zonaCarrito.classList.remove("d-none");
      zonaCatalogo.className = "col-lg-9";
    }
  }
};
