'use client'
import '../css/Header.css'
import React, { useState } from 'react';
import Link from 'next/link';

function Header() {
  const [mostrarPracticas, setMostrarPracticas] = useState(false);

  const activarPracticas = () => {
    setMostrarPracticas(!mostrarPracticas);
  }

  return (
    <div className="header_main">
      <ul className='header_ul'>
      <div className='div_home'>
          <li>
            <Link href={'..'}>Home</Link>
          </li>
        </div>
        <div className='div_practicas'>
          <li>
            <button onClick={activarPracticas}>☰</button>
            {mostrarPracticas && (
              <ul>
                <li>
                  <Link href={'/practicas/todo'}>Practica 0</Link>
                </li>
                <li>
                  <Link href={'/practicas/caracter'}>Practica 1</Link>
                </li>
                <li>
                  <Link href={'/practicas/palabra'}>Practica 2</Link>
                </li>
                <li>
                  <Link href={'/practicas/comentarios'}>Practica 3</Link>
                </li>
                <li>
                  <Link href={'/practicas/diccionario'}>Practica 4</Link>
                </li>
              </ul>
            )}
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Header;
