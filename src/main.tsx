import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        className: "",
        style: {
          background: "#363636",
          color: "#fff",
          borderRadius: "8px",
          padding: "12px 20px",
          fontSize: "14px",
        },
      }}
    />
  </StrictMode>,
)
