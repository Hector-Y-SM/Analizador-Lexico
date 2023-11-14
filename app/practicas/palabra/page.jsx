'use client'
//! Este archivo muestra el contenido del archivo palabra por palabra separados por una coma. (solo letras y numeros)
import React, {useState} from "react";
import { extra, limpiarTodo, blob } from "../../exportables/reutilizables.js";
import { analizadorArea } from "@/app/exportables/analizarTxtArea.js";
import UI from "@/app/components/UI";

function Palabra(){
    const [contenidoArchivo, setContenidoArchivo] = useState('')
    const [longitud, setLongitud] = useState(0);  

    function mostrarDocumento(e) {
        const archivo = e.target.files[0];
        const lector = new FileReader();
    
        lector.onload = (e) => {
            const contenido = e.target.result;
            const palabras = contenido.match(/[A-Za-z]+|[0-9]+/g); // extraer palabras del contenido
            const cantidad = palabras ? palabras.length : 0;
    
            const contenidoSeparado = palabras ? palabras.join(', ') : ''; // unir las palabras con comas
            setContenidoArchivo(contenidoSeparado); // mostrar las palabras separadas por comas en el textarea
            setLongitud(cantidad); 
        };
    
        archivo ? lector.readAsText(archivo) : ''; //operador semantico
    }

    function descarga(){ blob(contenidoArchivo) }
    function escribirExtra(e){ extra(e, setContenidoArchivo, setLongitud) }
    function limpiar(e){ limpiarTodo(e, setContenidoArchivo, setLongitud) }
    function analizarTextArea() { analizadorArea(contenidoArchivo, setContenidoArchivo, setLongitud) }

  return(
    <>
      <UI titulo = {'Seperar el contenido del archivo por palabras y numeros'}
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

export default Palabra;