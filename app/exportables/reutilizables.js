//!Funciones que se pueden reutilizar para no repetirlas spammmmmmmmmmmm

/**
 * Funcion para seguir escribiendo el text area y que se actuzalice bien el contador
 * @param {*} e Evento para poder obtener el contendio
 * @param {*} setContenidoArchivo  Hook
 * @param {*} setLongitud Hook
 */
export function extra(e, setContenidoArchivo, setLongitud){
    const txtExtra = e.target.value;
    setContenidoArchivo(txtExtra);
    setLongitud(txtExtra.replace(/\s\w/gi, '').length);
}


/**
 * Funcion para limpiar tanto el textarea como el contador
 * @param {*} e Evento
 * @param {*} setContenidoArchivo Hook 
 * @param {*} setLongitud Hook
 */
export function limpiarTodo(e, setContenidoArchivo, setLongitud){
    e.preventDefault();
    setContenidoArchivo('');
    setLongitud(0);
}

/**
 * Funcion para generar un archivo de descarga con el contenido el textarea
 * @param {*} contenido Contenido que tiene en textarea 
 */
export function blob(contenido){
    const blob = new Blob([contenido], { type: "text/plain" }); //crear blob para poder generar el archivo
    const url = URL.createObjectURL(blob); // Crear una URL para el Blob
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "respuesta.txt";

    a.click();
    URL.revokeObjectURL(url);
}