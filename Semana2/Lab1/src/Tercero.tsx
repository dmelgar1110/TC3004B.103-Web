import React from 'react'
import { bancos } from './assets/bancos.js'

const Tercero = () => {
  return (
    <div>
        <h1>Lista de Bancos</h1>
        <ul>
          {bancos.map((b) => (
            <li key={b.id}>{b.id}. {b.name} - {b.country}</li>
          ))}
        </ul>
    </div>
  )
}

export default Tercero