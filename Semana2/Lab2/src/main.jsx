import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CustomHook } from './components/CustomHook.jsx'
import { ZeldaCardsIA } from './components/ZeldaCardsIA.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomHook />
    <h1>IA </h1>
    <ZeldaCardsIA />
  </StrictMode>,
)
