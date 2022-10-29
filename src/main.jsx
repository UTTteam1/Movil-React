import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import PaginationArticulos from './containers/PaginationArticulos'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PaginationArticulos />
  </React.StrictMode>
)
