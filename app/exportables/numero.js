/**
 *  !Funcion para ver si son numeros, (complemento del diccionario)
 * @param {*} p 
 * @returns 
 */

export const numero = (p) => {
    const num = Number(p);
    return !isNaN(num);
}