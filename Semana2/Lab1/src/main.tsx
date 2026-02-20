import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Hola from './Hola.tsx'
import Segundo from './Segundo.tsx'
import Tercero from './Tercero.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Hola />
    <Segundo />
    <Tercero />
  </StrictMode>,
)
