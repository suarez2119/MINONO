var ESTADOS = ["Pendiente", "En preparación", "Listo para entrega", "Entregado"];

class Pedido {
  constructor(codigo, cliente, modalidad, metodoPago, montoEfectivo, items, total) {
    this.codigo = codigo;
    this.cliente = cliente;
    this.modalidad = modalidad;
    this.metodoPago = metodoPago;
    this.montoEfectivo = montoEfectivo;
    this.items = items;
    this.total = total;
    this.estado = "Pendiente";
    this.fecha = Date.now();
    this.fechaListo = null;
  }
}

var PedidoModelo = {
  clave: "minono_pedidos",
  claveContador: "minono_contador",

  listar: function () {
    var guardado = localStorage.getItem(this.clave);
    if (guardado === null) {
      return [];
    }
    return JSON.parse(guardado);
  },

  guardar: function (lista) {
    localStorage.setItem(this.clave, JSON.stringify(lista));
  },

  siguienteCodigo: function () {
    var numero = parseInt(localStorage.getItem(this.claveContador));
    if (isNaN(numero)) {
      numero = 0;
    }
    numero = numero + 1;
    localStorage.setItem(this.claveContador, numero);
    var texto = String(numero);
    while (texto.length < 3) {
      texto = "0" + texto;
    }
    return "MN-" + texto;
  },

  contarUnidades: function (pedido) {
    var n = 0;
    for (var i = 0; i < pedido.items.length; i++) {
      n = n + pedido.items[i].cantidad;
    }
    return n;
  },

  validar: function (datos, items, total) {
    var errores = [];

    if (items.length === 0) {
      errores.push("Tu carrito está vacío. Agrega al menos un producto del menú.");
    }

    if (Reglas.dentroDeHorario() === false) {
      errores.push("La cafetería está cerrada. Puedes ver el menú, pero los pedidos se aceptan de " +
        Reglas.HORA_APERTURA + ":00 a " + Reglas.HORA_CIERRE + ":00.");
    }

    if (datos.nombre.length < 3) {
      errores.push("Escribe tu nombre (mínimo 3 letras).");
    }

    if (/^[0-9]{8}$/.test(datos.dni) === false) {
      errores.push("El DNI debe tener 8 números.");
    }

    if (datos.telefono !== "" && /^[0-9]{9}$/.test(datos.telefono) === false) {
      errores.push("El teléfono debe tener 9 números (puedes dejarlo vacío).");
    }

    if (datos.modalidad === "") {
      errores.push("Elige si vas a consumir en el local o para llevar.");
    }

    if (datos.metodoPago === "") {
      errores.push("Elige un método de pago.");
    }

    if (datos.metodoPago === "Efectivo") {
      if (isNaN(datos.monto) || datos.monto < total) {
        errores.push("Indica con cuánto vas a pagar. El monto debe ser igual o mayor al total (S/ " + total.toFixed(2) + ").");
      }
    }

    return errores;
  },

  crear: function (datos, items, total) {
    var cliente = { nombre: datos.nombre, dni: datos.dni, telefono: datos.telefono };
    var monto = null;
    if (datos.metodoPago === "Efectivo") {
      monto = datos.monto;
    }
    var pedido = new Pedido(this.siguienteCodigo(), cliente, datos.modalidad, datos.metodoPago, monto, items, total);
    var lista = this.listar();
    lista.push(pedido);
    this.guardar(lista);
    return pedido;
  },

  buscarPorCodigo: function (codigo) {
    codigo = codigo.trim().toUpperCase();
    var lista = this.listar();
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].codigo === codigo) {
        return lista[i];
      }
    }
    return null;
  },

  buscarPorDni: function (dni) {
    var lista = this.listar();
    var resultado = [];
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].cliente.dni === dni) {
        resultado.push(lista[i]);
      }
    }
    resultado.sort(function (a, b) {
      return b.fecha - a.fecha;
    });
    return resultado.slice(0, 5);
  },

  avanzar: function (codigo) {
    var lista = this.listar();
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].codigo === codigo) {
        var posicion = ESTADOS.indexOf(lista[i].estado);
        if (posicion !== -1 && posicion < ESTADOS.length - 1) {
          lista[i].estado = ESTADOS[posicion + 1];
          if (lista[i].estado === "Listo para entrega") {
            lista[i].fechaListo = Date.now();
          }
        }
      }
    }
    this.guardar(lista);
  },

  cancelar: function (codigo) {
    var lista = this.listar();
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].codigo === codigo) {
        if (lista[i].estado !== "Pendiente") {
          return "Tu pedido ya está en preparación y no se puede cancelar.";
        }
        lista[i].estado = "Cancelado";
      }
    }
    this.guardar(lista);
    return "";
  },

  minutosDesdeListo: function (pedido) {
    if (pedido.fechaListo === null) {
      return 0;
    }
    return Math.floor((Date.now() - pedido.fechaListo) / 60000);
  },

  anular: function (codigo) {
    var lista = this.listar();
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].codigo === codigo) {
        if (lista[i].estado !== "Listo para entrega" || this.minutosDesdeListo(lista[i]) < Reglas.MINUTOS_PARA_ANULAR) {
          return "Solo se puede anular un pedido que lleva " + Reglas.MINUTOS_PARA_ANULAR + " minutos o más listo sin recoger.";
        }
        lista[i].estado = "Anulado";
      }
    }
    this.guardar(lista);
    return "";
  },

  tiempoEstimado: function (pedido) {
    var minutos = 5 + 2 * this.contarUnidades(pedido);
    var lista = this.listar();
    for (var i = 0; i < lista.length; i++) {
      var antes = lista[i].fecha < pedido.fecha;
      var enCola = (lista[i].estado === "Pendiente" || lista[i].estado === "En preparación");
      if (antes && enCola) {
        minutos = minutos + 2;
      }
    }
    return minutos;
  },

  listarActivos: function () {
    var lista = this.listar();
    var activos = [];
    for (var i = 0; i < lista.length; i++) {
      if (ESTADOS.indexOf(lista[i].estado) !== -1 && lista[i].estado !== "Entregado") {
        activos.push(lista[i]);
      }
    }
    activos.sort(function (a, b) {
      return a.fecha - b.fecha;
    });
    return activos;
  },

  listarHoy: function () {
    var lista = this.listar();
    var hoy = new Date().toDateString();
    var resultado = [];
    for (var i = 0; i < lista.length; i++) {
      if (new Date(lista[i].fecha).toDateString() === hoy) {
        resultado.push(lista[i]);
      }
    }
    return resultado;
  },

  vuelto: function (pedido) {
    if (pedido.metodoPago !== "Efectivo" || pedido.montoEfectivo === null) {
      return 0;
    }
    return Math.round((pedido.montoEfectivo - pedido.total) * 100) / 100;
  },

  estadisticas: function () {
    var hoy = this.listarHoy();
    var r = {
      total: 0, pendientes: 0, preparacion: 0, listos: 0, entregados: 0,
      cancelados: 0, ventas: 0, productos: {}
    };

    for (var i = 0; i < hoy.length; i++) {
      var p = hoy[i];
      if (p.estado === "Cancelado" || p.estado === "Anulado") {
        r.cancelados = r.cancelados + 1;
        continue;
      }
      r.total = r.total + 1;
      if (p.estado === "Pendiente") { r.pendientes++; }
      if (p.estado === "En preparación") { r.preparacion++; }
      if (p.estado === "Listo para entrega") { r.listos++; }
      if (p.estado === "Entregado") {
        r.entregados++;
        r.ventas = r.ventas + p.total;
      }
      for (var j = 0; j < p.items.length; j++) {
        var nombre = p.items[j].nombre;
        if (r.productos[nombre] === undefined) {
          r.productos[nombre] = 0;
        }
        r.productos[nombre] = r.productos[nombre] + p.items[j].cantidad;
      }
    }
    r.ventas = Math.round(r.ventas * 100) / 100;
    return r;
  }
};
