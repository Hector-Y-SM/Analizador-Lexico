'use client';
import React, { useState } from "react";
import { extra, limpiarTodo, blob } from "../../exportables/reutilizables.js";
import { analizadorArea } from "@/app/exportables/analizarTxtArea.js";
import UI from "@/app/components/UI";

//!Codigo que analiza el interior de un archivo txt, solo muestra los valores numericos, los comentarios los ignora, no puede recibir cosas diferebtes a 0 y 1
function Comentario() {
    const [contenidoArchivo, setContenidoArchivo] = useState(''); // Almacenar el contenido del archivo en un hook (si hay un archivo)
    const [longitud, setLongitud] = useState(0);

    const matriz = [
		[0, 0, 1, 4, 0, 4],
		[4, 4, 2, 3, 4, 4],
		[2, 2, 2, 2, 0, 2],
		[3, 3, 0, 3, 3, 3],
		[4, 4, 4, 4, 4, 4]
	]

    function automata(text) {
        let newText = '';
        let estado = 0;
        let caracter = 0;
        
        for (let i = 0; i < text.length; i++) {
            const actualChar = text[i];
            // console.log("Iteracion: "+i);
            // console.log("Simbolo: ("+actualChar+")");
            if (estado === 0) {
              if (["0", "1", "\n", " "].includes(actualChar)) {
                caracter = 0;
                newText += actualChar; // Agregar caracteres no espaciales
              } else if (actualChar === "/") {
                caracter = 2;
              } else {
                caracter = 4; // Carácter inválido
                console.log("Error: Carácter inválido (" + actualChar + ")");
                return "Se encontró un simbolo desconocido ("+actualChar+")";        
                
              }
            }
      
            if (estado === 1) {
              console.log("estado 1");
              if (actualChar === "/") {
                caracter = 2;
              }
      
              if (actualChar === "*") {
                caracter = 3;
              }
            }
      
            if (estado === 2) {
              console.log("estado 2");
              if (actualChar === "\n") {
                caracter = 4;
              }
            }
      
            if (estado === 3) {
              console.log("estado 3");
              if (actualChar + text[i + 1] === "*/") {
                caracter = 2;
                i++;
              }
            }
      
            estado = matriz[estado][caracter];
      
            if (estado === 4) {
              console.log("estado 4");
              return "Se encontró un error en el archivo, corríjalo.";
            }
          }
      
          return newText;
    };
    

    function mostrarDocumento(e){
        const archivo = e.target.files[0];
        const lector = new FileReader();

        lector.onload = (e) => {
            const contenido = e.target.result;
            const processedText = automata(contenido);

            //TODO: Actualizar esto, el auomata debe separar las palabras por comas, y eliminar los espacios
            setContenidoArchivo(processedText);
            setLongitud(processedText.length); 
        };

        archivo ? lector.readAsText(archivo) : '';
    };

    function descarga(){blob(contenidoArchivo)}
    function escribirExtra(e){ extra(e, setContenidoArchivo, setLongitud) }
    function limpiar(e){ limpiarTodo(e, setContenidoArchivo, setLongitud) }
    function analizarTextArea() { analizadorArea(contenidoArchivo, setContenidoArchivo, setLongitud) }

    return (
        <>
            <UI titulo = {'Mostrar contenido del archivo a execpcion de los comentarios ("//", "/**/")'}
                mostrarDocumento = {mostrarDocumento}
                longitud = {longitud}
                contenidoArchivo = {contenidoArchivo}
                escribirExtra = {escribirExtra}
                limpiar = {limpiar} 
                blob = {descarga}
                analizar = {analizarTextArea}/>
        </>
    );
}

export default Comentario;