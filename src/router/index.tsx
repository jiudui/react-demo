import { createBrowserRouter, Navigate } from 'react-router'

import App from '../App'
import Login from '../views/login'
import Welcome from '../views/welcome'
import NotFound from '../views/notFound'

// const loginAction = async [{request}: {request: Request}]

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/welcome" replace />,
      },
    ],
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