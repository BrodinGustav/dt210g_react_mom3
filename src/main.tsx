import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom' //Importerar router med RouterProvider
import router from '../routing.tsx'               //Hämtar routing från routing.tsx

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <RouterProvider router={router} /> {/* Tillhandahåller routerkonfiguration */}
  </StrictMode>,
)
