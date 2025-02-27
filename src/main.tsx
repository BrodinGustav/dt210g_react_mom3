import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom' //Importerar router med RouterProvider
import router from '../routing.tsx'               //Hämtar routing från routing.tsx
import { AuthProvider } from './context/AuthContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
     <RouterProvider router={router} /> {/* Tillhandahåller routerkonfiguration */}
     </AuthProvider>
  </StrictMode>,
)
