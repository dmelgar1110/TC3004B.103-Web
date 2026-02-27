import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FormIA } from './components/FormIA.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1 style={{ textAlign: "center" }}>Formulario IA</h1>
    <FormIA />
  </StrictMode>,
)
