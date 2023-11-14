'use client'
import UI from "@/app/components/UI";
import { extra, limpiarTodo, blob } from "../../exportables/reutilizables.js";
import { diccionarioC } from "../../exportables/diccionarioC.js";
import { analizar } from "@/app/exportables/identificadores.js";
import { comentarios } from "@/app/exportables/comentario.js";
import { numero } from "@/app/exportables/numero.js";
import { analizadorArea } from "@/app/exportables/analizarTxtArea.js";
import React, {useState} from "react";

/**
 * !Este codigo analiza un archivo y muestra si el contednido del archivo es una palabra reservada o un identificador
 * @returns 
 */

const diccionarioTokens = {}; // Crear un objeto diccionario a partir del array diccionarioC
diccionarioC.forEach(item => {
  diccionarioTokens[item.lexema] = item.categoria;
});

function Diccionario(){
    const [contenidoArchivo, setContenidoArchivo] = useState('');
    const [longitud, setLongitud] = useState(0);

    function mostrarDocumento(e) {
      const archivo = e.target.files[0];
      const lector = new FileReader();
  
      lector.onload = (e) => {
          const contenido = e.target.result;
          const contenidoSinComentarios = comentarios(contenido); ///&&|\|\||===|!==|<=|>=|==|!=|\*\*|\?|[(){}\[\]]|\b\w+\b|\S/g
          const palabras = contenidoSinComentarios.match(/[(){}\[\]]|\b\w+\b|\S/g); // extraer los operadores de agrupacion por separ
          const palabrasReservadas = []; //guardar las palabras reservadas encontradas  
          
          let numTotal = 0, idTotal = 0, noId = 0, pr = 0, ol = 0, or = 0, om = 0, oa = 0, sc = 0, cad = 0;
          for(const palabra of palabras) {
            const categoria = diccionarioTokens[palabra];
            if(palabra.match(/"('\\"|.)*?"/g)){
                resultado.push(palabra + '   Cadena')
                cad++;
              } else if (categoria) { 
                  palabrasReservadas.push(palabra + '    '+categoria);
                  if(categoria === 'PR'){ pr++; }
                  if(categoria === 'OL'){ ol++; }
                  if(categoria === 'OR'){ or++; }
                  if(categoria === 'OM'){ om++; }
                  if(categoria === 'OA'){ oa++; }
                  if(categoria === 'SC'){ sc++; }
              } else if(analizar(palabra)){
                  palabrasReservadas.push(palabra + '    ID')
                  idTotal++;
              } else if(numero(palabra)){
                  palabrasReservadas.push(palabra + '    NUM')
                  numTotal++;
              } else if(palabra.match()){
                  palabrasReservadas.push(palabra+'cadena')
              } else {
                  palabrasReservadas.push(palabra + '    IDNV')
                  noId++;
              } 
          }
        
      const cantidad = palabrasReservadas.length;
      const contenidoSeparado = palabrasReservadas.join('\n');

      setContenidoArchivo(contenidoSeparado); // mostrar las palabras reservadas separadas por comas en el textarea
      setLongitud(
        <>{cantidad}      <br/>
          <h1>ID: {idTotal}</h1>  
          <h1>NUM: {numTotal}</h1>
          <h1>PR: {pr}</h1>       
          <h1>OL: {ol}</h1>     
          <h1>OR: {or}</h1>       
          <h1>OM: {om}</h1>   
          <h1>OA: {oa}</h1>       
          <h1>SC: {sc}</h1>
          <h1>CADENAS: {cad}</h1>
          <h1>NID: {noId}</h1>
        </>);
  };

      archivo ? lector.readAsText(archivo) : ''; //operador semantico
  }
    
  function descarga(){blob(contenidoArchivo)} 
  function escribirExtra(e){ extra(e, setContenidoArchivo, setLongitud) }
  function limpiar(e){ limpiarTodo(e, setContenidoArchivo, setLongitud) }
  function analizarTextArea() { analizadorArea(contenidoArchivo, setContenidoArchivo, setLongitud) }

  return(
      <>
        <UI titulo = {'Mostrar el tipo de dato que contiene el archivo NUM, ID, PR, OL, OR, OM, OA'}
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
export default Diccionario;