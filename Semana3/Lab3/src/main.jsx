import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FormIA } from './components/FormIA.jsx'
import { Form } from './components/Form.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <h1>Formulario Yo</h1>
    <Form />
    <h1 style={{ textAlign: "center" }}>Formulario IA</h1>
    <FormIA />
  </StrictMode>,
)
