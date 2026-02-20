import React from 'react'

import {bancos} from "./assets/bancos.js";

function TerceroIA() {
  return (
    <div>
      <h2>Lista de Bancos</h2>
      <ul>
        {bancos.map((banco) => (
          <li key={banco.id}>
            {banco.name} - {banco.country}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TerceroIA;