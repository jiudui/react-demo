import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router';
import './index.css'
import App from './App.tsx'
import './components/Message/index'
import router from '../src/router/index.tsx'

  createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
  )
