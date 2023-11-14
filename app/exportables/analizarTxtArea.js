import { comentarios } from "./comentario.js";
import { analizar } from "./identificadores.js";
import { numero } from "./numero.js";
import { diccionarioC } from "./diccionarioC.js";
import { blob } from "./reutilizables.js";

/**
 * !Funcion para poder analizar el contenido del textarea, sin necesidad de ingresarle un archivo 
 * @param {*} valor Aqui va el contenido del text area
 * @param {*} setContenidoArchivo Hook para actualizar el contenido del archivo
 * @param {*} setLongitud  Hook para actualizar la longitud
 */

export const analizadorArea = (valor, setContenidoArchivo, setLongitud) => {
    const diccionarioTokens = {}; //lo mismo que el del diccionario
    diccionarioC.forEach(item => { diccionarioTokens[item.lexema] = item.categoria });
    
    const contenido = valor; //Asi se saca el valor del textarea
    const contenidoSinComentarios = comentarios(contenido);
    const palabras = contenidoSinComentarios.match(/"('\\"|.)*?"|[(){}\[\]]|\b\w+\b|\S/g);
    const resultado = [];
    let numTotal = 0, idTotal = 0, noId = 0, pr = 0, ol = 0, or = 0, om = 0, oa = 0, sc = 0, cad = 0;

    if(valor){
      for (const palabra of palabras) {
        const categoria = diccionarioTokens[palabra];
        if(palabra.match(/"('\\"|.)*?"/g)){
          resultado.push(palabra + '   Cadena')
          cad++;
        }
        else if (categoria) {
          resultado.push(palabra + '    ' + categoria);
            if(categoria === 'PR'){ pr++; }
            if(categoria === 'OL'){ ol++; }
            if(categoria === 'OR'){ or++; }
            if(categoria === 'OM'){ om++; }
            if(categoria === 'OA'){ oa++; }
            if(categoria === 'SC'){ sc++; }
        } else if (analizar(palabra)) {
            resultado.push(palabra + '    ID');
            idTotal++;
        } else if (numero(palabra)) {
            resultado.push(palabra + '    NUM');
            numTotal++;
        } else {
            resultado.push(palabra + '    IDNV--------------');
            noId++;
        }
      }
    } else { setContenidoArchivo('No hay nada que analizar') }
  
    const contenidoAnalizado = resultado.join('\n');
    setContenidoArchivo(contenidoAnalizado);
    setLongitud(
    <>{resultado.length}      <br/>
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

    // blob(valor)
}