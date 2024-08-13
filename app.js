const desplazamiento = 6;
const numeroMaximoCaracteres = 2000;
let timeOuts = {};

//Se utiliza el cifrado con el algoritmo de cesar
function cifradoCesar(texto) {
  let cifrado = "";

  for (let i = 0; i < texto.length; i++) {
    let posicion = texto.charCodeAt(i);
    if (posicion < 123 && posicion > 96) {
      cifrado += String.fromCharCode(
        ((posicion + desplazamiento - 97) % 26) + 97
      );
    } else {
      cifrado += texto[i];
    }
  }

  return cifrado;
}

function descifradoCesar(texto) {
  let descifrado = "";

  for (let i = 0; i < texto.length; i++) {
    let posicion = texto.charCodeAt(i);
    if (posicion < 123 && posicion > 96) {
      descifrado += String.fromCharCode(
        122 - ((122 - (posicion - desplazamiento)) % 26)
      );
    } else {
      descifrado += texto[i];
    }
  }

  return descifrado;
}

function crearElementoResultado(texto, elementoPadre) {
  let resultadoElemento = document.createElement("p");

  while (elementoPadre.firstChild) {
    elementoPadre.removeChild(elementoPadre.firstChild);
  }

  resultadoElemento.classList.add("resultado");

  resultadoElemento.innerText = texto;

  elementoPadre.appendChild(resultadoElemento);
}


// devulve false en caso de que se supere la cantidad maxima de caracteres
function validarCantidadCaracteres(texto) {
  return !(contarCaracteres(texto) > numeroMaximoCaracteres);
}

function cifrarTexto() {
  let textoCifrar = document.querySelector("#texto-cifrar").value;
  if(!validarCantidadCaracteres(textoCifrar)){
    animacionMensaje("contenedor__mensaje__error", 5000);
    return;
  }
  let resultadoElementoContenedor = document.querySelector(
    ".encriptador__contenedor__encriptado"
  );
  let cifrarTexto = cifradoCesar(textoCifrar);
  let botonCopiar;

  crearElementoResultado(cifrarTexto, resultadoElementoContenedor);

  botonCopiar = crearBotonCopiar();

  resultadoElementoContenedor.appendChild(botonCopiar);
}

function descifrarTexto() {
  let textoDescifrar = document.querySelector("#texto-cifrar").value;
  validarCantidadCaracteres(textoDescifrar);
  let resultadoElementoContenedor = document.querySelector(
    ".encriptador__contenedor__encriptado"
  );
  let descifrarTexto = descifradoCesar(textoDescifrar);
  let botonCopiar;

  crearElementoResultado(descifrarTexto, resultadoElementoContenedor);

  botonCopiar = crearBotonCopiar();

  resultadoElementoContenedor.appendChild(botonCopiar);
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

  contador.innerText = "número de caracteres: 0";

  if (!imagenDecorativa) {
    textoDescifradoContenedor.innerHTML = `<img
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
  }
}

function copiar(texto) {
  {
    return navigator.clipboard.writeText(texto);
  }
}

function animacionMensaje(clase = "", tiempo = 0) {
  let mensaje = document.querySelector(`.${clase}`);
  let timeOut;
  mensaje.classList.toggle("mensaje__borrado");

  timeOut = setTimeout(() => {
    mensaje.classList.toggle("mensaje__borrado");
  }, tiempo);

  timeOuts[clase] = timeOut;

}

function cerrarMensaje(evento){
  let elemento = document.querySelector(`.${evento.target.className}`).parentNode
  let claseElementoPadre = elemento.className.split(" ")[0];
  elemento.classList.toggle("mensaje__borrado");
  
  if(Object.keys(timeOuts).includes(elemento.className.split(" ")[0])){
    clearTimeout(timeOuts[claseElementoPadre]);
  }
}

async function manejarCopiado() {
  let textoCopiar = document.querySelector(".resultado").innerText;

  animacionMensaje("mensaje__copiado");

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
  )}`;

  if(!validarCantidadCaracteres(texto)){
    contador.classList.add("contenedor__introducir__lector__caracteres_atencion")
  } else {
    contador.classList.remove("contenedor__introducir__lector__caracteres_atencion")
  }
}
