import { createBrowserRouter, Navigate } from 'react-router'

import Login from '../views/login'
import Welcome from '../views/welcome'
import NotFound from '../views/notFound'
import AppLayout from '../layout'
import Dashboard from '../views/dashboard'
import Dept from '../views/dept'
import User from '../views/user'
import Menu from '../views/menu'
import Role from '../views/role'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/welcome',
        element: <Welcome />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/deptList',
        element: <Dept />,
      },
      {
        path: '/userList',
        element: <User />,
      },
      {
        path: '/menuList',
        element: <Menu />,
      },
      {
        path: '/roleList',
        element: <Role />,
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
