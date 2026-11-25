var ClienteModelo = {
  clave: "minono_clientes",
  claveSesion: "minono_cliente_sesion",

  listar: function () {
    var guardado = localStorage.getItem(this.clave);
    if (guardado === null) {
      return [];
    }
    return JSON.parse(guardado);
  },

  buscarPorDni: function (dni) {
    var lista = this.listar();
    for (var i = 0; i < lista.length; i++) {
      if (lista[i].dni === dni) {
        return lista[i];
      }
    }
    return null;
  },

  validarRegistro: function (datos) {
    var errores = [];

    if (datos.nombres.length < 2) {
      errores.push("Escribe tus nombres.");
    }
    if (datos.apellidos.length < 2) {
      errores.push("Escribe tus apellidos.");
    }

    if (/^[0-9]{8}$/.test(datos.dni) === false) {
      errores.push("El DNI debe tener 8 números.");
    } else if (this.buscarPorDni(datos.dni) !== null) {
      errores.push("Ya existe una cuenta con ese DNI. Inicia sesión.");
    }

    if (datos.clave.length < 6) {
      errores.push("La contraseña debe tener mínimo 6 caracteres.");
    }
    if (datos.clave !== datos.repetir) {
      errores.push("Las contraseñas no coinciden.");
    }
    return errores;
  },

  registrar: function (datos) {
    var lista = this.listar();
    lista.push({
      dni: datos.dni,
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      clave: datos.clave
    });
    localStorage.setItem(this.clave, JSON.stringify(lista));
  },

  iniciarSesion: function (dni, clave) {
    var cliente = this.buscarPorDni(dni);
    if (cliente !== null && cliente.clave === clave) {
      var sesion = { dni: cliente.dni, nombres: cliente.nombres, apellidos: cliente.apellidos };
      sessionStorage.setItem(this.claveSesion, JSON.stringify(sesion));
      return sesion;
    }
    return null;
  },

  sesionActual: function () {
    var guardado = sessionStorage.getItem(this.claveSesion);
    if (guardado === null) {
      return null;
    }
    return JSON.parse(guardado);
  },

  cerrarSesion: function () {
    sessionStorage.removeItem(this.claveSesion);
  }
};
