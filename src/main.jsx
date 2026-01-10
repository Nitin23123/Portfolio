import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

/**
 * Application Entry Point
 * 
 * Mounts the React application to the DOM.
 * Wrapped in StrictMode for additional checks during development.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
