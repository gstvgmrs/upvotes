import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/css/app.css';
import '@/assets/css/button.css';
import '@/assets/css/upvote-list.css';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
