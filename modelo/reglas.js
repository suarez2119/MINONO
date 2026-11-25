var Reglas = {
  MAX_POR_PRODUCTO: 10,
  MAX_POR_PEDIDO: 20,
  MINUTOS_PARA_ANULAR: 30,
  HORA_APERTURA: 8,
  HORA_CIERRE: 22,
  VALIDAR_HORARIO: false,
  SEGUNDOS_REFRESCO: 5,

  dentroDeHorario: function () {
    if (this.VALIDAR_HORARIO === false) {
      return true;
    }
    var hora = new Date().getHours();
    return hora >= this.HORA_APERTURA && hora < this.HORA_CIERRE;
  }
};
