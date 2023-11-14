'use client'
import UI from "@/app/components/UI";
import { extra, limpiarTodo, blob } from "../../exportables/reutilizables.js";
import { analizadorArea } from "@/app/exportables/analizarTxtArea.js";
import React, {useState} from "react";

//!Este codigo muestra el contenido de un archivo txt en un textarea
function Todo(){
    const [contenidoArchivo, setContenidoArchivo] = useState('')
    const [longitud, setLongitud] = useState(0);  

    function mostrarDocumento(e) {
        const archivo = e.target.files[0];
        const lector = new FileReader();
    
        lector.onload = (e) => {
            const contenido = e.target.result;
            const cantidad = contenido ? contenido.length : 0;
            setContenidoArchivo(contenido); // mostrar las palabras separadas por comas en el textarea
            setLongitud(cantidad); 
        };
        archivo ? lector.readAsText(archivo) : ''; //operador semantico
    }
    function descarga(){blob(contenidoArchivo)}
    function escribirExtra(e){ extra(e, setContenidoArchivo, setLongitud) }
    function limpiar(e){ limpiarTodo(e, setContenidoArchivo, setLongitud) }
    function analizarTextArea() { analizadorArea(contenidoArchivo, setContenidoArchivo, setLongitud) }
    
    return(
        <>
            <UI titulo = {'Mostrar contenido de archivos'}
                mostrarDocumento = {mostrarDocumento}
                longitud = {longitud}
                contenidoArchivo = {contenidoArchivo}
                escribirExtra = {escribirExtra}
                limpiar = {limpiar} 
                blob = {descarga}
                analizar = {analizarTextArea}/>
        </>
    )
}

export default Todo;