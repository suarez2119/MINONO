class Producto {
  constructor(id, nombre, categoria, descripcion, precio, imagen, opciones) {
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.descripcion = descripcion;
    this.precio = precio;
    this.imagen = imagen;
    this.opciones = opciones;
  }
}

var TAMANOS = [
  { nombre: "Chico", extra: 0 },
  { nombre: "Mediano", extra: 2 },
  { nombre: "Grande", extra: 4 }
];

var LECHES = [
  { nombre: "Entera", extra: 0 },
  { nombre: "Deslactosada", extra: 0 },
  { nombre: "De almendras", extra: 2 }
];

var AZUCARES = ["Ninguna", "Poca", "Normal", "Extra"];

var EXTRAS_BEBIDA = [
  { nombre: "Shot extra de café", extra: 3 },
  { nombre: "Crema chantilly", extra: 2 }
];

var EXTRAS_POSTRE = [
  { nombre: "Salsa de chocolate", extra: 2 },
  { nombre: "Crema chantilly", extra: 2 }
];

var EXTRAS_SALADO = [
  { nombre: "Queso extra", extra: 2 }
];

var SIN_OPCIONES = { tamano: false, leche: false, azucar: false, extras: [] };
var OPCIONES_POSTRE = { tamano: false, leche: false, azucar: false, extras: EXTRAS_POSTRE };
var OPCIONES_SALADO = { tamano: false, leche: false, azucar: false, extras: EXTRAS_SALADO };
var OPCIONES_BEBIDA = { tamano: true, leche: false, azucar: true, extras: [] };
var OPCIONES_BEBIDA_LECHE = { tamano: true, leche: true, azucar: true, extras: [] };
var OPCIONES_ESPRESSO = { tamano: false, leche: false, azucar: true, extras: [{ nombre: "Shot extra de café", extra: 3 }] };
var OPCIONES_AMERICANO = { tamano: true, leche: false, azucar: true, extras: [{ nombre: "Shot extra de café", extra: 3 }] };
var OPCIONES_CAFE_LECHE = { tamano: true, leche: true, azucar: true, extras: EXTRAS_BEBIDA };
var OPCIONES_CHOCOLATE = { tamano: true, leche: true, azucar: true, extras: [{ nombre: "Crema chantilly", extra: 2 }] };

var ProductoModelo = {
  categorias: ["Bebidas frías", "Bebidas calientes", "Jugos", "Cookies", "Salados", "Dulces"],

  lista: [
    new Producto(1, "Americano frío", "Bebidas frías", "Espresso con agua fría y hielo.", 9.0, "Americano_frio.jpg", OPCIONES_AMERICANO),
    new Producto(2, "Ice caramel macchiato", "Bebidas frías", "Espresso con leche fría, hielo y caramelo.", 14.0, "Ice caramel macchiato.jpg", OPCIONES_CAFE_LECHE),
    new Producto(3, "Afogatto (vainilla)", "Bebidas frías", "Espresso caliente sobre helado de vainilla.", 14.0, "Afogatto (vainilla).jpg", SIN_OPCIONES),
    new Producto(4, "Iced matcha latte", "Bebidas frías", "Té matcha con leche fría y hielo.", 14.0, "Iced matcha latte.jpg", OPCIONES_BEBIDA_LECHE),
    new Producto(5, "Frozen de mango", "Bebidas frías", "Bebida helada y granizada de mango.", 14.0, "Frozen de mango.jpg", OPCIONES_BEBIDA),
    new Producto(6, "Frozen de fresa", "Bebidas frías", "Bebida helada y granizada de fresa.", 14.0, "Frozen de fresa.jpg", OPCIONES_BEBIDA),
    new Producto(7, "Frozen de limón", "Bebidas frías", "Bebida helada y granizada de limón.", 14.0, "Frozen de limón.jpg", OPCIONES_BEBIDA),
    new Producto(8, "Frozen de maracuyá", "Bebidas frías", "Bebida helada y granizada de maracuyá.", 14.0, "Frozen de maracuyá.jpg", OPCIONES_BEBIDA),
    new Producto(9, "Frappé de chocolate", "Bebidas frías", "Chocolate frío licuado con hielo y leche.", 15.0, "Frappé de chocolate.jpg", OPCIONES_CHOCOLATE),
    new Producto(10, "Frappé de café", "Bebidas frías", "Café frío licuado con hielo y leche.", 15.0, "Frappé de café.jpg", OPCIONES_CAFE_LECHE),
    new Producto(11, "Frappé de oreo", "Bebidas frías", "Galleta oreo licuada con hielo y leche.", 15.0, "Frappé de oreo.jpg", OPCIONES_CHOCOLATE),
    new Producto(12, "Chocolate frío", "Bebidas frías", "Chocolate con leche bien helada.", 15.0, "Chocolate frío.jpg", OPCIONES_CHOCOLATE),

    new Producto(13, "Infusiones", "Bebidas calientes", "Infusión caliente para acompañar tu tarde.", 6.0, "Infusiones.jpg", OPCIONES_BEBIDA),
    new Producto(14, "Americano", "Bebidas calientes", "Espresso largo con agua caliente.", 7.0, "Americano.jpg", OPCIONES_AMERICANO),
    new Producto(15, "Espresso simple", "Bebidas calientes", "Café concentrado, intenso y de cuerpo suave.", 7.0, "Espresso simple.jpg", OPCIONES_ESPRESSO),
    new Producto(16, "Capuccino", "Bebidas calientes", "Espresso con leche espumada y una capa de espuma.", 10.0, "Capuccino.jpg", OPCIONES_CAFE_LECHE),
    new Producto(17, "Caramel macchiato", "Bebidas calientes", "Espresso con leche vaporizada y caramelo.", 12.0, "Caramel macchiato.jpg", OPCIONES_CAFE_LECHE),
    new Producto(18, "Matcha latte", "Bebidas calientes", "Té matcha con leche caliente.", 12.0, "Matcha latte.jpg", OPCIONES_BEBIDA_LECHE),
    new Producto(19, "Mocca", "Bebidas calientes", "Espresso con chocolate y leche caliente.", 12.0, "Mocca.jpg", OPCIONES_CAFE_LECHE),
    new Producto(20, "Chocolate caliente", "Bebidas calientes", "Chocolate de taza 100% cacao.", 12.0, "Chocolate caliente.jpg", OPCIONES_CHOCOLATE),

    new Producto(21, "Papaya", "Jugos", "Jugo natural de papaya.", 9.0, "Papaya.jpg", OPCIONES_BEBIDA),
    new Producto(22, "Piña", "Jugos", "Jugo natural de piña.", 9.0, "Piña.jpg", OPCIONES_BEBIDA),
    new Producto(23, "Fresa", "Jugos", "Jugo natural de fresa.", 10.0, "Fresa.jpg", OPCIONES_BEBIDA),
    new Producto(24, "Papaya con piña", "Jugos", "Jugo natural de papaya y piña.", 10.0, "Papaya con piña.jpg", OPCIONES_BEBIDA),
    new Producto(25, "Surtido", "Jugos", "Jugo natural de frutas variadas.", 10.0, "Surtido.jpg", OPCIONES_BEBIDA),
    new Producto(26, "Jugo con leche", "Jugos", "Jugo de fruta licuado con leche.", 12.0, "Jugo con leche.jpg", OPCIONES_BEBIDA_LECHE),

    new Producto(27, "Red velvet", "Cookies", "Galleta suave sabor red velvet.", 6.0, "Red velvet cookie.jpg", SIN_OPCIONES),
    new Producto(28, "Cookies and cream", "Cookies", "Galleta con trozos de galleta y crema.", 6.0, "Cookies and cream.jpg", SIN_OPCIONES),
    new Producto(29, "Pistacho", "Cookies", "Galleta suave con sabor a pistacho.", 6.0, "Pistacho.jpg", SIN_OPCIONES),
    new Producto(30, "Crema de avellana", "Cookies", "Galleta rellena de crema de avellana.", 6.0, "Crema de avellana.jpg", SIN_OPCIONES),

    new Producto(31, "Enrollado de hotdog", "Salados", "Salchicha envuelta en masa horneada.", 5.0, "Enrollado de hotdog.jpg", SIN_OPCIONES),
    new Producto(32, "Tamal (chancho o pollo)", "Salados", "Tamal de masa de maíz relleno de chancho o pollo.", 5.0, "Tamal (chancho o pollo).jpg", SIN_OPCIONES),
    new Producto(33, "Empanada de carne", "Salados", "Empanada horneada rellena de carne.", 6.0, "Empanada de carne.jpg", SIN_OPCIONES),
    new Producto(34, "Empanada de pollo", "Salados", "Empanada horneada rellena de pollo.", 6.0, "Empanada de pollo.jpg", SIN_OPCIONES),
    new Producto(35, "Pastel de acelga", "Salados", "Pastel horneado de acelga.", 7.0, "Pastel de acelga.jpg", SIN_OPCIONES),
    new Producto(36, "Pan con pollo", "Salados", "Pan relleno de pollo deshilachado.", 7.0, "Pan con pollo.jpg", SIN_OPCIONES),
    new Producto(37, "Papa rellena", "Salados", "Papa rellena frita y dorada.", 7.0, "Papa rellena.jpg", SIN_OPCIONES),
    new Producto(38, "Croissant con jamón inglés y queso", "Salados", "Croissant relleno de jamón inglés y queso.", 8.0, "Croissant con jamón inglés y queso.jpg", OPCIONES_SALADO),
    new Producto(39, "Croissant con jamón del país artesanal y queso", "Salados", "Croissant relleno de jamón del país artesanal y queso.", 12.0, "Croissant con jamón del país artesanal y queso.jpg", OPCIONES_SALADO),
    new Producto(40, "Croissant de pollo", "Salados", "Croissant relleno de pollo.", 12.0, "Croissant de pollo.jpg", SIN_OPCIONES),
    new Producto(41, "Mixto caliente", "Salados", "Pan tostado con jamón y queso derretido.", 12.0, "Mixto caliente.jpg", OPCIONES_SALADO),
    new Producto(42, "Salchipapa", "Salados", "Papas fritas con salchicha.", 15.0, "Salchipapa.jpg", SIN_OPCIONES),
    new Producto(43, "Hamburguesa", "Salados", "Hamburguesa de carne en pan.", 18.0, "Hamburguesa.jpg", OPCIONES_SALADO),
    new Producto(44, "Rocoto relleno", "Salados", "Rocoto relleno horneado.", 18.0, "Rocoto relleno.jpg", SIN_OPCIONES),
    new Producto(45, "Club sandwich", "Salados", "Sándwich de tres pisos con variedad de rellenos.", 25.0, "Club sandwich.jpg", OPCIONES_SALADO),

    new Producto(46, "Alfajor", "Dulces", "Alfajor relleno de manjar blanco.", 4.0, "Alfajor.jpg", SIN_OPCIONES),
    new Producto(47, "Dona", "Dulces", "Dona suave y esponjosa.", 4.0, "Dona.jpg", SIN_OPCIONES),
    new Producto(48, "Porción de keke de limón", "Dulces", "Porción de keke esponjoso de limón.", 4.0, "Porción de keke de limón.jpg", SIN_OPCIONES),
    new Producto(49, "Muffin de arándanos", "Dulces", "Muffin esponjoso con arándanos.", 4.0, "Muffin de arándanos.jpg", SIN_OPCIONES),
    new Producto(50, "Muffin de plátano", "Dulces", "Muffin esponjoso de plátano.", 5.0, "Muffin de plátano.jpg", SIN_OPCIONES),
    new Producto(51, "Pionono de manjar", "Dulces", "Pionono relleno de manjar.", 5.0, "Pionono de manjar.jpg", SIN_OPCIONES),
    new Producto(52, "Milhojas de manjar", "Dulces", "Capas de hojaldre con manjar.", 5.0, "Milhojas de manjar.jpg", SIN_OPCIONES),
    new Producto(53, "Pye de manzana", "Dulces", "Pye de manzana con masa crocante.", 6.0, "Pye de manzana.jpg", OPCIONES_POSTRE),
    new Producto(54, "Crema volteada", "Dulces", "Postre cremoso con caramelo.", 6.0, "Crema volteada.jpg", SIN_OPCIONES),
    new Producto(55, "Strudel de manzana", "Dulces", "Hojaldre relleno de manzana.", 6.0, "Strudel de manzana.jpg", OPCIONES_POSTRE),
    new Producto(56, "Tartaleta de fresa", "Dulces", "Tartaleta con crema y fresas.", 7.0, "Tartaleta de fresa.jpg", OPCIONES_POSTRE),
    new Producto(57, "Tartaleta de durazno", "Dulces", "Tartaleta con crema y duraznos.", 7.0, "Tartaleta de durazno.jpg", OPCIONES_POSTRE),
    new Producto(58, "Porción de torta helada", "Dulces", "Porción de torta helada.", 7.0, "Porción de torta helada.jpg", OPCIONES_POSTRE),
    new Producto(59, "Porción de torta de Selva negra o mocca", "Dulces", "Porción de torta de selva negra o de mocca.", 7.0, "Porción de torta de Selva negra o mocca.jpg", OPCIONES_POSTRE),
    new Producto(60, "Cheesecake frío de fresa", "Dulces", "Cheesecake cremoso frío con fresa.", 8.0, "Cheesecake frío de fresa.jpg", OPCIONES_POSTRE),
    new Producto(61, "Cheesecake frío de maracuyá", "Dulces", "Cheesecake cremoso frío con maracuyá.", 8.0, "Cheesecake frío de maracuyá.jpg", OPCIONES_POSTRE),
    new Producto(62, "Cheesecake frío de sauco", "Dulces", "Cheesecake cremoso frío con sauco.", 8.0, "Cheesecake frío de sauco.jpg", OPCIONES_POSTRE),
    new Producto(63, "Pionono frutado (vainilla o chocolate)", "Dulces", "Pionono de vainilla o chocolate con frutas.", 8.0, "Pionono frutado (vainilla o chocolate).jpg", SIN_OPCIONES),
    new Producto(64, "Milhojas de fresa", "Dulces", "Capas de hojaldre con crema y fresas.", 8.0, "Milhojas de fresa.jpg", SIN_OPCIONES),
    new Producto(65, "Porción de torta de chocolate", "Dulces", "Porción de torta húmeda de chocolate.", 8.0, "Porción de torta de chocolate.jpg", OPCIONES_POSTRE),
    new Producto(66, "Porción de torta de tres leches", "Dulces", "Porción de torta bañada en tres leches.", 8.0, "Porción de torta de tres leches.jpg", OPCIONES_POSTRE),
    new Producto(67, "Pye de limón", "Dulces", "Pye de limón con base crocante.", 8.5, "Pye de limón.jpg", OPCIONES_POSTRE),
    new Producto(68, "Carrot cake", "Dulces", "Torta de zanahoria.", 9.0, "Carrot cake.jpg", OPCIONES_POSTRE),
    new Producto(69, "Red velvet", "Dulces", "Torta suave red velvet.", 9.0, "Red velvet torta.jpg", OPCIONES_POSTRE),
    new Producto(70, "Cheesecake horneado de frutos rojos", "Dulces", "Cheesecake horneado con frutos rojos.", 10.0, "Cheesecake horneado de frutos rojos.jpg", OPCIONES_POSTRE),
    new Producto(71, "Cheesecake horneado de oreo", "Dulces", "Cheesecake horneado con galleta oreo.", 10.0, "Cheesecake horneado de oreo.jpg", OPCIONES_POSTRE),
    new Producto(72, "Crocante de manzana", "Dulces", "Postre de manzana con cobertura crocante.", 10.0, "Crocante de manzana.jpg", OPCIONES_POSTRE)
  ],

  buscarPorId: function (id) {
    for (var i = 0; i < this.lista.length; i++) {
      if (this.lista[i].id === id) {
        return this.lista[i];
      }
    }
    return null;
  },

  filtrar: function (texto, categoria) {
    var resultado = [];
    texto = texto.toLowerCase().trim();
    for (var i = 0; i < this.lista.length; i++) {
      var p = this.lista[i];
      var coincideNombre = p.nombre.toLowerCase().indexOf(texto) !== -1;
      var coincideCategoria = (categoria === "Todas" || p.categoria === categoria);
      if (coincideNombre && coincideCategoria) {
        resultado.push(p);
      }
    }
    return resultado;
  },

  calcularPrecio: function (producto, tamano, leche, extras) {
    var precio = producto.precio;
    var i, j;

    if (producto.opciones.tamano) {
      for (i = 0; i < TAMANOS.length; i++) {
        if (TAMANOS[i].nombre === tamano) {
          precio = precio + TAMANOS[i].extra;
        }
      }
    }

    if (producto.opciones.leche) {
      for (i = 0; i < LECHES.length; i++) {
        if (LECHES[i].nombre === leche) {
          precio = precio + LECHES[i].extra;
        }
      }
    }

    for (i = 0; i < extras.length; i++) {
      for (j = 0; j < producto.opciones.extras.length; j++) {
        if (producto.opciones.extras[j].nombre === extras[i]) {
          precio = precio + producto.opciones.extras[j].extra;
        }
      }
    }

    return Math.round(precio * 100) / 100;
  }
};
