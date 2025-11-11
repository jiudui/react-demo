import '@ant-design/v5-patch-for-react-19'
import { createRoot } from 'react-dom/client'
import './assets/reset.css'
import '../src/style/theme.less'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(<App />)
