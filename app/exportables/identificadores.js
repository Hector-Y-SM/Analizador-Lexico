'use client'
/**
 * !Analizador de identificadores (automata q se hizo anteriormente) 
 * @param {*} contenido 
 * @returns 
 */
  export const analizar = (contenido) => {
    let esPalabraValida = false;

    const matriz = [ // Definir una matriz que se utilizará en el análisis léxico
      [1, 200, 200],
      [1, 1, 200]
    ];

    // Variables para el análisis léxico
    let c = contenido.split(''); // Dividir la entrada en caracteres individuales
    let i = 0; // Contador de posición en la entrada
    let estado = 0; // Estado inicial
    let caracter = 0; // Categoría del caracter actual

    // Expresiones regulares para verificar letras y números/signos
    const letras = new RegExp('[a-zA-Z]'); // Iniciar con letra
    const numeroSigno = new RegExp('[0-9]'); // Iniciar con número
    
    // Bucle que recorre la entrada
    while (i < contenido.length) {
      // Determinar la categoría del caracter actual
      if (letras.test(c[i])) {
        caracter = 0; // Caracter es una letra
      } else if (numeroSigno.test(c[i])) {
        caracter = 1; // Caracter es un número o signo
      } else {
        caracter = 2; // Otro tipo de caracter
      }

      // Actualizar el estado del analizador usando la matriz de transiciones
      estado = matriz[estado][caracter];

      // Verificar si se encontró una palabra inválida
      if (estado === 200) {
        return esPalabraValida = false; // Establecer esPalabraValida en falso
      }

      // Verificar si se encontró una palabra válida
      if (estado === 1) {
        return esPalabraValida = true; // Establecer esPalabraValida en verdadero
      }

      i++; // Incrementar la posición en la iteración para procesar el siguiente caracter
    }
  };