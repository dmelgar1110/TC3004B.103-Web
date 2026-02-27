import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ExpertApp } from './ExpertApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <ExpertApp />
  </StrictMode>,
)
