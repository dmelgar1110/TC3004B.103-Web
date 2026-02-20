import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Hola from './Hola.tsx'
import Segundo from './Segundo.tsx'
import Tercero from './Tercero.tsx'
import HolaMundoIA from './HolaMundoIA.tsx'
import SegundoIA from './SegundoIA.tsx'
import TerceroIA from './TerceroIA.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Hola />
    <Segundo />
    <Tercero />
    <HolaMundoIA />
    <SegundoIA />
    <TerceroIA />
  </StrictMode>,
)
