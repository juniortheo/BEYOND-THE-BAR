import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App'

// The live preview is served from a single static folder, so it uses hash URLs.
const Router = import.meta.env.MODE === 'artifact' ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
