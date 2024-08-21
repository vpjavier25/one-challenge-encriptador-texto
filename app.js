const codigoEncriptar = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};
const codigoDesencriptar = {
  ai: "a",
  enter: "e",
  imes: "i",
  ober: "o",
  ufat: "u",
};
let mensaje = [];

//se excluyeron los signos de puntuación
const signosPuntuacionsCharCode = [
  46, 44, 33, 63, 58, 59, 34, 39, 40, 41, 45, 8212, 8230, 171, 187, 91, 93, 123,
  125,
];
const numeroMaximoCaracteres = 2000;
let timeOuts = {};
let resultadoTextoPredeterminado = `<img
                class="encriptador__contenedor__encriptado__texto__img"
                src="./assets/Muñeco.png"
                alt="figura"
            />
            <p class="encriptador__contenedor__encriptado__texto__msg1">
                Ningún mensaje fue encontrado
            </p>
            <p class="encriptador__contenedor__encriptado__texto__msg2">
                Ingresa el texto que desees encriptar o desencriptar.
            </p>`;

//Se utiliza el cifrado con el algoritmo de cesar
function cifrado(texto) {
  let cifrado = "";
  let error = false;

  for (let i = 0; i < texto.length; i++) {
    let charCode = texto.charCodeAt(i);
    if (
      (charCode < 123 && charCode > 96) ||
      (charCode < 58 && charCode > 47) ||
      charCode === 32 ||
      signosPuntuacionsCharCode.includes(charCode)
    ) {
      cifrado = codigoEncriptar[texto[i]]
        ? cifrado + codigoEncriptar[texto[i]]
        : cifrado + texto[i];
    } else {
      error = true;
      break;
    }
  }

  return [error, cifrado];
}

function descifrado(texto) {
  let descifrado = "";
  let error = false;
  let posicion = 0;

  while (posicion < texto.length) {
    let charCode = texto.charCodeAt(posicion);
    if (
      (charCode < 123 && charCode > 96) ||
      (charCode < 58 && charCode > 47) ||
      charCode === 32 ||
      signosPuntuacionsCharCode.includes(charCode)
    ) {
      switch (texto[posicion]) {
        case "a":
          mensaje.push(texto[posicion] + texto[posicion + 1]);
          posicion += 2;
          break;
        case "e":
          mensaje.push(
            texto[posicion] +
              texto[posicion + 1] +
              texto[posicion + 2] +
              texto[posicion + 3] +
              texto[posicion + 4]
          );
          posicion += 5;
          break;
        case "i":
          mensaje.push(
            texto[posicion] +
              texto[posicion + 1] +
              texto[posicion + 2] +
              texto[posicion + 3]
          );
          posicion += 4;
          break;
        case "o":
          mensaje.push(
            texto[posicion] +
              texto[posicion + 1] +
              texto[posicion + 2] +
              texto[posicion + 3]
          );
          posicion += 4;
          break;
        case "u":
          mensaje.push(
            texto[posicion] +
              texto[posicion + 1] +
              texto[posicion + 2] +
              texto[posicion + 3]
          );
          posicion += 4;
          break;
        default:
          mensaje.push(texto[posicion]);
          posicion++;
      }
      console.log(posicion);
      console.log(mensaje);
    } else {
      error = true;
      break;
    }
  }

  for (let i = 0; i < mensaje.length; i++) {
    descifrado = codigoDesencriptar[mensaje[i]]
      ? descifrado + codigoDesencriptar[mensaje[i]]
      : descifrado + mensaje[i];
  }

  mensaje = [];

  return [error, descifrado];
}

function crearElementoResultado(texto, elementoPadre) {
  let resultadoElemento = document.createElement("textarea");

  resultadoElemento.disabled = true;

  while (elementoPadre.firstChild) {
    elementoPadre.removeChild(elementoPadre.firstChild);
  }

  resultadoElemento.classList.add("resultado");

  resultadoElemento.value = texto;

  elementoPadre.appendChild(resultadoElemento);
}

// devulve false en caso de que se supere la cantidad maxima de caracteres
function cantidadPermitidaCaracteres(texto) {
  return !(contarCaracteres(texto) > numeroMaximoCaracteres);
}

//validar caracteres validos a encriptar

function cifrarTexto() {
  let textoCifrar = document.querySelector("#texto-cifrar").value;

  if (textoCifrar) {
    if (!cantidadPermitidaCaracteres(textoCifrar)) {
      animacionMensaje("contenedor__mensaje__error__numero__caracteres", 5000);
      return;
    }

    let resultadoElementoContenedor = document.querySelector(
      ".encriptador__contenedor__encriptado"
    );
    let [error, textoCifrado] = cifrado(textoCifrar);

    if (error) {
      animacionMensaje("contenedor__mensaje__error__caracteres__validos", 5000);
      return;
    }

    let botonCopiar;

    crearElementoResultado(textoCifrado, resultadoElementoContenedor);

    botonCopiar = crearBotonCopiar();

    resultadoElementoContenedor.appendChild(botonCopiar);
  }
}

function descifrarTexto() {
  let textoDescifrar = document.querySelector("#texto-cifrar").value;

  if (textoDescifrar) {
    if (!cantidadPermitidaCaracteres(textoDescifrar)) {
      animacionMensaje("contenedor__mensaje__error", 5000);
      return;
    }
    let resultadoElementoContenedor = document.querySelector(
      ".encriptador__contenedor__encriptado"
    );

    let [error, descifrarTexto] = descifrado(textoDescifrar);

    if (error) {
      if (error) {
        animacionMensaje(
          "contenedor__mensaje__error__caracteres__validos",
          5000
        );
        return;
      }
    }

    let botonCopiar;

    crearElementoResultado(descifrarTexto, resultadoElementoContenedor);

    botonCopiar = crearBotonCopiar();

    resultadoElementoContenedor.appendChild(botonCopiar);
  }
}

function restablecer() {
  let textoCifrar = document.querySelector("#texto-cifrar");
  let contador = document.querySelector(
    ".contenedor__introducir__lector__caracteres"
  );
  let textoDescifradoContenedor = document.querySelector(
    ".encriptador__contenedor__encriptado"
  );

  let imagenDecorativa = document.querySelector(
    ".encriptador__contenedor__encriptado__texto__img"
  );

  textoCifrar.value = "";

  contador.innerText = "número de caracteres: 0 / 2000";

  contador.classList.remove(
    "contenedor__introducir__lector__caracteres_atencion"
  );

  if (!imagenDecorativa) {
    textoDescifradoContenedor.innerHTML = resultadoTextoPredeterminado;
  }
}

function copiar(texto) {
  {
    return navigator.clipboard.writeText(texto);
  }
}

function animacionMensaje(clase = "", tiempo = 0) {
  let mensaje = document.querySelector(`.${clase}`);
  let mensajeBorradoClase = mensaje.className.split(" ")[1];
  let timeOut;

  if (timeOuts[clase]) {
    clearTimeout(timeOuts[clase]);
    timeOuts[clase] = "";
  }

  mensaje.classList.remove("mensaje__borrado");

  timeOut = setTimeout(() => {
    mensaje.classList.add("mensaje__borrado");
  }, tiempo);

  timeOuts[clase] = timeOut;
}

function cerrarMensaje(evento) {
  let elemento = document.querySelector(
    `.${evento.target.className}`
  ).parentNode;
  let claseElementoPadre = elemento.className.split(" ")[0];
  elemento.classList.add("mensaje__borrado");

  if (Object.keys(timeOuts).includes(claseElementoPadre)) {
    clearTimeout(timeOuts[claseElementoPadre]);
    timeOuts[claseElementoPadre] = "";
  }
}

async function manejarCopiado() {
  let textoCopiar = document.querySelector(".resultado").value;

  animacionMensaje("contenedor__mensaje__copiado", 2000);

  try {
    await copiar(textoCopiar);
  } catch (err) {
    console.error("Error al copiar: ", err);
  }
}

function crearBotonCopiar() {
  let botonCopiar = document.createElement("button");

  botonCopiar.setAttribute("type", "button");
  botonCopiar.classList.add("encriptador__contenedor__encriptado_btn__copiar");
  botonCopiar.addEventListener("click", manejarCopiado);
  botonCopiar.innerText = "Copiar";

  return botonCopiar;
}

function contarCaracteres(texto = "") {
  return texto.length;
}

function letorDeCaracteres() {
  let texto = document.querySelector("#texto-cifrar").value;

  let contador = document.querySelector(
    ".contenedor__introducir__lector__caracteres"
  );
  let formatearNumero = Intl.NumberFormat("es-Es");

  let numeroCaracteres = contarCaracteres(texto);

  contador.innerText = `número de caracteres: ${formatearNumero.format(
    numeroCaracteres
  )} / 2000`;

  if (!cantidadPermitidaCaracteres(texto)) {
    contador.classList.add(
      "contenedor__introducir__lector__caracteres_atencion"
    );
  } else {
    contador.classList.remove(
      "contenedor__introducir__lector__caracteres_atencion"
    );
  }
}
