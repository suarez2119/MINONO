var VistaComun = {
  tamanosLetra: [100, 125, 150],
  nivelLetra: 0,

  iniciar: function () {
    this.actualizarInsignia();
    this.crearBotonLetra();
  },

  crearBotonLetra: function () {
    var guardado = Number(localStorage.getItem("minono_letra"));
    if (this.tamanosLetra[guardado] !== undefined) {
      this.nivelLetra = guardado;
    }
    this.aplicarLetra();

    var boton = document.createElement("button");
    boton.id = "btn-letra";
    boton.type = "button";
    boton.textContent = "Aa";
    boton.setAttribute("aria-label", "Cambiar el tamaño de la letra");
    boton.onclick = function () {
      VistaComun.cambiarLetra();
    };
    document.body.appendChild(boton);
  },

  cambiarLetra: function () {
    this.nivelLetra = this.nivelLetra + 1;
    if (this.nivelLetra >= this.tamanosLetra.length) {
      this.nivelLetra = 0;
    }
    localStorage.setItem("minono_letra", this.nivelLetra);
    this.aplicarLetra();
  },

  aplicarLetra: function () {
    document.documentElement.style.fontSize = this.tamanosLetra[this.nivelLetra] + "%";
  },

  actualizarInsignia: function () {
    var insignia = document.getElementById("insignia-carrito");
    if (insignia !== null) {
      insignia.textContent = CarritoModelo.cantidadTotal();
    }
  },

  soles: function (numero) {
    return "S/ " + Number(numero).toFixed(2);
  },

  hora: function (milisegundos) {
    return new Date(milisegundos).toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" });
  },

  limpiar: function (texto) {
    var div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
  },

  mostrarMensaje: function (idContenedor, texto, tipo) {
    var contenedor = document.getElementById(idContenedor);
    contenedor.innerHTML = "";
    var aviso = document.createElement("div");
    aviso.className = "alert alert-" + tipo;
    aviso.setAttribute("role", "alert");
    aviso.textContent = texto;
    contenedor.appendChild(aviso);
    if (tipo === "success") {
      setTimeout(function () {
        aviso.remove();
      }, 3000);
    }
  },

  mostrarErrores: function (idContenedor, errores) {
    var contenedor = document.getElementById(idContenedor);
    var html = '<div class="alert alert-danger" role="alert"><strong>Revisa lo siguiente:</strong><ul class="mb-0">';
    for (var i = 0; i < errores.length; i++) {
      html += "<li>" + this.limpiar(errores[i]) + "</li>";
    }
    html += "</ul></div>";
    contenedor.innerHTML = html;
  },

  textoOpciones: function (item) {
    var partes = [];
    if (item.tamano !== "") {
      partes.push("Tamaño " + item.tamano.toLowerCase());
    }
    if (item.leche !== "") {
      partes.push("Leche " + item.leche.toLowerCase());
    }
    if (item.azucar !== "") {
      partes.push("Azúcar: " + item.azucar.toLowerCase());
    }
    if (item.extras.length > 0) {
      partes.push("Extras: " + item.extras.join(", "));
    }
    return partes.join(" · ");
  }
};
