import { createBrowserRouter, Navigate } from 'react-router'

import Login from '../views/login'
import Welcome from '../views/welcome'
import NotFound from '../views/notFound'
import AppLayout from '../layout'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/welcome" />,
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
