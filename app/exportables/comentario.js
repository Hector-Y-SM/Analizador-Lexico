/**
 * !Esta funcion lee el contenido de un archivo, muestra cualquier cosa menos los comentarios
 * 
 * @param {*} text 
 * @returns 
 */

export function comentarios(text) {
    const matriz = [
		[0, 0, 1, 4, 0, 4], //2 es ignorado
		[4, 4, 2, 3, 4, 4], //0 muestra
		[2, 2, 2, 2, 0, 2],
		[3, 3, 0, 3, 3, 3],
		[4, 4, 4, 4, 4, 4]
	]

    let newText = '';
    let estado = 0;
    let caracter = 0;
    
    for (let i = 0; i < text.length; i++) {
        const actualChar = text[i];
        // console.log("Iteracion: "+i);
        // console.log("Simbolo: ("+actualChar+")");
        if (estado === 0) {
          if (["0", "1", "\n"].includes(actualChar)) {
            caracter = 0;
            newText += actualChar; // Agregar caracteres no espaciales
            
          } else if (actualChar === "/") { caracter = 2; } 
            else {
              caracter = 0;
              newText += actualChar;                    
          }
        }
  
        if (estado === 1) {
          //console.log("estado 1");
          if (actualChar === "/") { caracter = 2; } 
          if (actualChar === "*") { caracter = 3; }
        }
  
        if (estado === 2) {
          // console.log("estado 2");
          if (actualChar === "\n") { caracter = 4; }
        }
  
        if (estado === 3) {
          // console.log("estado 3");
          if (actualChar + text[i + 1] === "*/") {
            caracter = 2;
            i++;
          }
        }
        estado = matriz[estado][caracter];
      }
      return newText;
};