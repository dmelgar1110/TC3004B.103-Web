import React from 'react'

function SegundoIA() {

  const nombre = "Daniel";
  const edad = 22;

  const saludar = () => {
    return `Hola ${nombre}, tienes ${edad} años`;
  };

  return (
    <div>
      <h2>Variables y Funciones</h2>
      <p>{saludar()}</p>
    </div>
  );
}

export default SegundoIA;