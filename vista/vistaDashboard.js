var VistaDashboard = {
  graficoEstados: null,
  graficoProductos: null,

  mostrar: function (stats, pedidosHoy) {
    document.getElementById("stat-total").textContent = stats.total;
    document.getElementById("stat-pendientes").textContent = stats.pendientes;
    document.getElementById("stat-preparacion").textContent = stats.preparacion;
    document.getElementById("stat-listos").textContent = stats.listos;
    document.getElementById("stat-entregados").textContent = stats.entregados;
    document.getElementById("stat-ventas").textContent = VistaComun.soles(stats.ventas);

    this.mostrarGraficos(stats);
    this.mostrarUltimos(pedidosHoy);
  },

  mostrarGraficos: function (stats) {
    if (typeof Chart === "undefined") {
      document.getElementById("zona-graficos").innerHTML =
        '<p class="text-center">No se pudo cargar la librería de gráficos. Revisa tu conexión a internet.</p>';
      return;
    }

    var valoresEstados = [stats.pendientes, stats.preparacion, stats.listos, stats.entregados];

    var nombres = Object.keys(stats.productos);
    nombres.sort(function (a, b) {
      return stats.productos[b] - stats.productos[a];
    });
    nombres = nombres.slice(0, 5);
    var cantidades = [];
    for (var i = 0; i < nombres.length; i++) {
      cantidades.push(stats.productos[nombres[i]]);
    }

    if (this.graficoEstados === null) {
      this.graficoEstados = new Chart(document.getElementById("grafico-estados"), {
        type: "doughnut",
        data: {
          labels: ["Pendiente", "En preparación", "Listo", "Entregado"],
          datasets: [{ data: valoresEstados, backgroundColor: ["#B3261E", "#B26A00", "#2E7D32", "#794B32"] }]
        },
        options: { responsive: true, maintainAspectRatio: false }
      });
    } else {
      this.graficoEstados.data.datasets[0].data = valoresEstados;
      this.graficoEstados.update();
    }

    if (this.graficoProductos === null) {
      this.graficoProductos = new Chart(document.getElementById("grafico-productos"), {
        type: "bar",
        data: {
          labels: nombres,
          datasets: [{ label: "Unidades pedidas", data: cantidades, backgroundColor: "#CBA17D" }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: "y",
          scales: { x: { beginAtZero: true, ticks: { precision: 0 } } }
        }
      });
    } else {
      this.graficoProductos.data.labels = nombres;
      this.graficoProductos.data.datasets[0].data = cantidades;
      this.graficoProductos.update();
    }
  },

  mostrarUltimos: function (pedidosHoy) {
    var cuerpo = document.getElementById("tabla-ultimos");
    var html = "";
    var inicio = pedidosHoy.length - 5;
    if (inicio < 0) {
      inicio = 0;
    }

    for (var i = pedidosHoy.length - 1; i >= inicio; i--) {
      var p = pedidosHoy[i];
      html += "<tr>";
      html += "<td>" + p.codigo + "</td>";
      html += "<td>" + VistaComun.limpiar(p.cliente.nombre) + "</td>";
      html += "<td>" + p.estado + "</td>";
      html += "<td>" + p.metodoPago + "</td>";
      html += "<td>" + VistaComun.soles(p.total) + "</td>";
      html += "</tr>";
    }

    if (html === "") {
      html = '<tr><td colspan="5" class="text-center">Todavía no hay pedidos hoy.</td></tr>';
    }
    cuerpo.innerHTML = html;
  }
};
