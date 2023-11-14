import React from "react";
import '../css/UI.css';

function UI( {titulo, mostrarDocumento, longitud, contenidoArchivo, escribirExtra, limpiar, blob, analizar}){
    return(
        <div className = "div_main">
        <h1  className="div_titulo">{titulo}</h1>
        <input className = "main_input" 
                type = "file" 
                onChange = { mostrarDocumento }
                />
        <button className="main_btn"
                onClick={limpiar}
                > Limpiar </button>
        <button className="main_btn"
                onClick={blob}
        >Descargar</button>
        <button className="main_btn"
                onClick={analizar}
        >Analizar</button>

        <p className="main_p">coincidencias encontradas: {longitud}</p>
        <textarea className = "main_txtArea"
                  rows = { 15 }
                  value = { contenidoArchivo }
                  onChange = { escribirExtra }
        />
    </div>
    )
}

export default UI; 