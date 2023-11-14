/*
  !Diccionario que contiene las palabras reservadas que se usan en C, tambien numeros, operadores logicos
  !relacionales, matematicos y de agrupacion
*/
export const diccionarioC = [];

const pr = [
  'main', 'auto', 'break', 'case', 'char', 'const', 'continue', 'default',
  'do', 'double', 'else', 'enum', 'extern', 'float', 'for', 'goto', 'if',
  'int', 'long', 'register', 'return', 'short', 'signed', 'sizeof', 'static',
  'struct', 'switch', 'typedef', 'union', 'unsigned', 'void', 'volatile',
  'while', 'include', 'printf', 'scanf', 'fprintf', 'fscanf','sprintf', 'fseek',
  'fopen', 'fclose', 'getch' 
];

const ol = ['!','&','|']; // Operadores lógicos
const or = ['<','>','='];// Operadores relacionales
const om = ['+','-','*','/','%']; // Operadores matemáticos
const oa = ['(',')','[',']','{','}']; // Operadores de agrupación
const sc = [';',',','.',':']; //semicolons 

let idConteo = 0;
for (const token of pr) {
  const objeto = {
    id: idConteo.toString(),
    lexema: token,
    categoria: 'PR'
  };
  diccionarioC.push(objeto);
  idConteo++;
}

for (const token of ol) {
  const objeto = {
    id: idConteo.toString(),
    lexema: token,
    categoria: 'OL'
  };
  diccionarioC.push(objeto);
  idConteo++;
}

for (const token of or) {
  const objeto = {
    id: idConteo.toString(),
    lexema: token,
    categoria: 'OR'
  };
  diccionarioC.push(objeto);
  idConteo++;
}

for (const token of om) {
  const objeto = {
    id: idConteo.toString(),
    lexema: token,
    categoria: 'OM'
  };
  diccionarioC.push(objeto);
  idConteo++;
}

for (const token of oa) {
  const objeto = {
    id: idConteo.toString(),
    lexema: token,
    categoria: 'OA'
  };
  diccionarioC.push(objeto);
  idConteo++;
}

for (const token of sc) {
  const objeto = {
    id: idConteo.toString(),
    lexema: token,
    categoria: 'SC'
  };
  diccionarioC.push(objeto);
  idConteo++;
}

//console.log(diccionarioC);