/* =========================================================
   Smart Design | script.js
   Práctica de JavaScript (Rúbrica 6.1):
     1. Variables, tipos de datos y salida de información
     2. Arreglos y objetos
     3. Estructuras de control (if / else if / else)
     4. Bucles (for, for...of, while, do...while)
     5. Funciones
     6. Alcance (scope)
     7. Clausuras (closures)
     8. DOM: tienda, pedido, formulario y laboratorio
   Abre la consola del navegador (F12) para ver la salida.
   ========================================================= */

"use strict";

/* ---------------------------------------------------------
   1. VARIABLES Y TIPOS DE DATOS
   const = no se reasigna | let = se puede reasignar
   --------------------------------------------------------- */
const NOMBRE_TIENDA = "Smart Design";   // string
const ANIO_INICIO = 2026;               // number
let tienePromocion = true;              // boolean
let notaInterna = null;                 // null (vacío a propósito)
let sinDefinir;                         // undefined (aún sin valor)

/* ---------------------------------------------------------
   2. ARREGLOS Y OBJETOS
   Un arreglo de objetos es la forma más común de guardar
   datos de una tienda: cada objeto es un producto.
   --------------------------------------------------------- */
const paquetes = [
  {
    id: 1,
    nombre: "Logo esencial",
    categoria: "logo",
    precio: 150,
    descripcion: "Un logo en versión color y en una tinta, listo para web e impresión.",
    destacado: false
  },
  {
    id: 2,
    nombre: "Identidad de marca",
    categoria: "logo",
    precio: 350,
    descripcion: "Logo, paleta de colores, tipografías y una guía de uso de una página.",
    destacado: false
  },
  {
    id: 3,
    nombre: "Landing page",
    categoria: "web",
    precio: 450,
    descripcion: "Una página responsiva con formulario de contacto, publicada y lista para compartir.",
    destacado: true
  },
  {
    id: 4,
    nombre: "Landing page y logo",
    categoria: "web",
    precio: 550,
    descripcion: "El logo y la página diseñados juntos para que se vean como un solo negocio.",
    destacado: false
  },
  {
    id: 5,
    nombre: "Mantenimiento mensual",
    categoria: "web",
    precio: 60,
    descripcion: "Cambios de texto e imágenes, copias de seguridad y revisión de velocidad.",
    destacado: false
  }
];

/* ---------------------------------------------------------
   5. FUNCIONES
   Cada función hace una sola tarea y se puede probar sola.
   --------------------------------------------------------- */

// Convierte un número en texto con formato de dinero.
function formatearPrecio(valor) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(valor);
}

/* 3. ESTRUCTURAS DE CONTROL: if / else if / else */
function clasificarPrecio(precio) {
  if (typeof precio !== "number" || Number.isNaN(precio) || precio <= 0) {
    return "Valor no válido";
  } else if (precio < 200) {
    return "Económico";
  } else if (precio < 500) {
    return "Intermedio";
  } else {
    return "Premium";
  }
}

// Descuento según el subtotal del pedido (devuelve un porcentaje).
function obtenerPorcentajeDescuento(subtotal) {
  if (subtotal >= 1000) {
    return 15;
  } else if (subtotal >= 500) {
    return 10;
  } else if (subtotal >= 300) {
    return 5;
  } else {
    return 0;
  }
}

// Función con parámetro por defecto y función flecha.
const calcularDescuento = (subtotal, porcentaje = obtenerPorcentajeDescuento(subtotal)) =>
  subtotal * (porcentaje / 100);

/* ---------------------------------------------------------
   7. CLAUSURAS (CLOSURES)
   Una clausura es una función que "recuerda" las variables del
   lugar donde fue creada, aunque esa función exterior ya terminó.
   --------------------------------------------------------- */

// Ejemplo simple: un contador cuyo valor es privado.
function crearContador(inicio = 0) {
  let cuenta = inicio;            // nadie fuera puede tocar "cuenta"
  return function () {
    cuenta += 1;
    return cuenta;
  };
}

// Ejemplo real: el pedido de la tienda. "items" es privado y solo se
// modifica con los métodos que devolvemos.
function crearPedido() {
  const items = [];

  return {
    agregar(paquete) {
      items.push({ id: paquete.id, nombre: paquete.nombre, precio: paquete.precio });
    },
    quitar(indice) {
      items.splice(indice, 1);
    },
    vaciar() {
      items.length = 0;
    },
    obtener() {
      return [...items];          // copia, para no exponer el arreglo original
    },
    subtotal() {
      let suma = 0;
      for (const item of items) {
        suma += item.precio;
      }
      return suma;
    }
  };
}

const pedido = crearPedido();

/* ---------------------------------------------------------
   6. ALCANCE (SCOPE)
   Global  : visible en todo el archivo.
   Función : visible solo dentro de la función (var, let, const).
   Bloque  : let y const viven solo dentro de { }.
   --------------------------------------------------------- */
const variableGlobal = "Soy global: se ve en todo el archivo";

function demostrarAlcance(registrar) {
  var deFuncion = "var: vive en toda la función";

  if (true) {
    let deBloque = "let: vive solo dentro de este bloque";
    var deFuncionDentroDelIf = "var dentro de un if: se escapa del bloque";
    registrar("Dentro del bloque →", variableGlobal, "|", deFuncion, "|", deBloque);
  }

  registrar("Fuera del bloque →", deFuncionDentroDelIf);
  registrar("¿Existe deBloque fuera del if?", typeof deBloque);   // "undefined"
}

/* ---------------------------------------------------------
   LABORATORIO: reúne todas las prácticas y devuelve las líneas
   de salida. Se muestra en la consola y en la página.
   --------------------------------------------------------- */
function ejecutarLaboratorio(precioPrueba, repeticiones) {
  const lineas = [];

  // Muestra en la consola Y guarda el texto para la página.
  function registrar(...partes) {
    console.log(...partes);
    lineas.push(
      partes
        .map((p) => (typeof p === "object" && p !== null ? JSON.stringify(p) : String(p)))
        .join(" ")
    );
  }

  /* --- 1. Variables y tipos --- */
  registrar("=== 1. Variables y tipos de datos ===");
  const valores = [NOMBRE_TIENDA, ANIO_INICIO, tienePromocion, notaInterna, sinDefinir];
  for (const valor of valores) {
    registrar(String(valor), "→ typeof:", typeof valor);   // typeof null es "object" (error histórico del lenguaje)
  }

  /* --- 2. Arreglos y objetos --- */
  registrar("");
  registrar("=== 2. Arreglos y objetos ===");
  const nombres = paquetes.map((p) => p.nombre);
  registrar("Nombres:", nombres);

  const alAlcance = paquetes.filter((p) => p.precio <= precioPrueba);
  registrar(`Paquetes de hasta ${formatearPrecio(precioPrueba)}:`, alAlcance.map((p) => p.nombre));

  const destacado = paquetes.find((p) => p.destacado);
  registrar("Paquete destacado:", destacado.nombre);

  const copia = [...nombres];     // copia para no modificar el original
  copia.push("Paquete nuevo");
  const quitado = copia.pop();
  registrar("push/pop sobre una copia. Se quitó:", quitado, "| largo:", copia.length);

  const cliente = { nombre: "Ana", plan: "Landing page" };
  cliente.activo = true;          // agregar propiedad
  cliente.plan = "Landing page y logo";   // modificar propiedad
  registrar("Objeto cliente:", cliente, "| claves:", Object.keys(cliente));

  /* --- 3. Condicionales --- */
  registrar("");
  registrar("=== 3. Condicionales (if / else if / else) ===");
  registrar(`Precio ${precioPrueba} →`, clasificarPrecio(precioPrueba));
  for (const valor of [0, 99, 250, 800]) {
    registrar(`clasificarPrecio(${valor}) →`, clasificarPrecio(valor));
  }
  const pct = obtenerPorcentajeDescuento(precioPrueba);
  registrar(`Descuento para un subtotal de ${formatearPrecio(precioPrueba)}:`, pct + "%");

  /* --- 4. Bucles --- */
  registrar("");
  registrar("=== 4. Bucles ===");

  // for: se conoce de antemano cuántas vueltas son
  for (let i = 1; i <= repeticiones; i++) {
    registrar(`for → repetición ${i} de ${repeticiones}`);
  }

  // for...of: recorrer un arreglo
  let totalCatalogo = 0;
  for (const p of paquetes) {
    totalCatalogo += p.precio;
  }
  registrar("for...of → suma de todos los precios:", formatearPrecio(totalCatalogo));

  // while: se repite mientras la condición sea verdadera
  let indice = 0;
  let acumulado = 0;
  while (indice < paquetes.length && acumulado + paquetes[indice].precio <= precioPrueba) {
    acumulado += paquetes[indice].precio;
    indice++;
  }
  registrar(
    `while → con un presupuesto de ${formatearPrecio(precioPrueba)} caben ${indice} paquete(s) en orden`,
    `(total ${formatearPrecio(acumulado)})`
  );

  // do...while: se ejecuta al menos una vez
  let intento = 0;
  do {
    intento++;
    registrar(`do...while → intento ${intento}`);
  } while (intento < Math.min(repeticiones, 3));

  /* --- 5. Funciones --- */
  registrar("");
  registrar("=== 5. Funciones ===");
  registrar("formatearPrecio(1234.5) →", formatearPrecio(1234.5));
  registrar("calcularDescuento(600) →", formatearPrecio(calcularDescuento(600)), "(10%)");
  registrar("calcularDescuento(600, 20) →", formatearPrecio(calcularDescuento(600, 20)), "(porcentaje manual)");

  /* --- 6. Alcance --- */
  registrar("");
  registrar("=== 6. Alcance (scope) ===");
  demostrarAlcance(registrar);

  /* --- 7. Clausuras --- */
  registrar("");
  registrar("=== 7. Clausuras (closures) ===");
  const contadorA = crearContador();
  const contadorB = crearContador(10);
  registrar("contadorA:", contadorA(), contadorA(), contadorA());
  registrar("contadorB (inicia en 10):", contadorB(), contadorB());
  registrar("Cada contador tiene su propia variable privada. contadorA sigue en:", contadorA());

  return lineas;
}

/* ---------------------------------------------------------
   8. DOM: lo que el usuario ve y toca
   --------------------------------------------------------- */
const catalogoEl = document.getElementById("catalogo");
const listaPedidoEl = document.getElementById("listaPedido");
const subtotalEl = document.getElementById("subtotal");
const descuentoEl = document.getElementById("descuento");
const totalEl = document.getElementById("total");
const mensajeDescuentoEl = document.getElementById("mensajeDescuento");

// Genera las tarjetas de la tienda con un bucle for.
function mostrarCatalogo() {
  let html = "";

  for (let i = 0; i < paquetes.length; i++) {
    const p = paquetes[i];
    html += `
      <div class="col-sm-6 col-xl-4">
        <article class="paquete ${p.destacado ? "destacado" : ""}">
          <span class="etiqueta">${p.destacado ? "Más pedido" : clasificarPrecio(p.precio)}</span>
          <h3>${p.nombre}</h3>
          <p>${p.descripcion}</p>
          <p class="precio mb-2">${formatearPrecio(p.precio)}</p>
          <button class="btn btn-sd" type="button" data-id="${p.id}">Agregar al pedido</button>
        </article>
      </div>`;
  }

  catalogoEl.innerHTML = html;
}

// Dibuja el pedido y calcula totales.
function mostrarPedido() {
  const items = pedido.obtener();

  if (items.length === 0) {
    listaPedidoEl.innerHTML = '<li class="text-muted">Todavía no agregaste paquetes.</li>';
  } else {
    let html = "";
    items.forEach((item, indice) => {
      html += `
        <li>
          <span>${item.nombre}</span>
          <span>
            ${formatearPrecio(item.precio)}
            <button class="btn btn-sm btn-link p-0 ms-1" type="button"
                    data-quitar="${indice}" aria-label="Quitar ${item.nombre}">Quitar</button>
          </span>
        </li>`;
    });
    listaPedidoEl.innerHTML = html;
  }

  const subtotal = pedido.subtotal();
  const porcentaje = obtenerPorcentajeDescuento(subtotal);
  const descuento = calcularDescuento(subtotal, porcentaje);

  subtotalEl.textContent = formatearPrecio(subtotal);
  descuentoEl.textContent = "−" + formatearPrecio(descuento);
  totalEl.textContent = formatearPrecio(subtotal - descuento);

  // Mensaje que guía al usuario hacia el siguiente descuento.
  if (subtotal === 0) {
    mensajeDescuentoEl.textContent = "Desde $300 en adelante hay descuento.";
  } else if (porcentaje === 0) {
    mensajeDescuentoEl.textContent = `Te faltan ${formatearPrecio(300 - subtotal)} para el 5% de descuento.`;
  } else {
    mensajeDescuentoEl.textContent = `Descuento aplicado: ${porcentaje}%.`;
  }
}

// Eventos con delegación: un solo "click" para todos los botones del catálogo.
catalogoEl.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-id]");
  if (!boton) return;

  const id = Number(boton.dataset.id);
  const paquete = paquetes.find((p) => p.id === id);
  pedido.agregar(paquete);
  console.log("Agregado al pedido:", paquete.nombre);
  mostrarPedido();
});

listaPedidoEl.addEventListener("click", (evento) => {
  const boton = evento.target.closest("button[data-quitar]");
  if (!boton) return;

  pedido.quitar(Number(boton.dataset.quitar));
  mostrarPedido();
});

document.getElementById("btnVaciar").addEventListener("click", () => {
  pedido.vaciar();
  mostrarPedido();
});

// Laboratorio: botón "Ejecutar pruebas".
document.getElementById("btnProbar").addEventListener("click", () => {
  const precio = Number(document.getElementById("inputPrecio").value);
  let repeticiones = Number(document.getElementById("inputRepeticiones").value);

  // Validación: entre 1 y 10 repeticiones.
  if (!Number.isInteger(repeticiones) || repeticiones < 1) {
    repeticiones = 1;
  } else if (repeticiones > 10) {
    repeticiones = 10;
  }

  console.clear();
  const lineas = ejecutarLaboratorio(precio, repeticiones);
  document.getElementById("salidaLab").textContent = lineas.join("\n");
});

// Formulario de contacto con validación.
const formContacto = document.getElementById("formContacto");
const resultadoForm = document.getElementById("resultadoForm");

formContacto.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = formContacto.nombre.value.trim();
  const correo = formContacto.correo.value.trim();
  const servicio = formContacto.servicio.value;
  const correoValido = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo);

  formContacto.nombre.classList.toggle("is-invalid", nombre.length < 3);
  formContacto.correo.classList.toggle("is-invalid", !correoValido);
  formContacto.servicio.classList.toggle("is-invalid", servicio === "");

  if (nombre.length >= 3 && correoValido && servicio !== "") {
    resultadoForm.className = "mt-3 mb-0 ok";
    resultadoForm.textContent =
      `Gracias, ${nombre}. Registramos tu solicitud (demostración: no se envía a ningún servidor).`;
    console.log("Solicitud:", { nombre, correo, servicio, mensaje: formContacto.mensaje.value });
    formContacto.reset();
  } else {
    resultadoForm.className = "mt-3 mb-0 error";
    resultadoForm.textContent = "Revisa los campos marcados en rojo.";
  }
});

// Año del pie de página.
const anioEl = document.getElementById("anio");
const anioActual = new Date().getFullYear();
anioEl.textContent = anioActual;
anioEl.setAttribute("datetime", String(anioActual));

/* ---------------------------------------------------------
   INICIO: se ejecuta al cargar la página
   --------------------------------------------------------- */
mostrarCatalogo();
mostrarPedido();
console.log(`Bienvenido a ${NOMBRE_TIENDA}. Salida de las prácticas de JavaScript:`);
ejecutarLaboratorio(350, 3);
