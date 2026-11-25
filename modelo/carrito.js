var CarritoModelo = {
  clave: "minono_carrito",

  obtener: function () {
    var guardado = localStorage.getItem(this.clave);
    if (guardado === null) {
      return [];
    }
    return JSON.parse(guardado);
  },

  guardar: function (items) {
    localStorage.setItem(this.clave, JSON.stringify(items));
  },

  cantidadTotal: function () {
    var items = this.obtener();
    var total = 0;
    for (var i = 0; i < items.length; i++) {
      total = total + items[i].cantidad;
    }
    return total;
  },

  cantidadDeProducto: function (productoId) {
    var items = this.obtener();
    var total = 0;
    for (var i = 0; i < items.length; i++) {
      if (items[i].productoId === productoId) {
        total = total + items[i].cantidad;
      }
    }
    return total;
  },

  revisarLimites: function (productoId, cantidadNueva) {
    if (this.cantidadDeProducto(productoId) + cantidadNueva > Reglas.MAX_POR_PRODUCTO) {
      return "Solo puedes pedir hasta " + Reglas.MAX_POR_PRODUCTO + " unidades de cada producto.";
    }
    if (this.cantidadTotal() + cantidadNueva > Reglas.MAX_POR_PEDIDO) {
      return "Un pedido puede tener hasta " + Reglas.MAX_POR_PEDIDO + " productos. Para pedidos más grandes habla con el personal.";
    }
    return "";
  },

  agregar: function (item) {
    var error = this.revisarLimites(item.productoId, item.cantidad);
    if (error !== "") {
      return error;
    }
    var items = this.obtener();
    item.idLinea = "L" + Date.now();
    items.push(item);
    this.guardar(items);
    return "";
  },

  cambiarCantidad: function (idLinea, cambio) {
    var items = this.obtener();
    for (var i = 0; i < items.length; i++) {
      if (items[i].idLinea === idLinea) {
        var nueva = items[i].cantidad + cambio;
        if (nueva < 1) {
          return "";
        }
        if (cambio > 0) {
          var error = this.revisarLimites(items[i].productoId, cambio);
          if (error !== "") {
            return error;
          }
        }
        items[i].cantidad = nueva;
      }
    }
    this.guardar(items);
    return "";
  },

  quitar: function (idLinea) {
    var items = this.obtener();
    var nuevos = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].idLinea !== idLinea) {
        nuevos.push(items[i]);
      }
    }
    this.guardar(nuevos);
  },

  vaciar: function () {
    localStorage.removeItem(this.clave);
  },

  total: function () {
    var items = this.obtener();
    var suma = 0;
    for (var i = 0; i < items.length; i++) {
      suma = suma + items[i].precioUnitario * items[i].cantidad;
    }
    return Math.round(suma * 100) / 100;
  }
};
