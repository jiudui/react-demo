import '@ant-design/v5-patch-for-react-19'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import 'normalize.css'
import './assets/reset.css'
import './index.css'
import './components/Message/index'
import router from '../src/router/index.tsx'

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
)
