import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Usuarios from './Usuarios.jsx'
import Empleados from './Empleados.jsx'
import { EmpleadosIA } from './EmpleadosIA.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>Crud YO</h1>
    <Empleados />
    <h1>Crud IA</h1>
    <EmpleadosIA />
  </StrictMode>,
)
