import './App.css'
import router from '../src/router/index.tsx'
import { RouterProvider } from 'react-router'

function App() {
  return <RouterProvider router={router} />
}

export default App