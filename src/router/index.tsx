import { createBrowserRouter, redirect } from "react-router-dom";

import App from '../App'
// import Login from '../views/Login'
import Welcome from '../views/welcome'

// const loginAction = async [{request}: {request: Request}]

const router = createBrowserRouter([
    {
        path: '/', 
        element: <App />,
        children: [
            {
                index: true,
                element: <Navigate to="/welcome" replace />
            }
        ] ,
    },
    {
        path: '/welcome', element: <Welcome />,
    },
    // { path:'*',element: <NotFound />}
])

export default router