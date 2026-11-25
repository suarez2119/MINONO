var PersonalModelo = {
  clave: "minono_sesion",

  usuarios: [
    { usuario: "CAJA", clave: "cajaminono", rol: "Cajero" },
    { usuario: "BARISTA", clave: "baristaminono", rol: "Barista" },
    { usuario: "ADMIN", clave: "adminminono", rol: "Administrador" }
  ],

  iniciarSesion: function (usuario, clave) {
    for (var i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].usuario === usuario && this.usuarios[i].clave === clave) {
        var persona = { usuario: this.usuarios[i].usuario, rol: this.usuarios[i].rol };
        sessionStorage.setItem(this.clave, JSON.stringify(persona));
        return persona;
      }
    }
    return null;
  },

  sesionActual: function () {
    var guardado = sessionStorage.getItem(this.clave);
    if (guardado === null) {
      return null;
    }
    return JSON.parse(guardado);
  },

  cerrarSesion: function () {
    sessionStorage.removeItem(this.clave);
  }
};
