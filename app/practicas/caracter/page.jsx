'use client'
//! Este archivo muestra el contenido del archivo caracter por caracter separados por una coma. (solo letras)
import React, {useState} from "react";
import { blob, extra, limpiarTodo } from "../../exportables/reutilizables.js";
import { analizadorArea } from "@/app/exportables/analizarTxtArea.js";
import UI from "@/app/components/UI";

function Caracter(){
    const [contenidoArchivo, setContenidoArchivo] = useState(''); //alamcenar el contenido del archivo en un hook (si es q hay archivo)
    const [longitud, setLongitud] = useState(0);

    function mostrarDocumento(e){
        const archivo = e.target.files[0];
        const lector = new FileReader();

        lector.onload = (e) => {
            const contenido = e.target.result;
            const validado = contenido.split('').filter((condicion) => /[A-Za-z]/.test(condicion)) //convertir a rray el texto y filtrarlo
            const cantidad = validado ? validado.length : 0;
            setContenidoArchivo(validado.join(', ')); // Mostrar solo el texto validadp en el textarea
            setLongitud(cantidad) // Mostrar la cantidad de caracteres
        };

        archivo ? lector.readAsText(archivo) : '';
    };

    function descarga(){blob(contenidoArchivo)}
    function escribirExtra(e){ extra(e, setContenidoArchivo, setLongitud) }
    function limpiar(e){limpiarTodo(e, setContenidoArchivo, setLongitud)}
    function analizarTextArea() { analizadorArea(contenidoArchivo, setContenidoArchivo, setLongitud) }

  return(
    <>
      <UI titulo={'Seperar contenido del archivo por caracteres'}
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

export default Caracter;