import { createBrowserRouter, Navigate } from 'react-router'

import Login from '../views/login'
import Welcome from '../views/welcome'
import NotFound from '../views/notFound'

const router = createBrowserRouter([
  {
    index: true,
    element: <Navigate to="/welcome" replace />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/welcome',
    element: <Welcome />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

export default router
