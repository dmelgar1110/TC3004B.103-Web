import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SimpleForm } from './components/SimpleForm.jsx'
import { Focus } from './components/Focus.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Focus />
  </StrictMode>,
)
